"use client";
import React from "react";
import { AvatarFallback, AvatarImage, Avatar as AvatarComp } from "./ui/avatar";
import { useAuthContext } from "@/context/auth-context";
import { getFirstAlphabets } from "@/lib/utils";

const Avatar = () => {
  const { user } = useAuthContext();

  return (
    <AvatarComp className="cursor-pointer">
      <AvatarImage
        src={
          user && user.avatar ? user.avatar : "https://github.com/shadcn.png"
        }
        alt="avatar"
      />
      <AvatarFallback className="capitalize">
        {getFirstAlphabets((user && user.name) || "User")}
      </AvatarFallback>
    </AvatarComp>
  );
};

export default Avatar;
