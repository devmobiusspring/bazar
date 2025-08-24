"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { Box, Button, TextField, Typography } from "@mui/material";

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const onEmailSignIn = async () => {
    setSubmitting(true);
    await signIn("credentials", { email, password, callbackUrl: "/" });
    setSubmitting(false);
  };

  return (
    <Box sx={{ maxWidth: 420, mx: "auto", p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Sign in
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        Use email/password or Google (if configured).
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
        />
        <Button variant="contained" onClick={onEmailSignIn} disabled={submitting}>
          Sign in with Email
        </Button>
        <Button
          variant="outlined"
          onClick={() => signIn("google", { callbackUrl: "/" })}
        >
          Sign in with Google
        </Button>
      </Box>
    </Box>
  );
}
