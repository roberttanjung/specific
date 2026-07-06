import { AuthUser } from "@/types";
import { decodeJwt, isJwtExpired, verifyJwtSignature } from "@/lib/server/jwt";
import { getCookieValue } from "@/utils/cookies";

export const verifyAuthToken = (token: string): AuthUser => {
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    throw new Error("JWT_SECRET is not configured");
  }

  if (!verifyJwtSignature(token, jwtSecret)) {
    throw new Error("Invalid token signature");
  }

  const payload = decodeJwt(token);

  if (isJwtExpired(payload)) {
    throw new Error("Token expired");
  }

  if (!payload.email || !payload.name) {
    throw new Error("Invalid token payload");
  }

  const role = payload.role;
  const normalizedRole =
    role === "superadmin" || role === "head" || role === "spv" || role === "user"
      ? (role as AuthUser["role"])
      : "user";

  return {
    id: (payload.sub as string) ?? payload.email,
    email: payload.email as string,
    name: payload.name as string,
    role: normalizedRole,
  };
};

export const getAuthTokenFromRequest = (request: Request): string | null => {
  const authorization = request.headers.get("authorization");
  if (authorization?.startsWith("Bearer ")) {
    return authorization.replace(/^Bearer\s+/i, "");
  }

  const cookieHeader = request.headers.get("cookie");
  const token = getCookieValue(cookieHeader, "appToken");
  return token ?? null;
};
