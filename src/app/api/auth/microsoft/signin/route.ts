import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { errorResponse } from "@/lib/server/response";
import { createCodeChallenge, createCodeVerifier, createOpaqueValue } from "@/lib/server/pkce";

const microsoftClientId = process.env.MICROSOFT_CLIENT_ID;
const microsoftTenantId = process.env.MICROSOFT_TENANT_ID ?? "common";
const redirectUri = process.env.NEXT_PUBLIC_REDIRECT_URI ?? "http://localhost:8001/api/auth/microsoft/callback";
const scope = process.env.MICROSOFT_SCOPE ?? "openid profile email";

export async function GET() {
  try {
    if (!microsoftClientId) {
      return errorResponse("Microsoft OAuth is not configured", 500);
    }

    const codeVerifier = createCodeVerifier();
    const codeChallenge = await createCodeChallenge(codeVerifier);
    const state = createOpaqueValue();
    const nonce = createOpaqueValue();

    const authUrl = new URL(`https://login.microsoftonline.com/${microsoftTenantId}/oauth2/v2.0/authorize`);
    authUrl.searchParams.set("client_id", microsoftClientId);
    authUrl.searchParams.set("response_type", "code");
    authUrl.searchParams.set("redirect_uri", redirectUri);
    authUrl.searchParams.set("scope", scope);
    authUrl.searchParams.set("state", state);
    authUrl.searchParams.set("nonce", nonce);
    authUrl.searchParams.set("code_challenge", codeChallenge);
    authUrl.searchParams.set("code_challenge_method", "S256");

    const cookieStore = await cookies();
    cookieStore.set("msAuthState", state, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 600,
    });
    cookieStore.set("msCodeVerifier", codeVerifier, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 600,
    });
    cookieStore.set("msNonce", nonce, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 600,
    });

    return NextResponse.redirect(authUrl.toString());
  } catch (error) {
    return errorResponse((error as Error).message, 500);
  }
}
