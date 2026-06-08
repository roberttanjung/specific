export type UserStatus = 0 | 1 | 2;

export type UserRole = "superadmin" | "head" | "spv" | "member";

export type Division =
  | "IT Development"
  | "HCGA"
  | "Product Development"
  | "Research & Development"
  | "IT Infrastructure, Network, and Security"
  | "Business & Relationship"
  | "FAT"
  | "Compliance & Audit"
  | "BOD/Management";

export interface User {
  _id: string;
  name: string;
  email: string;
  division: Division;
  department: string;
  superintendent?: User | string | null;
  directReports?: (User | string)[];
  status: UserStatus;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}

export interface UserListItem {
  _id: string;
  name: string;
  email: string;
  division: Division;
  department: string;
  superintendent?: { _id: string; name: string } | null;
  directReports?: { _id: string; name: string }[];
  status: UserStatus;
}

export interface UserFormData {
  name: string;
  email: string;
  division: string;
  department: string;
  superintendent: string;
  directReports: string[];
  status?: UserStatus;
}

export interface AutocompleteOption {
  value: string;
  label: string;
}
