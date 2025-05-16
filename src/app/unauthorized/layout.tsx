import AuthProtectedRoute from "@/components/wrappers/auth-protected-route";
import { cn } from "@/lib/utils";
import React from "react";

type UnauthorizedLayoutProps = {
  children: React.ReactNode;
};

const UnauthorizedLayout: React.FC<UnauthorizedLayoutProps> = ({
  children,
}) => {
  return (
    <AuthProtectedRoute>
      <div
        className={cn(
          "flex w-full h-full flex-col justify-center items-center"
        )}
      >
        {children}
      </div>
    </AuthProtectedRoute>
  );
};

export default UnauthorizedLayout;
