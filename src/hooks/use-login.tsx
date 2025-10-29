"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LoginFormInputs, loginSchema } from "@/schemas/login-schema";
import useAuth from "./use-auth";

const useLogin = () => {
  const { loginMutate, isLoginPending } = useAuth();

  const loginForm = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginFormInputs) => {
    loginMutate(data);
  };

  return {
    loginForm,
    onSubmit,
    isLoading: isLoginPending,
  };
};

export default useLogin;
