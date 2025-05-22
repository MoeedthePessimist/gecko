"use client";

import { me } from "@/api/user";
import { useAuthContext } from "@/context/auth-context";
import { rolesEnum } from "@/enums/roles.enum";
import useAuth from "@/hooks/use-auth";
import { useTypedQuery } from "@/hooks/use-query";
import { MeApiResponseType } from "@/types/api.type";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import SpinnerLoader from "../ui/loader";

type AuthProtectedRouteProps = {
  children: React.ReactNode;
};

const AuthProtectedRoute: React.FC<AuthProtectedRouteProps> = ({
  children,
}) => {
  const { setIsLoggedIn, setRole, setUser } = useAuthContext();
  const { logout } = useAuth();

  const { data, isError, isSuccess, isFetching } =
    useTypedQuery<MeApiResponseType>({
      queryKey: ["me"],
      queryFn: me,
      retry: 1,
    });

  // Handle auth state and redirect in an effect
  useEffect(() => {
    if (isError) {
      logout();
    }

    if (isSuccess && data) {
      setIsLoggedIn(true);
      setUser(data.user);
      setRole(data.user.roles[0] as rolesEnum);
    }
  }, [isError, isSuccess]);

  if (isFetching) {
    return (
      <div className="flex flex-1 h-full w-full justify-center items-center">
        <SpinnerLoader variant="dots" size="md" text="Loading user data" />
      </div>
    );
  }

  // Only render children if user is authenticated
  if (isSuccess && data) {
    return <>{children}</>;
  }

  return null;
};

export default AuthProtectedRoute;
