"use client";

import Link from "next/link";
import { Box, Button, Container, Typography } from "@mui/material";

export default function AuthenticatedHeader() {
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
          <Typography variant="body2" color="primary.light">
            _NAME_
          </Typography>
          <Button component={Link} href="/api/logout" variant="outlined" color="inherit" size="small">
            Logout
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
