"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Button, Container, Menu, MenuItem, Typography } from "@mui/material";
import { getErrorMessage } from "@/utils/api";
import { useAuth } from "@/context/AuthContext";

export default function AuthenticatedHeader() {
  const router = useRouter();
  const { user } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setMenuAnchor(null);
  };

  const handleLogout = async () => {
    handleCloseMenu();
    setIsLoggingOut(true);

    try {
      await fetch("/api/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error(getErrorMessage(error, "Logout failed"));
    } finally {
      router.replace("/");
      router.refresh();
      setIsLoggingOut(false);
    }
  };

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1300,
        bgcolor: "primary.dark",
        color: "common.white",
        py: 0.75,
        px: { xs: 1.5, md: 2.5 },
        boxShadow: "0 4px 16px rgba(0, 0, 0, 0.14)",
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
          flexWrap: "wrap",
          py: { xs: 1, md: 1.25 },
        }}
      >
        <Box sx={{ minWidth: 0 }}>
          <Typography variant="h5" sx={{ fontWeight: 800, letterSpacing: 0.35 }}>
            SPEcific
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap" }}>
          <Button
            color="inherit"
            size="small"
            onClick={handleOpenMenu}
            disabled={isLoggingOut}
            aria-controls={menuAnchor ? "profile-menu" : undefined}
            aria-haspopup="menu"
            aria-expanded={menuAnchor ? "true" : undefined}
          >
            <Typography variant="body2" color="primary.light" sx={{ textTransform: "none" }}>
              {user?.name ?? "Admin"}
            </Typography>
          </Button>
          <Menu
            id="profile-menu"
            anchorEl={menuAnchor}
            open={Boolean(menuAnchor)}
            onClose={handleCloseMenu}
            keepMounted
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <MenuItem onClick={handleLogout} disabled={isLoggingOut}>
              {isLoggingOut ? "Logging out..." : "Logout"}
            </MenuItem>
          </Menu>
        </Box>
      </Container>
    </Box>
  );
}
