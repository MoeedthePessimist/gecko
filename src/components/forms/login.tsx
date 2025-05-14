"use client";
import useLogin from "@/hooks/use-login";
import React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import Link from "next/link";
import AppButton from "../app-button";

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

        <FormField
          control={loginForm.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={loginForm.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} className={cn("")} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
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
