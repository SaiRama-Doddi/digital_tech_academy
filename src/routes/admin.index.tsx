import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { isUserAdminAuthenticated } from "@/lib/auth";

export const Route = createFileRoute("/admin/")({
  beforeLoad: () => {
    if (typeof window !== "undefined") {
      if (isUserAdminAuthenticated()) {
        throw redirect({ to: "/admin/dashboard" });
      } else {
        throw redirect({ to: "/admin/login" });
      }
    }
  },
  component: AdminIndexRedirectPage,
});

function AdminIndexRedirectPage() {
  const navigate = useNavigate();

  useEffect(() => {
    if (isUserAdminAuthenticated()) {
      navigate({ to: "/admin/dashboard" });
    } else {
      navigate({ to: "/admin/login" });
    }
  }, [navigate]);

  return (
    <div className="flex h-screen items-center justify-center bg-slate-900 text-white">
      <div className="text-center space-y-3">
        <div className="size-10 border-4 border-[#b66dff] border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-sm font-bold text-slate-300">Redirecting to Admin Portal...</p>
      </div>
    </div>
  );
}
