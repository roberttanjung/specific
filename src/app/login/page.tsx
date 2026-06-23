"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  Alert,
  Link,
} from "@mui/material";
import { postJson, getErrorMessage } from "@/utils/api";
import { loginSchema, LoginFormValues } from "@/utils/loginSchemas";
import { ROUTES } from "@/utils/constants";

export default function LoginPage() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    setIsSubmitting(true);

    try {
      await postJson<typeof values, { success: boolean }>(ROUTES.signIn, values);
      router.push("/");
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
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 3,
        backgroundColor: "background.default",
      }}
    >
      <Card sx={{ width: "100%", maxWidth: 420, p: 2 }}>
        <CardContent sx={{ display: "grid", gap: 2 }}>
          <Box>
            <Typography variant="h4" component="h1" gutterBottom>
              Sign In
            </Typography>
            <Typography color="text.secondary">
              Use your email and password to access the authenticated dashboard.
            </Typography>
          </Box>

          {serverError ? <Alert severity="error">{serverError}</Alert> : null}

          <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ display: "grid", gap: 2 }}>
            <TextField
              label="Email"
              type="email"
              fullWidth
              {...register("email")}
              error={Boolean(errors.email)}
              helperText={errors.email?.message}
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              {...register("password")}
              error={Boolean(errors.password)}
              helperText={errors.password?.message}
            />
            <Button type="submit" variant="contained" size="large" disabled={isSubmitting}>
              {isSubmitting ? "Signing in…" : "Sign In"}
            </Button>
          </Box>

          <Typography variant="body2" color="text.secondary">
            Forgot password? <Link href="#">Reset it here</Link>.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
