import { UserForm } from "@/views/Users/UserForm";

interface UserDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function UserDetailPage({ params }: UserDetailPageProps) {
  const { id } = await params;
  return <UserForm mode="detail" userId={id} />;
}
