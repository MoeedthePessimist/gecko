"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTypedQuery } from "@/hooks/use-query";
import { me } from "@/api/user";
import { MeApiResponseType } from "@/types/api.type";
import { useAuthContext } from "@/context/auth-context";
import { rolesEnum } from "@/enums/roles.enum";
import { ROUTES } from "@/constants/routes";
import SpinnerLoader from "../ui/loader";
import { locals } from "@/constants/locals";
import { useQueryClient } from "@tanstack/react-query";

type AuthRedirectProps = {
  children: React.ReactNode;
};

const AuthRedirect: React.FC<AuthRedirectProps> = ({ children }) => {
  const router = useRouter();
  const { setIsLoggedIn, setRole, setUser } = useAuthContext();

  const queryClient = useQueryClient();

  queryClient.invalidateQueries({ queryKey: ["me"] });

  // state for token
  const [token, setToken] = useState<string | null>(null);

  const { data, isSuccess, isFetching } = useTypedQuery<MeApiResponseType>({
    queryKey: ["me"],
    queryFn: me,
    staleTime: 0,
    gcTime: 0,
    refetchOnMount: false,
    enabled: !!token,
  });

  // ✅ only access localStorage on client
  useEffect(() => {
    const storedToken = localStorage.getItem(locals.AUTH_TOKEN);
    setToken(storedToken);
  }, []);

  useEffect(() => {
    console.log(data, isSuccess, token);

    if (isSuccess && data && token) {
      const role = data.user.roles[0] as rolesEnum;
      setIsLoggedIn(true);
      setUser(data.user);
      setRole(role);

      // Redirect based on role
      if (role === rolesEnum.ADMIN) {
        return router.replace(ROUTES.ADMIN);
      } else {
        return router.replace(ROUTES.EMPLOYEE);
      }
    }
  }, [isSuccess, data, router, setIsLoggedIn, setRole, setUser]);

  useEffect(() => {
    console.log(token, "token inside the useeffect");
  }, [token]);

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
  return <>{children}</>;
  // return null; // If redirected, don't render children
};

export default AuthRedirect;
