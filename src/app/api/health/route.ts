import { jsonResponse } from "@/lib/server/response";

export async function GET() {
  const payload = {
    status: "ok",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  };

  return jsonResponse(payload);
}
