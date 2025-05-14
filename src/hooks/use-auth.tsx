import { login, register } from "@/api/auth";
import { locals } from "@/constants/locals";
import { routes } from "@/constants/routes";
import { useAuthContext } from "@/context/auth-context";
import { LoginApiResponseType } from "@/types/api.type";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";

const useAuth = () => {
  const router = useRouter();

  const { setIsLoggedIn, setUser } = useAuthContext();

  const {
    mutate: loginMutate,
    reset: loginReset,
    isPending: isLoginPending,
  } = useMutation({
    mutationFn: login,
    retry: 1,
    onSuccess: (data: LoginApiResponseType) => {
      setUser(data.user);
      setIsLoggedIn(true);
      localStorage.setItem(locals.AUTH_TOKEN, data.accessToken);
      router.replace(routes.COMPANY);
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
      router.replace(routes.LOGIN);
    },
    onError: (error: AxiosError) => {
      console.error(error);
    },
  });

  const logout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setUser(null);
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
