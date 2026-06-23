"use client";

import { useState } from "react";
import useSWR from "swr";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import { fetcher, getErrorMessage, postJson } from "@/utils/api";
import { ROUTES } from "@/utils/constants";
import { formSchema, FormValues } from "@/utils/schemas";
import { useAuth } from "@/context/AuthContext";
import type { HealthResponse, FormResponse } from "@/types";

export default function DashboardClient() {
  const { user, isAuthenticating, error: authError } = useAuth();
  const { data: health, error: healthError, isLoading: healthLoading, mutate } = useSWR<HealthResponse>(
    ROUTES.health,
    fetcher,
    {
      refreshInterval: 15000,
      revalidateOnFocus: false,
    }
  );

  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: yupResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      dueDate: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    setSubmitError(null);
    setSubmitSuccess(null);

    try {
      const response = await postJson<FormValues, FormResponse>(ROUTES.formSubmit, values);
      setSubmitSuccess(`Form submitted successfully: ${response.data.title}`);
      reset();
      await mutate();
    } catch (error) {
      setSubmitError(getErrorMessage(error, "Failed to submit the form."));
    }
  };

  return (
    <Box sx={{ display: "grid", gap: 3 }}>
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Application Health
          </Typography>
          {healthLoading ? (
            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
              <CircularProgress size={20} />
              <Typography>Checking server status…</Typography>
            </Box>
          ) : healthError ? (
            <Alert severity="error">{getErrorMessage(healthError)}</Alert>
          ) : (
            <Box sx={{ display: "grid", gap: 1 }}>
              <Typography>Status: {health?.status ?? "unavailable"}</Typography>
              <Typography>Uptime: {health ? Math.round(health.uptime) : "-"}s</Typography>
              <Typography>Last updated: {health?.timestamp ?? "-"}</Typography>
              <Button variant="outlined" onClick={() => mutate()}>
                Refresh
              </Button>
            </Box>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Current User
          </Typography>
          {isAuthenticating ? (
            <Typography>Loading user profile…</Typography>
          ) : authError ? (
            <Alert severity="warning">{authError}</Alert>
          ) : user ? (
            <Box sx={{ display: "grid", gap: 1 }}>
              <Typography>{user.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                {user.email}
              </Typography>
              <Typography variant="body2">Role: {user.role}</Typography>
            </Box>
          ) : (
            <Alert severity="info">No user session available.</Alert>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Submit a Form
          </Typography>
          {submitError ? <Alert severity="error">{submitError}</Alert> : null}
          {submitSuccess ? <Alert severity="success">{submitSuccess}</Alert> : null}

          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            sx={{ display: "grid", gap: 2, marginTop: 2 }}
          >
            <TextField
              label="Title"
              {...register("title")}
              error={Boolean(errors.title)}
              helperText={errors.title?.message}
              fullWidth
            />
            <TextField
              label="Description"
              {...register("description")}
              error={Boolean(errors.description)}
              helperText={errors.description?.message}
              fullWidth
              multiline
              minRows={3}
            />
            <TextField
              type="date"
              label="Due Date"
              {...register("dueDate")}
              error={Boolean(errors.dueDate)}
              helperText={errors.dueDate?.message}
              fullWidth
            />
            <Button type="submit" variant="contained" disabled={isSubmitting}>
              {isSubmitting ? "Submitting…" : "Submit"}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
