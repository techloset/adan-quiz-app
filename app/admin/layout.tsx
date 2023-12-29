"use client";

import { useAuth } from "@/context/auth";
import { useRouter } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [auth] = useAuth();
  const router = useRouter();
  if (!auth.user?.email) {
    router.push("/auth");
  }
  if (auth.user?.admin == true && auth.user.email == "admin@gmail.com") {
    return <>{children}</>;
  }
  if (auth.user?.email) {
    router.push("/");
  }
}
