import { errorResponse } from "@/lib/server/response";

export async function GET() {
  return errorResponse("Google OAuth sign-in has been removed. Use manual sign-in.", 410);
}
