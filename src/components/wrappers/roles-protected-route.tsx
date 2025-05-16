"use client";

import { ROUTES } from "@/constants/routes";
import { useAuthContext } from "@/context/auth-context";
import { rolesEnum } from "@/enums/roles.enum";
import { useRouter } from "next/navigation";
import React from "react";

type RolesProtectedRouteProps = {
  children: React.ReactNode;
};

export const EmployeeProtectedRoute: React.FC<RolesProtectedRouteProps> = ({
  children,
}) => {
  const { role } = useAuthContext();
  const router = useRouter();

  React.useEffect(() => {
    if (role === rolesEnum.ADMIN) {
      router.replace(ROUTES.UNAUTHORIZED);
    }
  }, [role]);

  return <>{children}</>;
};

export const AdminProtectedRoute: React.FC<RolesProtectedRouteProps> = ({
  children,
}) => {
  const { role } = useAuthContext();
  const router = useRouter();

  React.useEffect(() => {
    if (role === rolesEnum.EMPLOYEE) {
      router.replace(ROUTES.UNAUTHORIZED);
    }
  }, [role]);

  return <>{children}</>;
};
