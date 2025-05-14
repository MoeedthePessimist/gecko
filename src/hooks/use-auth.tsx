import { login, register } from "@/api/auth";
import {
  LoginApiResponseType,
  RegisterApiResponseType,
} from "@/types/api.type";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

const useAuth = () => {
  const {
    mutate: loginMutate,
    reset: loginReset,
    isPending: isLoginPending,
  } = useMutation({
    mutationFn: login,
    retry: 1,
    onSuccess: (data: LoginApiResponseType) => {
      console.log(data);
    },
    onError: (error: AxiosError) => {
      console.error(error);
    },
  });

  const {
    mutate: registerMutate,
    reset: registerReset,
    isPending: isRegisterPending,
  } = useMutation({
    mutationFn: register,
    retry: 1,
    onSuccess: (data: RegisterApiResponseType) => {
      console.log(data);
    },
    onError: (error: AxiosError) => {
      console.error(error);
    },
  });

  return {
    loginMutate,
    loginReset,
    isLoginPending,
    registerMutate,
    registerReset,
    isRegisterPending,
  };
};

export default useAuth;
