"use client";
import React from "react";
import { AvatarFallback, AvatarImage, Avatar as AvatarComp } from "./ui/avatar";
import { cn, getFirstAlphabets } from "@/lib/utils";

type AvatarProps = {
  avatar: string;
  name: string;
  containerClasses?: string;
};

const Avatar: React.FC<AvatarProps> = ({ avatar, name, containerClasses }) => {
  return (
    <AvatarComp className={cn("cursor-pointer", containerClasses)}>
      <AvatarImage src={avatar} alt="avatar" />
      <AvatarFallback className="capitalize">
        {getFirstAlphabets(name || "User")}
      </AvatarFallback>
    </AvatarComp>
  );
};

export default Avatar;
