import { redirect } from "next/navigation";
import { getAuthTokenFromRequest, verifyAuthToken } from "@/lib/server/auth";

export async function GET(request: Request) {
  const token = getAuthTokenFromRequest(request);
  if (!token) {
    redirect("/login");
  }

  try {
    verifyAuthToken(token);
    return new Response(null, { status: 200 });
  } catch {
    redirect("/login");
  }
}
