"use client";

import { useMemo, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { UserRecord } from "@/components/UserTable";

const initialUsers: UserRecord[] = [
  {
    id: "1",
    name: "Alice Wijaya",
    email: "alice@example.com",
    division: "IT Development",
    department: "Multiplatform",
    superintendent: "Budi Santoso",
    directReport: ["Dina", "Fajar"],
    status: 2,
  },
  {
    id: "2",
    name: "Budi Santoso",
    email: "budi@example.com",
    division: "IT Development",
    department: "Multiplatform",
    superintendent: "Rina Putri",
    directReport: ["Alice", "Citra"],
    status: 2,
  },
];

export default function AuthenticatedUserPage() {
  const [users, setUsers] = useState<UserRecord[]>(initialUsers);
  const [selectedUser, setSelectedUser] = useState<UserRecord | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<UserRecord | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  const statistics = useMemo(
    () => ({ total: users.length, active: users.filter((user) => user.status === 2).length, inactive: users.filter((user) => user.status !== 2).length }),
    [users]
  );

  const handleView = (user: UserRecord) => {
    setSelectedUser(user);
    setFeedback(null);
  };

  const handleEdit = (user: UserRecord) => {
    setSelectedUser(user);
    setFeedback("Mode edit siap digunakan untuk pengembangan berikutnya.");
  };

  const handleDelete = (user: UserRecord) => {
    setDeleteTarget(user);
  };

  const confirmDelete = () => {
    if (!deleteTarget) return;

    setUsers((current) => current.map((user) => (user.id === deleteTarget.id ? { ...user, status: 0 } : user)));
    setFeedback(`Pengguna ${deleteTarget.name} ditandai sebagai non-aktif.`);
    setDeleteTarget(null);
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default", px: { xs: 2, md: 4 }, py: { xs: 3, md: 5 } }}>
      <Box sx={{ maxWidth: 1280, mx: "auto", display: "grid", gap: 3 }}>
        <Card sx={{ bgcolor: "background.paper", border: 1, borderColor: "divider" }}>
          <CardContent>
            <Stack
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                justifyContent: "space-between",
                alignItems: { xs: "flex-start", md: "center" },
              }}
              spacing={3}
            >
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 800 }}>
                  Manajemen Pengguna
                </Typography>
                <Typography color="text.secondary" sx={{ mt: 1 }}>
                  Data pengguna terpusat dengan ringkasan status, tindakan cepat, dan aktivitas terbaru.
                </Typography>
              </Box>
              <Button variant="contained" size="large">
                Tambah Pengguna
              </Button>
            </Stack>
          </CardContent>
        </Card>

        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card sx={{ bgcolor: "background.paper", border: 1, borderColor: "divider" }}>
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary">
                  Total Akun
                </Typography>
                <Typography variant="h3" sx={{ fontWeight: 800, mt: 1 }}>
                  {statistics.total}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ bgcolor: "background.paper", border: 1, borderColor: "divider" }}>
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary">
                  Aktif
                </Typography>
                <Typography variant="h3" sx={{ fontWeight: 800, mt: 1 }}>
                  {statistics.active}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ bgcolor: "background.paper", border: 1, borderColor: "divider" }}>
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary">
                  Non-aktif
                </Typography>
                <Typography variant="h3" sx={{ fontWeight: 800, mt: 1 }}>
                  {statistics.inactive}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {feedback ? <Alert severity="info">{feedback}</Alert> : null}

        <Card sx={{ bgcolor: "background.paper", border: 1, borderColor: "divider" }}>
          <CardContent>
            <Stack
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                justifyContent: "space-between",
                alignItems: { xs: "stretch", sm: "center" },
              }}
              spacing={2}
            >
              <Box sx={{ display: "grid", gap: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  Daftar Pengguna Aktif
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Kelola profil, status, dan kontak tim Anda.
                </Typography>
              </Box>
              <TextField
                placeholder="Cari pengguna..."
                size="small"
                sx={{ width: { xs: "100%", sm: 320 } }}
              />
            </Stack>

            <Divider sx={{ my: 3 }} />

            <TableContainer>
              <Table size="small" aria-label="user management table">
                <TableHead>
                  <TableRow>
                    <TableCell>Nama</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Divisi</TableCell>
                    <TableCell>Departemen</TableCell>
                    <TableCell align="right">Aksi</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.filter((user) => user.status === 2).map((user) => (
                    <TableRow hover key={user.id}>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.division}</TableCell>
                      <TableCell>{user.department}</TableCell>
                      <TableCell align="right">
                        <Stack
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "flex-end",
                            flexWrap: "wrap",
                          }}
                          spacing={1}
                        >
                          <Button size="small" variant="outlined" onClick={() => handleView(user)}>
                            Detail
                          </Button>
                          <Button size="small" variant="outlined" onClick={() => handleEdit(user)}>
                            Edit
                          </Button>
                          <Button size="small" color="error" variant="outlined" onClick={() => handleDelete(user)}>
                            Non-aktifkan
                          </Button>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))}
                  {users.filter((user) => user.status === 2).length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5}>
                        <Typography color="text.secondary">Tidak ada pengguna aktif untuk ditampilkan.</Typography>
                      </TableCell>
                    </TableRow>
                  ) : null}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Box>

      <Dialog open={Boolean(selectedUser)} onClose={() => setSelectedUser(null)} maxWidth="sm" fullWidth>
        <DialogTitle>Detail Pengguna</DialogTitle>
        <DialogContent dividers>
          {selectedUser ? (
            <Stack spacing={1}>
              <Typography><strong>Nama:</strong> {selectedUser.name}</Typography>
              <Typography><strong>Email:</strong> {selectedUser.email}</Typography>
              <Typography><strong>Divisi:</strong> {selectedUser.division}</Typography>
              <Typography><strong>Departemen:</strong> {selectedUser.department}</Typography>
              <Typography><strong>Superintendent:</strong> {selectedUser.superintendent}</Typography>
              <Typography><strong>Direct Report:</strong> {selectedUser.directReport.join(", ")}</Typography>
            </Stack>
          ) : null}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSelectedUser(null)}>Tutup</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={Boolean(deleteTarget)} onClose={() => setDeleteTarget(null)}>
        <DialogTitle>Konfirmasi Non-aktifkan</DialogTitle>
        <DialogContent>
          <Typography>Apakah Anda yakin ingin menandai {deleteTarget?.name} sebagai non-aktif?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteTarget(null)}>Batal</Button>
          <Button color="error" variant="contained" onClick={confirmDelete}>
            Ya, non-aktifkan
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
