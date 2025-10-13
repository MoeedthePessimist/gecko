import { login, register } from "@/api/auth";
import { locals } from "@/constants/locals";
import { ROUTES } from "@/constants/routes";
import { useAuthContext } from "@/context/auth-context";
import { rolesEnum } from "@/enums/roles.enum";
import { LoginApiResponseType } from "@/types/api.type";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";

const useAuth = () => {
  const router = useRouter();

  const { setIsLoggedIn, setUser, setRole } = useAuthContext();

  const {
    mutate: loginMutate,
    reset: loginReset,
    isPending: isLoginPending,
  } = useMutation({
    mutationFn: login,
    retry: 1,
    onSuccess: (data: LoginApiResponseType) => {
      const role = data.user.roles[0] as rolesEnum;
      setUser(data.user);
      setRole(role);
      setIsLoggedIn(true);
      localStorage.setItem(locals.AUTH_TOKEN, data.accessToken);
      const token = localStorage.getItem(locals.AUTH_TOKEN);
      if (token) {
        if (role === rolesEnum.ADMIN) router.replace(ROUTES.ADMIN);
        else if (role === rolesEnum.EMPLOYEE) router.replace(ROUTES.EMPLOYEE);
      }
    },
    onError: (error: AxiosError) => {
      console.error(error);
      logout();
    },
  });

  const {
    mutate: registerMutate,
    reset: registerReset,
    isPending: isRegisterPending,
  } = useMutation({
    mutationFn: register,
    retry: 1,
    onSuccess: () => {
      router.replace(ROUTES.LOGIN);
    },
    onError: (error: AxiosError) => {
      console.error(error);
    },
  });

  const logout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setUser(null);
    setRole("");
    router.replace(ROUTES.LOGIN);
  };

  return {
    loginMutate,
    loginReset,
    isLoginPending,
    registerMutate,
    registerReset,
    isRegisterPending,
    logout,
  };
};

export default useAuth;
