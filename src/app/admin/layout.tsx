import AdminHeader from "@/components/headers/admin-header";
import { AdminSidebar } from "@/components/sidebars/admin-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import AuthProtectedRoute from "@/components/wrappers/auth-protected-route";
import { AdminProtectedRoute } from "@/components/wrappers/roles-protected-route";
import React from "react";

type AdminLayoutProps = {
  children: React.ReactNode;
};

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <AuthProtectedRoute>
      <AdminProtectedRoute>
        <SidebarProvider>
          <AdminSidebar />
          <SidebarInset>
            <AdminHeader />
            <main className="w-full px-2 md:px-6 mt-14 mb-4">{children}</main>
          </SidebarInset>
        </SidebarProvider>
      </AdminProtectedRoute>
    </AuthProtectedRoute>
  );
};

export default AdminLayout;
