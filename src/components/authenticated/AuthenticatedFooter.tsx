import { Box, Typography } from "@mui/material";

export default function AuthenticatedFooter() {
  return (
    <Box sx={{ bgcolor: "primary.dark", color: "common.white", borderRadius: 3, p: 3, boxShadow: 1 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", sm: "center" },
          gap: 2,
        }}
      >
        <Box>
          <Typography variant="body2" color="primary.light">
            Maintain secure operations and keep your team aligned.
          </Typography>
        </Box>
        <Typography variant="body2" color="primary.light">
          © SPEcific 2026
        </Typography>
      </Box>
    </Box>
  );
}
