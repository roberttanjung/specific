import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decodeJwt, encodeJwtPayload, isJwtExpired, JwtPayload } from "@/lib/server/jwt";
import { ensureUser } from "@/lib/server/user";

const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
const redirectUri = process.env.NEXT_PUBLIC_REDIRECT_URI ?? "http://localhost:8001/api/auth/google/callback";

const createDummyJwt = (email: string, name: string) => {
  const header = encodeJwtPayload({ alg: "HS256", typ: "JWT" });
  const payload = encodeJwtPayload({
    sub: email,
    email,
    name,
    role: "user",
    exp: Math.floor(Date.now() / 1000) + 3600,
    iat: Math.floor(Date.now() / 1000),
  });
  return `${header}.${payload}.dummy-signature`;
};

const decodeTokenPayload = (token: string): JwtPayload => {
  const payload = decodeJwt(token);
  if (isJwtExpired(payload)) {
    throw new Error("Token expired");
  }
  return payload;
};

const redirectToLogin = (request: NextRequest, message: string) => {
  const loginUrl = new URL("/login", request.url);
  loginUrl.searchParams.set("error", encodeURIComponent(message));
  return NextResponse.redirect(loginUrl);
};

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get("code");
    const state = searchParams.get("state");
    const error = searchParams.get("error");

    if (error) {
      return redirectToLogin(request, `Google authentication failed: ${error}`);
    }

    if (!code || !state) {
      return redirectToLogin(request, "Missing authorization code or state");
    }

    const cookieStore = await cookies();
    const storedState = cookieStore.get("gsAuthState")?.value;
    const storedCodeVerifier = cookieStore.get("gsCodeVerifier")?.value;
    const storedNonce = cookieStore.get("gsNonce")?.value;

    if (!storedState || !storedCodeVerifier || !storedNonce) {
      return redirectToLogin(request, "PKCE state or verifier is missing");
    }

    if (storedState !== state) {
      return redirectToLogin(request, "Invalid PKCE state");
    }

    if (!googleClientId || !googleClientSecret) {
      return redirectToLogin(request, "Google OAuth is not configured");
    }

    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        code,
        client_id: googleClientId,
        client_secret: googleClientSecret,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
        code_verifier: storedCodeVerifier,
      }),
    });

    const tokenPayload = await tokenResponse.json();
    if (!tokenResponse.ok) {
      return redirectToLogin(request, tokenPayload.error_description || "Unable to exchange Google authorization code");
    }

    const accessToken = typeof tokenPayload.access_token === "string" ? tokenPayload.access_token : null;
    const idToken = typeof tokenPayload.id_token === "string" ? tokenPayload.id_token : null;

    const userInfo = accessToken
      ? await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: { Authorization: `Bearer ${accessToken}` },
        }).then((response) => response.json())
      : null;

    const idTokenPayload = idToken ? decodeJwt(idToken) : null;
    if (idTokenPayload?.nonce && storedNonce && idTokenPayload.nonce !== storedNonce) {
      return redirectToLogin(request, "Invalid nonce received from Google");
    }

    const email = (userInfo?.email as string | undefined) ?? (idTokenPayload?.email as string | undefined) ?? "google-user@example.com";
    const name = (userInfo?.name as string | undefined) ?? (idTokenPayload?.name as string | undefined) ?? email;
    const id_token = createDummyJwt(email, name);
    const tokenPayloadDecoded = decodeTokenPayload(id_token);

    await ensureUser({
      id: tokenPayloadDecoded.sub as string,
      email: tokenPayloadDecoded.email as string,
      name: tokenPayloadDecoded.name as string,
      role: "user",
    });

    const response = NextResponse.redirect(new URL("/authenticated", request.url));
    response.cookies.set("appToken", id_token, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 3600,
      secure: process.env.NODE_ENV === "production",
    });
    response.cookies.set("gsAuthState", "", { path: "/", maxAge: 0 });
    response.cookies.set("gsCodeVerifier", "", { path: "/", maxAge: 0 });
    response.cookies.set("gsNonce", "", { path: "/", maxAge: 0 });

    return response;
  } catch (error) {
    return redirectToLogin(request, (error as Error).message);
  }
}
