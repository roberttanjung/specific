"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Alert, Box, Button, Card, CardContent, CircularProgress, Chip, TextField, Typography } from "@mui/material";
import { getErrorMessage, postJson } from "@/utils/api";
import { ROUTES } from "@/utils/constants";
import { loginSchema, LoginFormValues } from "@/utils/loginSchemas";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const errorParam = searchParams.get("error");
  const resolvedError = errorParam ? decodeURIComponent(errorParam) : null;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    setServerError(null);
    setIsSuccess(false);
    setIsSubmitting(true);

    try {
      await postJson<LoginFormValues, { success: boolean }>(ROUTES.signIn, values);
      setIsSuccess(true);
      router.replace(ROUTES.dashboard);
    } catch (error) {
      setServerError(getErrorMessage(error, "Unable to sign in."));
    } finally {
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
              <Typography variant="body2">• Login manual dengan email dan password terenkripsi</Typography>
              <Typography variant="body2">• Dashboard terpusat untuk keputusan operasional</Typography>
            </Box>
          </Box>

          <CardContent sx={{ bgcolor: "background.paper", p: { xs: 4, md: 5 }, display: "grid", gap: 3, justifyContent: "center" }}>
            <Box sx={{ display: "grid", gap: 1.5 }}>
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                Masuk ke Admin Area
              </Typography>
              <Typography color="text.secondary">
                Gunakan email dan password akun terdaftar untuk mengakses area manajemen internal.
              </Typography>
            </Box>

            {serverError || resolvedError ? <Alert severity="error">{serverError ?? resolvedError}</Alert> : null}
            {isSuccess ? <Alert severity="success">Login berhasil. Mengarahkan ke dashboard…</Alert> : null}

            <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ display: "grid", gap: 2 }}>
              <TextField
                label="Email"
                type="email"
                autoComplete="email"
                fullWidth
                {...register("email")}
                error={Boolean(errors.email)}
                helperText={errors.email?.message}
              />
              <TextField
                label="Password"
                type="password"
                autoComplete="current-password"
                fullWidth
                {...register("password")}
                error={Boolean(errors.password)}
                helperText={errors.password?.message}
              />
              <Button
                type="submit"
                variant="contained"
                size="large"
                disableElevation
                disabled={isSubmitting}
                startIcon={isSubmitting ? <CircularProgress size={18} color="inherit" /> : undefined}
                sx={{ py: 1.75 }}
              >
                {isSubmitting ? "Memproses…" : "Masuk"}
              </Button>
            </Box>

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
