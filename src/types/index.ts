export interface HealthResponse {
  status: string;
  uptime: number;
  timestamp: string;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: "superadmin" | "head" | "spv" | "user";
}

export interface FormPayload {
  title: string;
  description: string;
  dueDate: string;
}

export interface FormResponse {
  success: boolean;
  data: FormPayload;
}
