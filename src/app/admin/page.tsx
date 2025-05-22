"use client";

import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/context/auth-context";
import useAuth from "@/hooks/use-auth";
import React from "react";

const AdminPage = () => {
  const { isLoggedIn, user, role } = useAuthContext();

  console.log(isLoggedIn, "isLoggedIn");
  const { logout } = useAuth();
  return (
    <div>
      <p>Login Status: {isLoggedIn ? "Logged In" : "Not logged in"}</p>
      <p>Name: {user && user.name}</p>
      <p>Role: {role && role}</p>
      <Button onClick={logout}>Logout</Button>
    </div>
  );
};

export default AdminPage;
