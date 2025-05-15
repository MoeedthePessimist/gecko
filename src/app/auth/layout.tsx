import AuthRedirect from "@/components/wrappers/auth-redirect";
import { cn } from "@/lib/utils";
import React from "react";

type AuthLayoutProps = {
  children: React.ReactNode;
};

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <AuthRedirect>
      <div className={cn("flex w-full h-full justify-center items-center")}>
        {children}
      </div>
    </AuthRedirect>
  );
};

export default AuthLayout;
