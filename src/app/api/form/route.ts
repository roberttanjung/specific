import { jsonResponse, errorResponse } from "@/lib/server/response";
import { getAuthTokenFromRequest, verifyAuthToken } from "@/lib/server/auth";
import { FormPayload } from "@/types";

export async function POST(request: Request) {
  try {
    const token = getAuthTokenFromRequest(request);
    if (!token) {
      return errorResponse("Authentication token is required", 401);
    }

    const user = verifyAuthToken(token);

    const payload = (await request.json()) as FormPayload;

    if (!payload.title || !payload.description || !payload.dueDate) {
      return errorResponse("Missing required form fields", 400);
    }

    const result = {
      success: true,
      data: {
        title: payload.title,
        description: payload.description,
        dueDate: payload.dueDate,
      },
      createdBy: user.email,
    };

    return jsonResponse(result);
  } catch (error) {
    return errorResponse((error as Error).message, 401);
  }
}
