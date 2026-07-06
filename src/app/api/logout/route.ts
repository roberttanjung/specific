import { NextResponse } from "next/server";
import { jsonResponse, errorResponse } from "@/lib/server/response";

const createExpiredCookie = () => {
  const secureCookie = process.env.NODE_ENV === "production" ? "; Secure" : "";
  return `appToken=; HttpOnly; Path=/; Max-Age=0; SameSite=Lax${secureCookie}`;
};

export async function GET(request: Request) {
  try {
    const response = NextResponse.redirect(new URL("/", request.url));
    response.headers.set("Set-Cookie", createExpiredCookie());
    return response;
  } catch (error) {
    return errorResponse((error as Error).message, 500);
  }
}

export async function POST() {
  try {
    const headers = new Headers({
      "Set-Cookie": createExpiredCookie(),
    });

    return jsonResponse({ success: true }, { headers });
  } catch (error) {
    return errorResponse((error as Error).message, 500);
  }
}
