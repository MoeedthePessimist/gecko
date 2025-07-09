import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

type HeaderLinkProps = {
  href: string;
  title: string;
  active: boolean;
};

const HeaderLink: React.FC<HeaderLinkProps> = ({ href, title, active }) => {
  return (
    <Link
      href={href}
      className={cn("text-sm text-primary transition-colors", {
        "text-accent underline underline-offset-2": active,
      })}
    >
      {title}
    </Link>
  );
};

export default HeaderLink;
