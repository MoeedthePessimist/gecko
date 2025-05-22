import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

type LogoProps = {
  size?: number;
  rounded?: boolean;
};

const Logo: React.FC<LogoProps> = ({ size = 40, rounded = true }) => {
  return (
    <Image
      src={"/images/logo.png"}
      alt="logo"
      width={size}
      height={size}
      className={cn({
        "rounded-full": rounded,
      })}
    />
  );
};

export default Logo;
