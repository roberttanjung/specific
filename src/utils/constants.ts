export const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_API ?? "";

export const ROUTES = {
  health: "/health",
  currentUser: "/user",
  formSubmit: "/form",
  googleSignIn: "/api/auth/google/signin",
  googleCallback: "/api/auth/google/callback",
  logout: "/logout",
};
