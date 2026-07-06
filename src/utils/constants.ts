export const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_API ?? "/api";

export const ROUTES = {
  health: "/health",
  currentUser: "/user",
  formSubmit: "/form",
  signIn: "/signin",
  dashboard: "/dashboard",
  logout: "/logout",
};
