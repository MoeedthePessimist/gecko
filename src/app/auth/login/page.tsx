import LoginForm from "@/components/forms/login";
import React from "react";

const LoginPage = () => {
  return (
    <div className="grid h-full lg:grid-cols-2 w-full">
      <div className="flex flex-col p-6 md:p-10">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full flex justify-center items-center">
            <LoginForm />
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
