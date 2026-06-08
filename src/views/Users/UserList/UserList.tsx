"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import { Table, Column } from "@/components/Table";
import { IconButton, Button } from "@/components/Button";
import { Modal } from "@/components/Modal";
import { Header } from "@/components/Header";
import { UserListItem } from "@/types/user";
import { ROUTES } from "@/utils/constants";
import api from "@/utils/api";

async function fetcher(url: string) {
  const res = await api.get(url);
  return res.data;
}

function CopyEmailCell({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  return (
    <div className="group flex items-center gap-2">
      <span className="text-gray-700 dark:text-gray-300">{email}</span>
      <span className="opacity-0 group-hover:opacity-100 transition-opacity">
        <IconButton
          icon={
            copied ? (
              <svg
                className="h-4 w-4 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            ) : (
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
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
            )
          }
          label={copied ? "Copied!" : "Copy email"}
          size="sm"
          onClick={handleCopy}
        />
      </span>
    </div>
  );
}

export function UserList() {
  const router = useRouter();
  const [deleteTarget, setDeleteTarget] = useState<UserListItem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const { data, isLoading, mutate } = useSWR<{ data: UserListItem[] }>(
    "/users",
    fetcher
  );

  const users = data?.data ?? [];

  const handleRowClick = useCallback(
    (user: UserListItem) => {
      router.push(ROUTES.USERS_DETAIL(user._id));
    },
    [router]
  );

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;

    setIsDeleting(true);
    try {
      await api.patch(`/users/${deleteTarget._id}`, { status: 0 });
      await mutate();
      setDeleteTarget(null);
    } finally {
      setIsDeleting(false);
    }
  };

  const columns: Column<UserListItem>[] = [
    {
      key: "name",
      header: "Name",
      render: (row) => (
        <span className="font-medium text-gray-900 dark:text-gray-100">
          {row.name}
        </span>
      ),
    },
    {
      key: "email",
      header: "Email",
      render: (row) => <CopyEmailCell email={row.email} />,
    },
    {
      key: "division",
      header: "Division",
      render: (row) => row.division,
    },
    {
      key: "department",
      header: "Department",
      render: (row) => row.department,
    },
    {
      key: "superintendent",
      header: "Superintendent",
      render: (row) =>
        typeof row.superintendent === "object" && row.superintendent
          ? row.superintendent.name
          : "-",
    },
    {
      key: "directReports",
      header: "Direct Report",
      render: (row) =>
        row.directReports && row.directReports.length > 0
          ? row.directReports
              .map((r) => (typeof r === "object" ? r.name : r))
              .join(", ")
          : "-",
    },
    {
      key: "actions",
      header: "Actions",
      headerClassName: "text-right",
      className: "text-right",
      render: (row) => (
        <div className="flex items-center justify-end gap-1">
          <IconButton
            icon={
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
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            }
            label="Edit user"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              router.push(ROUTES.USERS_DETAIL(row._id));
            }}
          />
          <IconButton
            icon={
              <svg
                className="h-4 w-4 text-red-500 dark:text-red-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            }
            label="Delete user"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              setDeleteTarget(row);
            }}
          />
        </div>
      ),
    },
  ];

  return (
    <>
      <Header title="User Management" />
      <main className="flex-1 overflow-y-auto p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
              Users
            </h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Manage team members and their access
            </p>
          </div>
          <Button onClick={() => router.push(ROUTES.USERS_CREATE)}>
            + Add User
          </Button>
        </div>

        <Table
          columns={columns}
          data={users}
          onRowClick={handleRowClick}
          keyExtractor={(row) => row._id}
          isLoading={isLoading}
          emptyMessage="No users found."
        />
      </main>

      <Modal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        title="Delete User"
        size="sm"
        footer={
          <>
            <Button
              variant="secondary"
              onClick={() => setDeleteTarget(null)}
              disabled={isDeleting}
            >
              No
            </Button>
            <Button
              variant="danger"
              onClick={handleDeleteConfirm}
              isLoading={isDeleting}
            >
              Yes, Delete
            </Button>
          </>
        }
      >
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Are you sure you want to delete{" "}
          <span className="font-semibold text-gray-900 dark:text-gray-100">
            {deleteTarget?.name}
          </span>
          ? This action will deactivate the user account.
        </p>
      </Modal>
    </>
  );
}
