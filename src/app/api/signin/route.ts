import { jsonResponse, errorResponse } from "@/lib/server/response";
import { signJwt } from "@/lib/server/jwt";
import { findUserByEmail } from "@/lib/server/user";
import bcrypt from "bcryptjs";

interface SignInBody {
  email: string;
  password: string;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as SignInBody;
    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
      return errorResponse("JWT_SECRET is not configured", 500);
    }

    if (!body.email || !body.password) {
      return errorResponse("Email and password are required", 400);
    }

    const user = await findUserByEmail(body.email);
    if (!user || !user.passwordHash) {
      return errorResponse("Invalid credentials", 401);
    }

    const isPasswordValid = await bcrypt.compare(body.password, user.passwordHash);
    if (!isPasswordValid) {
      return errorResponse("Invalid credentials", 401);
    }

    const token = signJwt(
      {
        sub: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        exp: Math.floor(Date.now() / 1000) + 3600,
        iat: Math.floor(Date.now() / 1000),
      },
      jwtSecret
    );

    const secureCookie = process.env.NODE_ENV === "production" ? "; Secure" : "";
    const headers = new Headers({
      "Set-Cookie": `appToken=${encodeURIComponent(token)}; HttpOnly; Path=/; Max-Age=3600; SameSite=Lax${secureCookie}`,
    });

    return jsonResponse({ success: true, token }, { headers });
  } catch (error) {
    return errorResponse((error as Error).message, 500);
  }
}
