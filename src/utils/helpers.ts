import { ApiError } from "@/utils/api";

export const formatLocalDate = (value: string | Date): string => {
  const date = typeof value === "string" ? new Date(value) : value;
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(date);
};

export const safeJsonParse = <T>(value: string, fallback: T): T => {
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
};

export const isApiError = (error: unknown): error is ApiError => {
  return typeof error === "object" && error !== null && "status" in error;
};
