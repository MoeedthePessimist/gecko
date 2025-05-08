import { cn } from "@/lib/utils";
import React from "react";

type AuthLayoutProps = {
  children: React.ReactNode;
};

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className={cn("flex w-full h-full justify-center items-center")}>
      {children}
    </div>
  );
};

export default AuthLayout;
