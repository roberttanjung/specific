"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { Button } from "@/components/Button";
import { Modal } from "@/components/Modal";

interface LoginProps {
  userStatus?: 1;
}

export function Login({ userStatus }: LoginProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [showUnassignedModal] = useState(userStatus === 1);

  const handleSignIn = async () => {
    setIsLoading(true);
    await signIn("microsoft-entra-id", { callbackUrl: "/users" });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-950 px-4">
      <div className="w-full max-w-sm">
        <div className="rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-sm p-8">
          <div className="mb-8 text-center">
            <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              SPEcific
            </span>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Sign in with your Microsoft Teams account
            </p>
          </div>

          <Button
            onClick={handleSignIn}
            isLoading={isLoading}
            className="w-full"
            leftIcon={
              <svg
                className="h-5 w-5"
                viewBox="0 0 23 23"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M11 11H0V0h11v11z" fill="#F25022" />
                <path d="M23 11H12V0h11v11z" fill="#7FBA00" />
                <path d="M11 23H0V12h11v11z" fill="#00A4EF" />
                <path d="M23 23H12V12h11v11z" fill="#FFB900" />
              </svg>
            }
          >
            Sign in with Microsoft
          </Button>
        </div>
      </div>

      <Modal
        isOpen={showUnassignedModal}
        isDismissible={false}
        title="Account Not Assigned"
        size="sm"
      >
        <p className="text-sm text-gray-600 dark:text-gray-400">
          You&#39;re not assigned yet. Please contact your administrator to get
          access to the system.
        </p>
      </Modal>
    </div>
  );
}
