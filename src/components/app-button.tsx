import React, { ButtonHTMLAttributes, HTMLAttributes } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import SpinnerLoader from "./ui/loader";

type AppButtonProps = {
  buttonOptions?: ButtonHTMLAttributes<HTMLButtonElement>;
  textOptions?: HTMLAttributes<HTMLParagraphElement>;
  isLoading?: boolean;
  title: string;
  icon?: React.ReactNode;
  iconPosition?: "start" | "end";
};

const AppButton: React.FC<AppButtonProps> = ({
  buttonOptions = {},
  textOptions = {},
  isLoading,
  title,
  icon,
  iconPosition,
}) => {
  const { className: buttonClassName, ...restButtonOptions } = buttonOptions;

  return (
    <Button
      {...restButtonOptions}
      className={cn(
        buttonClassName,
        isLoading ? "cursor-not-allowed" : "cursor-pointer"
      )}
      disabled={isLoading || buttonOptions?.disabled}
    >
      {isLoading ? (
        <SpinnerLoader size="sm" showText={false} />
      ) : (
        <div className="flex gap-2 justify-center items-center">
          {iconPosition === "start" && icon && icon}
          <p {...textOptions}>{title}</p>
          {iconPosition === "end" && icon && icon}
        </div>
      )}
    </Button>
  );
};

export default AppButton;
