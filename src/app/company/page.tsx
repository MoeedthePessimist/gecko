"use client";

import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/context/auth-context";
import useAuth from "@/hooks/use-auth";
import React from "react";

const CompanyPage = () => {
  const { isLoggedIn, user } = useAuthContext();
  const { logout } = useAuth();
  return (
    <div>
      <p>Login Status: {isLoggedIn ? "Logged In" : "Not logged in"}</p>
      <p>Name: {user && user.name}</p>
      <Button onClick={logout}>Logout</Button>
    </div>
  );
};

export default CompanyPage;
