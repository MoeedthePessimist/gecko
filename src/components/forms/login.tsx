"use client";
import useLogin from "@/hooks/use-login";
import React from "react";
import { Form } from "../ui/form";
import { cn } from "@/lib/utils";
import Link from "next/link";
import AppButton from "../app-button";
import ControlledInput from "../controlled-input";
import { LoginFormInputs } from "@/schemas/login-schema";

const LoginForm = () => {
  const { loginForm, onSubmit, isLoading } = useLogin();

  return (
    <Form {...loginForm}>
      .
      <form
        onSubmit={loginForm.handleSubmit(onSubmit)}
        className={cn("w-full px-8 py-8 flex flex-col gap-8", "md:w-[70%]")}
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Login to your account</h1>
          <p className={cn("text-sm text-muted-foreground", "md:text-balance")}>
            Enter your email below to login to your account
          </p>
        </div>

        <ControlledInput<LoginFormInputs>
          control={loginForm.control}
          label="Email"
          name="email"
          placeholder="Enter your email"
          type={"email"}
        />

        <ControlledInput<LoginFormInputs>
          control={loginForm.control}
          label="Password"
          name="password"
          placeholder="Enter your password"
          type={"password"}
        />

        <Link href={""} className={cn("text-sm text-right hover:underline")}>
          Forgot Password?
        </Link>
        <AppButton
          buttonOptions={{
            type: "submit",
            className: "bg-dark",
          }}
          title="Login"
          isLoading={isLoading}
        />
      </form>
    </Form>
  );
};

export default LoginForm;
