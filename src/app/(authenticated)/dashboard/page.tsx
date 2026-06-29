import { Box, Button, Card, CardContent, Divider, Grid, Stack, Typography } from "@mui/material";

export default function AuthenticatedDashboardPage() {
  const overview = [
    { label: "Total Pengguna", value: "128", accent: "primary.main" },
    { label: "Pengguna Aktif", value: "104", accent: "success.main" },
    { label: "Laporan Bulanan", value: "12", accent: "secondary.main" },
    { label: "Permintaan Akses", value: "3", accent: "warning.main" },
  ];

  const alerts = [
    "Sistem sinkronisasi data selesai 2 menit lalu.",
    "Periksa KPI divisi IT Development untuk bulan ini.",
    "3 permintaan akses baru menunggu persetujuan.",
  ];

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default", pb: { xs: 4, md: 6 } }}>
      <Box sx={{ px: { xs: 3, md: 4 }, pt: { xs: 3, md: 4 }, pb: 2 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
          Admin Dashboard
        </Typography>
        <Typography color="text.secondary" sx={{ maxWidth: 760 }}>
          Ringkasan operasional, aktivitas terbaru, dan metrik pengguna untuk membantu Anda mengambil keputusan admin secara cepat.
        </Typography>
      </Box>

      <Box sx={{ px: { xs: 3, md: 4 } }}>
        <Grid container spacing={3}>
          {overview.map((item) => (
            <Grid item xs={12} sm={6} md={3} key={item.label}>
              <Card sx={{ bgcolor: "background.paper", border: 1, borderColor: "divider", minHeight: 150 }}>
                <CardContent>
                  <Typography variant="caption" color="text.secondary" sx={{ letterSpacing: 0.8 }}>
                    {item.label}
                  </Typography>
                  <Typography variant="h3" sx={{ color: item.accent, mt: 1, fontWeight: 700 }}>
                    {item.value}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    Statistik terbaru untuk area admin.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ mt: 3, display: "grid", gap: 3, gridTemplateColumns: { xs: "1fr", lg: "2fr 1fr" } }}>
          <Card sx={{ bgcolor: "background.paper", border: 1, borderColor: "divider" }}>
            <CardContent>
              <Stack
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
                spacing={2}
              >
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    Aktivitas Terakhir
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Peristiwa penting dan perubahan terbaru di sistem.
                  </Typography>
                </Box>
                <Button variant="outlined" size="small">
                  Semua aktivitas
                </Button>
              </Stack>

              <Stack spacing={2} sx={{ mt: 3 }}>
                {alerts.map((message) => (
                  <Box key={message} sx={{ p: 3, borderRadius: 2, bgcolor: "background.default", border: 1, borderColor: "divider" }}>
                    <Typography color="text.secondary">{message}</Typography>
                  </Box>
                ))}
              </Stack>
            </CardContent>
          </Card>

          <Card sx={{ bgcolor: "background.paper", border: 1, borderColor: "divider" }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                Tindakan Cepat
              </Typography>
              <Stack spacing={2}>
                <Button variant="contained" fullWidth>
                  Kelola Pengguna
                </Button>
                <Button variant="outlined" fullWidth>
                  Audit Akses
                </Button>
                <Button variant="outlined" fullWidth>
                  Pengaturan Sistem
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Box>

        <Card sx={{ bgcolor: "background.paper", border: 1, borderColor: "divider", mt: 3 }}>
          <CardContent>
            <Stack
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                justifyContent: "space-between",
                alignItems: { xs: "flex-start", sm: "center" },
              }}
              spacing={2}
            >
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  Ringkasan Operasional
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Kinerja utama dan catatan yang penting bagi staf admin.
                </Typography>
              </Box>
              <Button variant="outlined" size="small">
                Refresh data
              </Button>
            </Stack>

            <Divider sx={{ my: 3 }} />

            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <Box sx={{ p: 2, bgcolor: "background.default", borderRadius: 2, border: 1, borderColor: "divider" }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Kapasitas Sistem
                  </Typography>
                  <Typography variant="h5" sx={{ mt: 1, fontWeight: 700 }}>
                    Stabil
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box sx={{ p: 2, bgcolor: "background.default", borderRadius: 2, border: 1, borderColor: "divider" }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Sinkronisasi Terakhir
                  </Typography>
                  <Typography variant="h5" sx={{ mt: 1, fontWeight: 700 }}>
                    4 menit lalu
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box sx={{ p: 2, bgcolor: "background.default", borderRadius: 2, border: 1, borderColor: "divider" }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Notifikasi Baru
                  </Typography>
                  <Typography variant="h5" sx={{ mt: 1, fontWeight: 700 }}>
                    5 pesan
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
