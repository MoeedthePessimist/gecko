"use client";
import { useAuthContext } from "@/context/auth-context";
import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import Avatar from "./avatar";
import { Separator } from "./ui/separator";
import Link from "next/link";
import useAuth from "@/hooks/use-auth";

const UserMenuPopover = () => {
  const { user } = useAuthContext();

  const { logout } = useAuth();

  return (
    <Popover>
      <PopoverTrigger>
        <Avatar
          name={user?.name || ""}
          avatar={user?.avatar || "https://github.com/shadcn.png"}
        />
      </PopoverTrigger>
      <PopoverContent className="space-y-2">
        <div className="flex gap-2 items-center">
          <Avatar
            name={user?.name || ""}
            avatar={user?.avatar || "https://github.com/shadcn.png"}
          />
          <p>{user && user.name}</p>
        </div>
        <Separator />
        <div className="flex flex-col gap-2 pt-4 px-2">
          <Link className="text-sm" href="/">
            Edit Profile
          </Link>
          <p className="text-sm cursor-pointer" onClick={logout}>
            Logout
          </p>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default UserMenuPopover;
