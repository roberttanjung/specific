import { NextResponse } from "next/server";
import { errorResponse } from "@/lib/server/response";
import { createCodeChallenge, createCodeVerifier, createOpaqueValue } from "@/lib/server/pkce";

const googleClientId = process.env.GOOGLE_CLIENT_ID;
const redirectUri = process.env.NEXT_PUBLIC_REDIRECT_URI ?? "http://localhost:8001/api/auth/google/callback";
const scope = process.env.GOOGLE_SCOPE ?? "openid email profile";

export async function GET() {
  try {
    if (!googleClientId) {
      return errorResponse("Google OAuth is not configured", 500);
    }

    const codeVerifier = createCodeVerifier();
    const codeChallenge = await createCodeChallenge(codeVerifier);
    const state = createOpaqueValue();
    const nonce = createOpaqueValue();

    const authUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
    authUrl.searchParams.set("client_id", googleClientId);
    authUrl.searchParams.set("response_type", "code");
    authUrl.searchParams.set("redirect_uri", redirectUri);
    authUrl.searchParams.set("scope", scope);
    authUrl.searchParams.set("state", state);
    authUrl.searchParams.set("nonce", nonce);
    authUrl.searchParams.set("code_challenge", codeChallenge);
    authUrl.searchParams.set("code_challenge_method", "S256");
    authUrl.searchParams.set("access_type", "offline");
    authUrl.searchParams.set("prompt", "select_account");

    const response = NextResponse.redirect(authUrl.toString());
    response.cookies.set("gsAuthState", state, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 600,
      secure: process.env.NODE_ENV === "production",
    });
    response.cookies.set("gsCodeVerifier", codeVerifier, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 600,
      secure: process.env.NODE_ENV === "production",
    });
    response.cookies.set("gsNonce", nonce, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 600,
      secure: process.env.NODE_ENV === "production",
    });

    return response;
  } catch (error) {
    return errorResponse((error as Error).message, 500);
  }
}
