import { createHmac, timingSafeEqual } from "crypto";

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

const decodeSegmentToBuffer = (value: string) => {
  const base64 = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64.padEnd(base64.length + (4 - (base64.length % 4)) % 4, "=");
  return Buffer.from(padded, "base64");
};

const signInput = (input: string, secret: string) => {
  return Buffer.from(createHmac("sha256", secret).update(input).digest())
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
};

export const signJwt = (payload: JwtPayload, secret: string) => {
  const header = encodeJwtPayload({ alg: "HS256", typ: "JWT" });
  const body = encodeJwtPayload(payload);
  const input = `${header}.${body}`;
  const signature = signInput(input, secret);
  return `${input}.${signature}`;
};

export const verifyJwtSignature = (token: string, secret: string) => {
  const parts = token.split(".");
  if (parts.length !== 3) {
    return false;
  }

  const input = `${parts[0]}.${parts[1]}`;
  const expectedSignature = signInput(input, secret);

  const expected = decodeSegmentToBuffer(expectedSignature);
  const actual = decodeSegmentToBuffer(parts[2]);

  if (expected.length !== actual.length) {
    return false;
  }

  return timingSafeEqual(expected, actual);
};

export const isJwtExpired = (payload: JwtPayload) => {
  if (!payload.exp || typeof payload.exp !== "number") {
    return true;
  }

  return payload.exp * 1000 < Date.now();
};
