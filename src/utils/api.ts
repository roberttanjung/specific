import axios, { AxiosError } from "axios";
import { API_BASE_URL } from "@/utils/constants";

export interface ApiError extends Error {
  status?: number;
  code?: string;
  details?: unknown;
}

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "Origin": "https://lifeinspectrum.com"
  },
  timeout: 10000,
  withCredentials: true,
});

// Rely on cookie-based authentication for requests. Avoid using localStorage
// tokens here so the browser sends HttpOnly cookies set by the server.

const createApiError = (error: unknown): ApiError => {
  const apiError = new Error("An unexpected error occurred") as ApiError;

  if (error instanceof AxiosError) {
    apiError.message = error.response?.data?.message ?? error.message;
    apiError.status = error.response?.status;
    apiError.code = error.code;
    apiError.details = error.response?.data?.details ?? error.toJSON();
    return apiError;
  }

  if (error instanceof Error) {
    apiError.message = error.message;
    return apiError;
  }

  return apiError;
};

export const fetcher = async <T>(url: string): Promise<T> => {
  try {
    const response = await apiClient.get<T>(url);
    return response.data;
  } catch (error) {
    throw createApiError(error);
  }
};

export const getJson = async <T>(url: string): Promise<T> => {
  try {
    const response = await apiClient.get<T>(url);
    return response.data;
  } catch (error) {
    throw createApiError(error);
  }
};

export const postJson = async <T = void, R = void>(url: string, payload?: T): Promise<R> => {
  try {
    const response = await apiClient.post<R>(url, payload);
    return response.data;
  } catch (error) {
    throw createApiError(error);
  }
};

export const getErrorMessage = (error: unknown, defaultMessage = "Something went wrong") => {
  if (error instanceof Error) {
    return error.message || defaultMessage;
  }

  return defaultMessage;
};
