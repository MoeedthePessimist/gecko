import { me } from "@/api/user";
import { ROUTES } from "@/constants/routes";
import { useAuthContext } from "@/context/auth-context";
import { rolesEnum } from "@/enums/roles.enum";
import { useTypedQuery } from "@/hooks/use-query";
import { MeApiResponseType } from "@/types/api.type";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { setIsLoggedIn, setRole, setUser } = useAuthContext();
  const router = useRouter();

  const { data, isError, isSuccess, isFetching } =
    useTypedQuery<MeApiResponseType>({
      queryKey: ["me"],
      queryFn: me,
      retry: 1,
    });

  // Handle auth state and redirect in an effect
  useEffect(() => {
    if (isError) {
      router.replace(ROUTES.LOGIN);
    }

    if (isSuccess && data) {
      setIsLoggedIn(true);
      setUser(data.user);
      setRole(data.user.roles[0] as rolesEnum);
    }
  }, [isError, isSuccess, data, setIsLoggedIn, setRole, setUser, router]);

  if (isFetching) {
    return <p>Loading...</p>;
  }

  // Only render children if user is authenticated
  if (isSuccess && data) {
    return <>{children}</>;
  }

  return null;
};

export default ProtectedRoute;
