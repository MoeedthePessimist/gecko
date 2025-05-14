import { cn } from "@/lib/utils";
import React from "react";

type CompanyLayoutProps = {
  children: React.ReactNode;
};

const CompanyLayout: React.FC<CompanyLayoutProps> = ({ children }) => {
  return (
    <div className={cn("flex w-full h-full justify-center items-center")}>
      {children}
    </div>
  );
};

export default CompanyLayout;
