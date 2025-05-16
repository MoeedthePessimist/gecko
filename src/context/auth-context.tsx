"use client";

import { rolesEnum } from "@/enums/roles.enum";
import { AuthContextType } from "@/types/context.type";
import { User } from "@/types/user.type";
import React, { createContext, useContext, useState } from "react";

type AuthProviderProps = {
  children: React.ReactNode;
};

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  user: null,
  role: "",
  setUser: () => {},
  setIsLoggedIn: () => {},
  setRole: () => {},
});

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<rolesEnum | string>("");

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, user, role, setIsLoggedIn, setUser, setRole }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
