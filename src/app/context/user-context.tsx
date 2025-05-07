"use client";

import { UserContextType } from "@/types/context.types";
import React, { createContext, useContext, useState } from "react";

type UserProviderProps = {
  children: React.ReactNode;
};

const UserContext = createContext<UserContextType>({
  isLoggedIn: false,
});

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [isLoggedIn] = useState<boolean>(false);
  return (
    <UserContext.Provider value={{ isLoggedIn }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within UserProvider");
  return context;
};
