export const DIVISIONS = [
  "IT Development",
  "HCGA",
  "Product Development",
  "Research & Development",
  "IT Infrastructure, Network, and Security",
  "Business & Relationship",
  "FAT",
  "Compliance & Audit",
  "BOD/Management",
] as const;

export const DEPARTMENTS: Record<string, string[]> = {
  "IT Development": ["Multiplatform"],
  HCGA: [],
  "Product Development": [],
  "Research & Development": [],
  "IT Infrastructure, Network, and Security": [],
  "Business & Relationship": [],
  FAT: [],
  "Compliance & Audit": [],
  "BOD/Management": [],
};

export const USER_STATUS = {
  INACTIVE: 0,
  UNASSIGNED: 1,
  ACTIVE: 2,
} as const;

export const ROUTES = {
  LOGIN: "/login",
  USERS: "/users",
  USERS_CREATE: "/users/create",
  USERS_DETAIL: (id: string) => `/users/${id}`,
} as const;
