"use client";

import {
  Box,
  Button,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

export interface UserRecord {
  id: string;
  name: string;
  email: string;
  division: string;
  department: string;
  superintendent: string;
  directReport: string[];
  status: number;
}

interface UserTableProps {
  users: UserRecord[];
  onView: (user: UserRecord) => void;
  onEdit: (user: UserRecord) => void;
  onDelete: (user: UserRecord) => void;
  onCopyEmail: (email: string) => void;
}

export default function UserTable({
  users,
  onView,
  onEdit,
  onDelete,
  onCopyEmail,
}: UserTableProps) {
  return (
    <Box sx={{ overflowX: "auto" }}>
      <Table size="small" aria-label="user management table">
        <TableHead>
          <TableRow>
            <TableCell>Nama</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Divisi</TableCell>
            <TableCell>Departemen</TableCell>
            <TableCell>Superintendent</TableCell>
            <TableCell>Direct Report</TableCell>
            <TableCell>Aksi</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7}>
                <Typography color="text.secondary">Belum ada pengguna yang tersedia.</Typography>
              </TableCell>
            </TableRow>
          ) : (
            users.map((user) => (
              <TableRow key={user.id} hover>
                <TableCell sx={{ cursor: "pointer" }} onClick={() => onView(user)}>
                  {user.name}
                </TableCell>
                <TableCell sx={{ cursor: "pointer" }} onClick={() => onView(user)}>
                  {user.email}
                </TableCell>
                <TableCell sx={{ cursor: "pointer" }} onClick={() => onView(user)}>
                  {user.division}
                </TableCell>
                <TableCell sx={{ cursor: "pointer" }} onClick={() => onView(user)}>
                  {user.department}
                </TableCell>
                <TableCell sx={{ cursor: "pointer" }} onClick={() => onView(user)}>
                  {user.superintendent}
                </TableCell>
                <TableCell sx={{ cursor: "pointer" }} onClick={() => onView(user)}>
                  {user.directReport.join(", ")}
                </TableCell>
                <TableCell>
                  <Stack
                    sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
                    spacing={1}
                  >
                    <Button size="small" variant="outlined" onClick={() => onCopyEmail(user.email)}>
                      Salin email
                    </Button>
                    <Button size="small" variant="outlined" onClick={() => onEdit(user)}>
                      Edit
                    </Button>
                    <Button size="small" color="error" variant="outlined" onClick={() => onDelete(user)}>
                      Hapus
                    </Button>
                  </Stack>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </Box>
  );
}
