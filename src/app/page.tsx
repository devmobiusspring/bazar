"use client";
import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";

export default function HomePage() {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h3" gutterBottom>
        Next.js + MUI + Redux Starter
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Use this template to bootstrap new projects with the current stack.
      </Typography>
      <Box sx={{ display: "flex", gap: 2 }}>
        <Button component={Link} href="/auth" variant="contained" color="primary">
          Go to Sign In
        </Button>
        <Button component={Link} href="/" variant="outlined" color="secondary">
          Explore UI
        </Button>
      </Box>
    </Box>
  );
}
