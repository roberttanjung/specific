import { ReactNode } from "react";
import { Sidebar } from "@/components/Sidebar";

interface AuthenticatedLayoutProps {
  children: ReactNode;
}

export default function AuthenticatedLayout({
  children,
}: AuthenticatedLayoutProps) {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-950">
      <Sidebar />
      <div className="ml-64 flex flex-1 flex-col overflow-hidden">
        {children}
      </div>
    </div>
  );
}
