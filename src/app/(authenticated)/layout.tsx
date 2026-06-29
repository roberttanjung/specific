import type { ReactNode } from "react";
import AuthenticatedFooter from "@/components/authenticated/AuthenticatedFooter";
import AuthenticatedHeader from "@/components/authenticated/AuthenticatedHeader";
import AuthenticatedSidebar from "@/components/authenticated/AuthenticatedSidebar";
import { Box, Container } from "@mui/material";

export default function AuthenticatedLayout({ children }: { children: ReactNode }) {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default", color: "text.primary" }}>
      <AuthenticatedHeader />

      <Box sx={{ position: "relative", pt: { xs: 8, md: 8 } }}>
        <AuthenticatedSidebar />
        <Container
          maxWidth="lg"
          sx={{
            ml: { xs: 0, md: "280px" },
            display: "grid",
            gap: 2,
            pb: { xs: 3, md: 5 },
          }}
        >
          <Box sx={{ bgcolor: "background.paper", border: 1, borderColor: "divider", borderRadius: 3, boxShadow: 1, p: { xs: 3, md: 4 } }}>
            {children}
          </Box>
          <AuthenticatedFooter />
        </Container>
      </Box>
    </Box>
  );
}
