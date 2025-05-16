import AuthProtectedRoute from "@/components/wrappers/auth-protected-route";
import { EmployeeProtectedRoute } from "@/components/wrappers/roles-protected-route";
import { cn } from "@/lib/utils";
import React from "react";

type EmployeeLayoutProps = {
  children: React.ReactNode;
};

const EmployeeLayout: React.FC<EmployeeLayoutProps> = ({ children }) => {
  return (
    <AuthProtectedRoute>
      <EmployeeProtectedRoute>
        <div className={cn("flex w-full h-full justify-center items-center")}>
          {children}
        </div>
      </EmployeeProtectedRoute>
    </AuthProtectedRoute>
  );
};

export default EmployeeLayout;
