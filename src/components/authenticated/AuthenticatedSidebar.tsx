"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Box, Button, Divider, Typography } from "@mui/material";

const navItems = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Pengguna", href: "/user" },
  { label: "Laporan", href: "/dashboard" },
];

export default function AuthenticatedSidebar() {
  const pathname = usePathname();

  return (
    <Box
      sx={{
        position: { xs: "static", md: "fixed" },
        top: { md: 72 },
        left: { md: 0 },
        width: { xs: "100%", md: 280 },
        bgcolor: "background.paper",
        border: 1,
        borderColor: "divider",
        borderRadius: { xs: 3, md: 0 },
        borderTopLeftRadius: { xs: 3, md: 0 },
        borderTopRightRadius: { xs: 3, md: 0 },
        p: { xs: 2.5, md: 2.5 },
        boxShadow: 1,
        height: { md: "calc(100vh - 72px)" },
        overflowY: { md: "auto" },
        zIndex: { md: 1200 },
      }}
    >
      <Box sx={{ display: "grid", gap: 0.75 }}>
        {navItems.map((item) => (
          <Box
            key={item.label}
            component={Link}
            href={item.href}
            sx={{
              display: "block",
              px: 2.5,
              py: 1.75,
              borderRadius: 2,
              color: pathname === item.href ? "common.white" : "text.primary",
              bgcolor: pathname === item.href ? "primary.main" : "transparent",
              textDecoration: "none",
              fontWeight: pathname === item.href ? 700 : 500,
              transition: "background-color 150ms ease, color 150ms ease",
              '&:hover': {
                bgcolor: pathname === item.href ? "primary.dark" : "rgba(126, 208, 255, 0.08)",
                color: "common.white",
              },
            }}
          >
            {item.label}
          </Box>
        ))}
      </Box>
    </Box>
  );
}
