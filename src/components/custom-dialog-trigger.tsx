import React, { HTMLAttributes } from "react";
import { DialogTrigger } from "./ui/dialog";
import { ClassNameValue } from "tailwind-merge";
import { cn } from "@/lib/utils";

type CustomDialogTriggerProps = {
  title: string;
  icon?: React.ReactNode;
  iconPosition?: "start" | "end";
  textOptions?: HTMLAttributes<HTMLParagraphElement>;
  containerClasses?: ClassNameValue;
  openModal?: () => void;
};

const CustomDialogTrigger: React.FC<CustomDialogTriggerProps> = ({
  title,
  icon,
  iconPosition,
  textOptions,
  containerClasses,
  openModal,
}) => {
  return (
    <DialogTrigger
      className={cn("px-4 py-2 rounded-md cursor-pointer ", containerClasses)}
    >
      <div
        className="flex gap-2 justify-center items-center"
        onClick={() => openModal && openModal()}
      >
        {iconPosition === "start" && icon && icon}
        <p {...textOptions}>{title}</p>
        {iconPosition === "end" && icon && icon}
      </div>
    </DialogTrigger>
  );
};

export default CustomDialogTrigger;
