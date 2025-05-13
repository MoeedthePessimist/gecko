import React, { ButtonHTMLAttributes, HTMLAttributes } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

type AppButtonProps = {
  buttonOptions?: ButtonHTMLAttributes<HTMLButtonElement>;
  textOptions?: HTMLAttributes<HTMLParagraphElement>;
  isLoading?: boolean;
  title: string;
};

const AppButton: React.FC<AppButtonProps> = ({
  buttonOptions = {},
  textOptions = {},
  isLoading,
  title,
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
      {isLoading ? <p>Loading...</p> : <p {...textOptions}>{title}</p>}
    </Button>
  );
};

export default AppButton;
