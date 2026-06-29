export interface JwtPayload {
  sub?: string;
  email?: string;
  name?: string;
  role?: string;
  exp?: number;
  iat?: number;
  [key: string]: unknown;
}

const base64UrlDecode = (value: string) => {
  const base64 = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64.padEnd(base64.length + (4 - (base64.length % 4)) % 4, "=");

  if (typeof Buffer !== "undefined") {
    return Buffer.from(padded, "base64").toString("utf8");
  }

  try {
    return decodeURIComponent(
      atob(padded)
        .split("")
        .map((c) => `%${(`00${c.charCodeAt(0).toString(16)}`).slice(-2)}`)
        .join("")
    );
  } catch {
    return "";
  }
};

const base64UrlEncode = (value: string) => {
  const utf8 = Buffer.from(value, "utf8").toString("base64");
  return utf8.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
};

export const decodeJwt = (token: string): JwtPayload => {
  const parts = token.split(".");
  if (parts.length !== 3) {
    throw new Error("Invalid JWT token format");
  }

  const payload = parts[1];
  try {
    const decoded = base64UrlDecode(payload);
    return JSON.parse(decoded) as JwtPayload;
  } catch {
    throw new Error("Unable to decode JWT payload");
  }
};

export const encodeJwtPayload = (payload: JwtPayload) => {
  return base64UrlEncode(JSON.stringify(payload));
};

export const isJwtExpired = (payload: JwtPayload) => {
  if (!payload.exp || typeof payload.exp !== "number") {
    return true;
  }

  return payload.exp * 1000 < Date.now();
};
