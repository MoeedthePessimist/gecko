import LoginForm from "@/components/forms/login";
import { ROUTES } from "@/constants/routes";
import Link from "next/link";
import React from "react";

const LoginPage = () => {
  return (
    <div className="grid h-full lg:grid-cols-2 w-full">
      <div className="flex flex-col p-6 md:p-10">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full flex flex-col justify-center items-center">
            <LoginForm />
            <p>
              {"Don't have an account?"}
              <Link href={ROUTES.REGISTER} className="ml-1 text-accent">
                Register here
              </Link>
            </p>
          </div>
        </div>
      </div>
      <div className="relative hidden lg:block bg-accent">
        {/* TODO: ADD IMAGE HERE */}
      </div>
    </div>
  );
};

export default LoginPage;
