import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyAuthToken } from "@/lib/server/auth";
import AuthenticatedClient from "@/app/authenticated/AuthenticatedClient";

export default async function AuthenticatedPage() {
  const token = (await cookies()).get("appToken")?.value;
  if (!token) {
    redirect("/login");
  }

  try {
    verifyAuthToken(token);
  } catch {
    redirect("/login");
  }

  return <AuthenticatedClient />;
}
