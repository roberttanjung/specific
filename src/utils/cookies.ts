export const parseCookies = (cookieHeader?: string) => {
  const cookies: Record<string, string> = {};
  if (!cookieHeader) {
    return cookies;
  }

  for (const pair of cookieHeader.split(";")) {
    const [name, ...valueParts] = pair.trim().split("=");
    if (!name) continue;
    cookies[name] = decodeURIComponent(valueParts.join("="));
  }

  return cookies;
};

export const getCookieValue = (cookieHeader: string | null | undefined, name: string) => {
  const cookies = parseCookies(cookieHeader ?? undefined);
  return cookies[name];
};
