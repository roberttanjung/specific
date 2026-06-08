export type UserFormMode = "create" | "detail" | "edit";

export interface UserFormProps {
  mode: UserFormMode;
  userId?: string;
}
