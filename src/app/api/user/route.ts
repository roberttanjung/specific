import { jsonResponse, errorResponse } from "@/lib/server/response";
import { getAuthTokenFromRequest, verifyAuthToken } from "@/lib/server/auth";

export async function GET(request: Request) {
  try {
    const token = getAuthTokenFromRequest(request);
    if (!token) {
      return errorResponse("Authentication required", 401);
    }

    const user = verifyAuthToken(token);
    return jsonResponse(user);
  } catch (error) {
    return errorResponse((error as Error).message, 401);
  }
}
