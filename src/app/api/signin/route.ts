import { jsonResponse, errorResponse } from "@/lib/server/response";
import { decodeJwt, isJwtExpired, JwtPayload, encodeJwtPayload } from "@/lib/server/jwt";
import { ensureUser } from "@/lib/server/user";

interface SignInBody {
  email: string;
  password: string;
}


const decodeTokenPayload = (token: string): JwtPayload => {
  const payload = decodeJwt(token);
  if (isJwtExpired(payload)) {
    throw new Error("Token expired");
  }
  return payload;
};

const createDummyJwt = (email: string, name: string) => {
  const header = encodeJwtPayload({ alg: "HS256", typ: "JWT" });
  const payload = encodeJwtPayload({
    sub: email,
    email,
    name,
    role: "user",
    exp: Math.floor(Date.now() / 1000) + 3600,
    iat: Math.floor(Date.now() / 1000),
  });
  return `${header}.${payload}.dummy-signature`;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as SignInBody;

    if (!body.email || !body.password) {
      return errorResponse("Email and password are required", 400);
    }

    const id_token = createDummyJwt(body.email, "Demo User");

    const tokenPayload = decodeTokenPayload(id_token);

    await ensureUser({
      id: tokenPayload.sub as string,
      email: tokenPayload.email as string,
      name: tokenPayload.name as string,
      role: "user",
    });

    const headers = new Headers({
      "Set-Cookie": `appToken=${encodeURIComponent(id_token)}; HttpOnly; Path=/; Max-Age=3600; SameSite=Lax`,
    });

    return jsonResponse({ success: true }, { headers });
  } catch (error) {
    return errorResponse((error as Error).message, 401);
  }
}
