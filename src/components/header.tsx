"use client";
import { cn, getFirstAlphabets } from "@/lib/utils";
import React from "react";
import Logo from "./ui/logo";
import links from "../../public/data/header-links.json";
import HeaderLink from "./header-link";
import { usePathname, useRouter } from "next/navigation";
import { useAuthContext } from "@/context/auth-context";
import AppButton from "./app-button";
import { ROUTES } from "@/constants/routes";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";
import Link from "next/link";
import useAuth from "@/hooks/use-auth";
import Image from "next/image";

const Header = () => {
  const pathname = usePathname();

  const router = useRouter();

  const handlePressAuth = (route: string) => {
    router.push(route);
  };

  const { isLoggedIn, user } = useAuthContext();

  const { logout } = useAuth();

  const getAvatar = () => {
    return (
      <Avatar className="cursor-pointerr">
        <AvatarImage
          src={(user && user.avatar) || "https://github.com/shadcn.png"}
          alt="avatar"
        />
        <AvatarFallback className="capitalize">
          {getFirstAlphabets((user && user.name) || "User")}
        </AvatarFallback>
      </Avatar>
    );
  };

  return (
    <div className={cn("w-full border-b-2 px-5 h-12 fixed z-10 ")}>
      <div className="w-full flex items-center justify-between relative h-full">
        <Logo />
        <div className="hidden md:flex gap-4 justify-center items-center absolute left-1/2 -translate-x-1/2">
          {links.map((link) => (
            <HeaderLink
              href={link.href}
              title={link.title}
              key={link.title}
              active={pathname === link.href}
            />
          ))}
        </div>

        <div className="flex items-center justify-center gap-4">
          {/* User Menu */}
          {!isLoggedIn ? (
            <div className="flex gap-4 items-center">
              <Link
                href={ROUTES.LOGIN}
                className={cn("text-sm hover:underline")}
              >
                Login
              </Link>
              <AppButton
                title="Register"
                buttonOptions={{
                  onClick: () => handlePressAuth(ROUTES.REGISTER),
                  className: "rounded-full bg-accent",
                }}
              />
            </div>
          ) : (
            <Popover>
              <PopoverTrigger>{getAvatar()}</PopoverTrigger>
              <PopoverContent className="space-y-2">
                <div className="flex gap-2 items-center">
                  {getAvatar()}
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
          )}

          {/* Burger Menu for mobile display */}

          <Popover>
            <PopoverTrigger className={cn("block md:hidden")}>
              <Image src="/menu.svg" alt="menu icon" width={20} height={20} />
            </PopoverTrigger>
            <PopoverContent className="space-y-2">
              <div className="flex flex-col gap-2 px-2">
                {links.map((link) => (
                  <HeaderLink
                    href={link.href}
                    title={link.title}
                    key={link.title}
                    active={pathname === link.href}
                  />
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default Header;
