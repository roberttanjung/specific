"use client";

import { useRouter } from "next/navigation";
import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import { useAuth } from "@/context/AuthContext";
import { postJson } from "@/utils/api";
import { ROUTES } from "@/utils/constants";

export default function AuthenticatedClient() {
  const router = useRouter();
  const { user, isAuthenticating } = useAuth();

  const handleLogout = async () => {
    await postJson<void, { success: boolean }>(ROUTES.logout);
    router.push("/login");
  };

  if (isAuthenticating) {
    return <Typography>Loading authenticated session…</Typography>;
  }

  return (
    <Box sx={{ display: "flex", justifyContent: "center", padding: 4 }}>
      <Card sx={{ width: "100%", maxWidth: 720 }}>
        <CardContent sx={{ display: "grid", gap: 2 }}>
          <Typography variant="h4">Authenticated Dashboard</Typography>
          <Typography>
            Welcome, {user?.name ?? "Guest"}. Your email is {user?.email ?? "unknown"}.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            This page is protected by token-based authentication and requires a valid cookie.
          </Typography>
          <Button variant="contained" onClick={handleLogout} sx={{ width: "fit-content" }}>
            Logout
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}
