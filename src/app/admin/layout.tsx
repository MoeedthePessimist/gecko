import AuthProtectedRoute from "@/components/wrappers/auth-protected-route";
import { AdminProtectedRoute } from "@/components/wrappers/roles-protected-route";
import { cn } from "@/lib/utils";
import React from "react";

type AdminLayoutProps = {
  children: React.ReactNode;
};

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <AuthProtectedRoute>
      <AdminProtectedRoute>
        <div className={cn("flex w-full h-full justify-center items-center")}>
          {children}
        </div>
      </AdminProtectedRoute>
    </AuthProtectedRoute>
  );
};

export default AdminLayout;
