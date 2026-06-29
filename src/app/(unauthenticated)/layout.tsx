import type { Metadata } from "next";
import { Box, Typography } from "@mui/material";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Admin Area | Sign in",
  description: "Secure admin access to SPEcific dashboard.",
};

export default function UnauthenticatedLayout({ children }: { children: ReactNode }) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        color: "text.primary",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
        py: 6,
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 24,
          left: 24,
          right: 24,
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", sm: "center" },
          gap: 1,
        }}
      >
        <Typography variant="button" sx={{ color: "primary.light", letterSpacing: 1.2 }}>
          SPEcific Admin Area
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Secure access for administrators and team leads.
        </Typography>
      </Box>

      <Box sx={{ width: "100%", maxWidth: 480 }}>{children}</Box>
    </Box>
  );
}
