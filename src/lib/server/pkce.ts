import { createHash, randomBytes } from "crypto";

const base64UrlEncode = (value: Buffer | Uint8Array) => {
  return Buffer.from(value)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
};

export const createCodeVerifier = () => {
  return base64UrlEncode(randomBytes(64)).slice(0, 128);
};

export const createCodeChallenge = async (verifier: string) => {
  const hash = createHash("sha256").update(verifier).digest();
  return base64UrlEncode(hash);
};

export const createOpaqueValue = (size = 24) => {
  return base64UrlEncode(randomBytes(size)).slice(0, 32);
};
