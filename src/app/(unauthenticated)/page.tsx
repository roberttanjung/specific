"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Box, Button, Card, CardContent, Chip, Typography, Alert, CircularProgress } from "@mui/material";
import { getErrorMessage } from "@/utils/api";
import { ROUTES } from "@/utils/constants";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const errorParam = searchParams.get("error");
  const resolvedError = errorParam ? decodeURIComponent(errorParam) : null;

  const handleGoogleSignIn = () => {
    setServerError(null);
    setIsSubmitting(true);

    try {
      window.location.assign(ROUTES.googleSignIn);
    } catch (error) {
      setServerError(getErrorMessage(error, "Unable to start Google sign-in."));
      setIsSubmitting(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        px: 3,
        py: 6,
        background: "linear-gradient(135deg, #091e42 0%, #0f305c 55%, #081d45 100%)",
      }}
    >
      <Card sx={{ width: "100%", maxWidth: 1040, borderRadius: 4, boxShadow: 30, overflow: "hidden" }}>
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "460px 1fr" }, minHeight: 520 }}>
          <Box sx={{ bgcolor: "primary.dark", color: "common.white", p: { xs: 4, md: 5 }, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <Box>
              <Chip label="Admin Portal" color="secondary" sx={{ fontWeight: 700, letterSpacing: 0.8, mb: 4 }} />
              <Typography variant="h3" component="h1" sx={{ fontWeight: 800, mb: 2, lineHeight: 1.05 }}>
                Selamat Datang di SPEcific Admin
              </Typography>
              <Typography variant="body1" color="primary.light" sx={{ mb: 4, maxWidth: 410 }}>
                Masuk untuk mengelola KPI, roadmap, tinjauan kinerja, dan aktivitas tim dari satu dashboard yang tersentralisasi.
              </Typography>
            </Box>

            <Box sx={{ display: "grid", gap: 1.25, color: "primary.light" }}>
              <Typography variant="body2">• Akses aman untuk admin dan SPV</Typography>
              <Typography variant="body2">• Otentikasi Google dengan Authorization Code Flow + PKCE</Typography>
              <Typography variant="body2">• Dashboard terpusat untuk keputusan operasional</Typography>
            </Box>
          </Box>

          <CardContent sx={{ bgcolor: "background.paper", p: { xs: 4, md: 5 }, display: "grid", gap: 3, justifyContent: "center" }}>
            <Box sx={{ display: "grid", gap: 1.5 }}>
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                Masuk ke Admin Area
              </Typography>
              <Typography color="text.secondary">
                Gunakan akun Google terdaftar untuk membuka akses ke area manajemen internal.
              </Typography>
            </Box>

            {serverError || resolvedError ? <Alert severity="error">{serverError ?? resolvedError}</Alert> : null}

            <Button
              variant="contained"
              size="large"
              disableElevation
              onClick={handleGoogleSignIn}
              disabled={isSubmitting}
              startIcon={isSubmitting ? <CircularProgress size={18} color="inherit" /> : undefined}
              sx={{ py: 1.75 }}
            >
              {isSubmitting ? "Mengalihkan…" : "Masuk dengan Google"}
            </Button>

            <Box sx={{ pt: 2, borderTop: 1, borderColor: "divider" }}>
              <Typography variant="body2" color="text.secondary">
                Dengan masuk, Anda akan diarahkan ke dashboard admin untuk kelola pengguna, KPI, dan laporan harian.
              </Typography>
            </Box>
          </CardContent>
        </Box>
      </Card>
    </Box>
  );
}
