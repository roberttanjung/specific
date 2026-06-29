import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { jsonResponse, errorResponse } from "@/lib/server/response";
import { decodeJwt, encodeJwtPayload, isJwtExpired, JwtPayload } from "@/lib/server/jwt";
import { ensureUser } from "@/lib/server/user";

const microsoftClientId = process.env.MICROSOFT_CLIENT_ID;
const microsoftClientSecret = process.env.MICROSOFT_CLIENT_SECRET;
const microsoftTenantId = process.env.MICROSOFT_TENANT_ID ?? "common";
const redirectUri = process.env.NEXT_PUBLIC_REDIRECT_URI ?? "http://localhost:8001/api/auth/microsoft/callback";

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

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get("code");
    const state = searchParams.get("state");
    const error = searchParams.get("error");

    if (error) {
      return errorResponse(`Microsoft authentication failed: ${error}`, 400);
    }

    if (!code || !state) {
      return errorResponse("Missing authorization code or state", 400);
    }

    const storedState = (await cookies()).get("msAuthState")?.value;
    const storedCodeVerifier = (await cookies()).get("msCodeVerifier")?.value;
    const storedNonce = (await cookies()).get("msNonce")?.value;

    if (!storedState || !storedCodeVerifier || !storedNonce) {
      return errorResponse("PKCE state or verifier is missing", 400);
    }

    if (storedState !== state) {
      return errorResponse("Invalid PKCE state", 400);
    }

    if (!microsoftClientId || !microsoftClientSecret) {
      return errorResponse("Microsoft OAuth is not configured", 500);
    }

    const tokenEndpoint = `https://login.microsoftonline.com/${microsoftTenantId}/oauth2/v2.0/token`;
    const response = await fetch(tokenEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: microsoftClientId,
        client_secret: microsoftClientSecret,
        code,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
        code_verifier: storedCodeVerifier,
      }),
    });

    const tokenPayload = await response.json();
    if (!response.ok) {
      return errorResponse(tokenPayload.error_description || "Unable to exchange Microsoft authorization code", 400);
    }

    const accessToken = typeof tokenPayload.access_token === "string" ? tokenPayload.access_token : null;
    const idToken = typeof tokenPayload.id_token === "string" ? tokenPayload.id_token : null;

    const userInfo = accessToken
      ? await fetch("https://graph.microsoft.com/oidc/userinfo", {
          headers: { Authorization: `Bearer ${accessToken}` },
        }).then((graphResponse) => graphResponse.json())
      : null;

    const email =
      (userInfo?.email as string | undefined) ??
      (userInfo?.preferred_username as string | undefined) ??
      (idToken ? JSON.parse(Buffer.from(idToken.split(".")[1], "base64").toString("utf8")).preferred_username : undefined) ??
      "microsoft-user@example.com";

    const name = (userInfo?.name as string | undefined) ?? email;
    const id_token = createDummyJwt(email, name);
    const tokenPayloadDecoded = decodeTokenPayload(id_token);

    await ensureUser({
      id: tokenPayloadDecoded.sub as string,
      email: tokenPayloadDecoded.email as string,
      name: tokenPayloadDecoded.name as string,
      role: "user",
    });

    const headers = new Headers();
    headers.set(
      "Set-Cookie",
      [
        `appToken=${encodeURIComponent(id_token)}; HttpOnly; Path=/; Max-Age=3600; SameSite=Lax`,
        `msAuthState=; Path=/; Max-Age=0; SameSite=Lax`,
        `msCodeVerifier=; Path=/; Max-Age=0; SameSite=Lax`,
        `msNonce=; Path=/; Max-Age=0; SameSite=Lax`,
      ].join(", ")
    );

    return jsonResponse({ success: true, email, name }, { headers });
  } catch (error) {
    return errorResponse((error as Error).message, 500);
  }
}
