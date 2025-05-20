"use client";
import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Control, FieldPath, FieldValues } from "react-hook-form";
import { Checkbox } from "./ui/checkbox";
import { cn } from "@/lib/utils";

type ControlledCheckboxProps<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  label?: string;
  children?: React.ReactNode;
};

const ControlledCheckbox = <TFieldValues extends FieldValues>({
  control,
  name,
  label,
  children,
}: ControlledCheckboxProps<TFieldValues>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <div className={cn("flex flex-row items-start space-x-3 space-y-0")}>
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
                className="cursor-pointer"
              />
            </FormControl>
            {label && (
              <div className="space-y-1 leading-none">
                <FormLabel>{label}</FormLabel>
              </div>
            )}
            {children}
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ControlledCheckbox;
