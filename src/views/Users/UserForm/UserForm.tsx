"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import useSWR from "swr";
import { Header } from "@/components/Header";
import { Button } from "@/components/Button";
import { Autocomplete, MultiAutocomplete } from "@/components/Autocomplete";
import { DIVISIONS, DEPARTMENTS, ROUTES } from "@/utils/constants";
import { AutocompleteOption, UserFormData } from "@/types/user";
import api from "@/utils/api";
import { UserFormProps } from "./UserForm.types";

const schema = yup.object({
  name: yup
    .string()
    .required("Name is required")
    .min(4, "Name must be at least 4 characters")
    .max(60, "Name must be at most 60 characters"),
  email: yup
    .string()
    .email("Email must be a valid email")
    .required("Email is required")
    .min(4, "Email must be at least 4 characters")
    .max(60, "Email must be at most 60 characters"),
  division: yup.string().required("Division is required"),
  department: yup.string().required("Department is required"),
  superintendent: yup.string().required("Superintendent is required"),
  directReports: yup.array().of(yup.string().required()).default([]),
});

const inputClasses =
  "w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-500 dark:focus:border-blue-400 disabled:bg-gray-50 disabled:text-gray-500 dark:disabled:bg-gray-900 dark:disabled:text-gray-500";

const errorInputClasses =
  "border-red-500 focus:border-red-500 focus:ring-red-500 dark:border-red-500";

async function fetchSuperintendents(
  query: string,
  division: string
): Promise<AutocompleteOption[]> {
  try {
    const res = await api.get("/users/superintendents", {
      params: { q: query, division },
    });
    return res.data.data.map((u: { _id: string; name: string }) => ({
      value: u._id,
      label: u.name,
    }));
  } catch {
    return [];
  }
}

async function fetchDirectReports(
  query: string
): Promise<AutocompleteOption[]> {
  try {
    const res = await api.get("/users/members", { params: { q: query } });
    return res.data.data.map((u: { _id: string; name: string }) => ({
      value: u._id,
      label: u.name,
    }));
  } catch {
    return [];
  }
}

async function fetcher(url: string) {
  const res = await api.get(url);
  return res.data;
}

function FormField({
  label,
  error,
  required,
  children,
}: {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
      {error && (
        <p className="mt-1 text-xs text-red-500 dark:text-red-400">{error}</p>
      )}
    </div>
  );
}

export function UserForm({ mode, userId }: UserFormProps) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(mode === "create");
  const isCreate = mode === "create";

  const { data: userData, isLoading: isLoadingUser } = useSWR(
    userId ? `/users/${userId}` : null,
    fetcher
  );

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UserFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      division: "",
      department: "",
      superintendent: "",
      directReports: [],
    },
  });

  useEffect(() => {
    if (userData?.data) {
      const u = userData.data;
      reset({
        name: u.name ?? "",
        email: u.email ?? "",
        division: u.division ?? "",
        department: u.department ?? "",
        superintendent:
          typeof u.superintendent === "object"
            ? u.superintendent?._id ?? ""
            : u.superintendent ?? "",
        directReports: (u.directReports ?? []).map(
          (r: { _id: string } | string) =>
            typeof r === "object" ? r._id : r
        ),
      });
    }
  }, [userData, reset]);

  const selectedDivision = watch("division");
  const departments = selectedDivision
    ? DEPARTMENTS[selectedDivision] ?? []
    : [];

  const fetchSuperintendentOptions = useCallback(
    (query: string) => fetchSuperintendents(query, selectedDivision),
    [selectedDivision]
  );

  const onSubmit = async (data: UserFormData) => {
    try {
      if (isCreate) {
        await api.post("/users", { ...data, status: 2 });
        router.push(ROUTES.USERS);
      } else {
        await api.put(`/users/${userId}`, data);
        setIsEditing(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const pageTitle = isCreate
    ? "Create User"
    : isEditing
      ? "Edit User"
      : "User Detail";

  if (!isCreate && isLoadingUser) {
    return (
      <>
        <Header title={pageTitle} />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="mx-auto max-w-2xl animate-pulse space-y-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-16 rounded-lg bg-gray-200 dark:bg-gray-700" />
            ))}
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Header title={pageTitle} />
      <main className="flex-1 overflow-y-auto p-6">
        <div className="mx-auto max-w-2xl">
          <div className="mb-6 flex items-center gap-3">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back
            </button>
            {!isCreate && !isEditing && (
              <Button
                size="sm"
                variant="secondary"
                onClick={() => setIsEditing(true)}
              >
                Edit
              </Button>
            )}
          </div>

          <div className="rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900 p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <FormField label="Name" error={errors.name?.message} required>
                <input
                  {...register("name")}
                  type="text"
                  placeholder="Enter full name"
                  disabled={!isEditing}
                  className={`${inputClasses} ${errors.name ? errorInputClasses : ""}`}
                />
              </FormField>

              <FormField
                label="Email"
                error={errors.email?.message}
                required
              >
                <input
                  {...register("email")}
                  type="email"
                  placeholder="Enter email address"
                  disabled={!isEditing}
                  className={`${inputClasses} ${errors.email ? errorInputClasses : ""}`}
                />
              </FormField>

              <FormField
                label="Division"
                error={errors.division?.message}
                required
              >
                <select
                  {...register("division")}
                  disabled={!isEditing}
                  className={`${inputClasses} ${errors.division ? errorInputClasses : ""}`}
                >
                  <option value="">Select division</option>
                  {DIVISIONS.map((div) => (
                    <option key={div} value={div}>
                      {div}
                    </option>
                  ))}
                </select>
              </FormField>

              <FormField
                label="Department"
                error={errors.department?.message}
                required
              >
                <select
                  {...register("department")}
                  disabled={!isEditing || !selectedDivision}
                  className={`${inputClasses} ${errors.department ? errorInputClasses : ""}`}
                >
                  <option value="">Select department</option>
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </FormField>

              <Controller
                name="superintendent"
                control={control}
                render={({ field }) => (
                  <Autocomplete
                    label="Superintendent"
                    placeholder="Search superintendent..."
                    value={field.value}
                    onChange={field.onChange}
                    fetchOptions={fetchSuperintendentOptions}
                    error={errors.superintendent?.message}
                    disabled={!isEditing || !selectedDivision}
                    required
                  />
                )}
              />

              <Controller
                name="directReports"
                control={control}
                render={({ field }) => (
                  <MultiAutocomplete
                    label="Direct Report"
                    placeholder="Search members..."
                    value={field.value}
                    onChange={field.onChange}
                    fetchOptions={fetchDirectReports}
                    disabled={!isEditing}
                  />
                )}
              />

              {isEditing && (
                <div className="flex justify-end gap-3 pt-2">
                  {!isCreate && (
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() => {
                        setIsEditing(false);
                        if (userData?.data) {
                          const u = userData.data;
                          reset({
                            name: u.name ?? "",
                            email: u.email ?? "",
                            division: u.division ?? "",
                            department: u.department ?? "",
                            superintendent:
                              typeof u.superintendent === "object"
                                ? u.superintendent?._id ?? ""
                                : u.superintendent ?? "",
                            directReports: (u.directReports ?? []).map(
                              (r: { _id: string } | string) =>
                                typeof r === "object" ? r._id : r
                            ),
                          });
                        }
                      }}
                    >
                      Cancel
                    </Button>
                  )}
                  <Button type="submit" isLoading={isSubmitting}>
                    {isCreate ? "Create User" : "Save Changes"}
                  </Button>
                </div>
              )}
            </form>
          </div>
        </div>
      </main>
    </>
  );
}
