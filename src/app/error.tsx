"use client";

import { useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error("Unhandled error in app:", error);
  }, [error]);

  return (
    <Box sx={{ padding: 4, display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography variant="h4">Something went wrong</Typography>
      <Typography color="text.secondary">{error?.message ?? "An unexpected error occurred."}</Typography>
      <Button variant="contained" onClick={() => reset()}>
        Try again
      </Button>
    </Box>
  );
}
