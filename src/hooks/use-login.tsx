"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LoginFormInputs, loginSchema } from "@/schemas/login-schema";

const useLogin = () => {
  const loginForm = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });
  const onSubmit = (data: LoginFormInputs) => {
    console.log("Login Data:", data);
    // handle login logic here
  };

  return {
    loginForm,
    onSubmit,
  };
};

export default useLogin;
