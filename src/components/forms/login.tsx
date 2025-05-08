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
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

const LoginForm = () => {
  const { loginForm, onSubmit } = useLogin();

  return (
    <Form {...loginForm}>
      .
      <form
        onSubmit={loginForm.handleSubmit(onSubmit)}
        className=" w-[70%] px-8 py-8 flex flex-col gap-8"
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Login to your account</h1>
          <p className="text-balance text-sm text-muted-foreground">
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
        <Button type="submit" className={cn("bg-dark")}>
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
