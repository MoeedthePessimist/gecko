"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTypedQuery } from "@/hooks/use-query";
import { me } from "@/api/user";
import { MeApiResponseType } from "@/types/api.type";
import { useAuthContext } from "@/context/auth-context";
import { rolesEnum } from "@/enums/roles.enum";
import { ROUTES } from "@/constants/routes";
import SpinnerLoader from "../ui/loader";

type AuthRedirectProps = {
  children: React.ReactNode;
};

const AuthRedirect: React.FC<AuthRedirectProps> = ({ children }) => {
  const router = useRouter();
  const { setIsLoggedIn, setRole, setUser } = useAuthContext();

  const { data, isSuccess, isError, isFetching } =
    useTypedQuery<MeApiResponseType>({
      queryKey: ["me"],
      queryFn: me,
      staleTime: 0,
      gcTime: 0,
      refetchOnMount: true,
    });

  useEffect(() => {
    if (isSuccess && data) {
      const role = data.user.roles[0] as rolesEnum;
      setIsLoggedIn(true);
      setUser(data.user);
      setRole(role);

      // Redirect based on role
      if (role === rolesEnum.ADMIN) {
        router.replace(ROUTES.ADMIN);
      } else {
        router.replace(ROUTES.EMPLOYEE);
      }
    }
  }, [isSuccess, data, router, setIsLoggedIn, setRole, setUser]);

  if (isFetching) {
    return (
      <div className="flex justify-center items-center w-full h-full">
        <SpinnerLoader
          showText={true}
          variant="dots"
          text="Getting User Data"
        />
      </div>
    );
  }

  // Show children if not logged in or still fetching
  if (isError) return <>{children}</>;
  return null; // If redirected, don't render children
};

export default AuthRedirect;
