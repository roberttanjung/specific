export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "/api";

export const ROUTES = {
  health: "/api/health",
  currentUser: "/api/user",
  formSubmit: "/api/form",
  signIn: "/api/signin",
  logout: "/api/logout",
};
