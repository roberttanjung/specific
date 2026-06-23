import { jsonResponse, errorResponse } from "@/lib/server/response";

export async function POST() {
  try {
    const headers = new Headers({
      "Set-Cookie": "appToken=; HttpOnly; Path=/; Max-Age=0; SameSite=Lax",
    });

    return jsonResponse({ success: true }, { headers });
  } catch (error) {
    return errorResponse((error as Error).message, 500);
  }
}
