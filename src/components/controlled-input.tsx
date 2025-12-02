"use client";
import React, { HTMLInputTypeAttribute } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Control, FieldPath, FieldValues } from "react-hook-form";

type ControlledInputProps<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  label?: string;
  placeholder: string;
  classNames?: string;
  type?: HTMLInputTypeAttribute;
  disabled?: boolean;
  contentEditable?: boolean;
};

const ControlledInput = <TFieldValues extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  classNames,
  type = "text",
  disabled = false,
  contentEditable = true,
}: ControlledInputProps<TFieldValues>) => {
  return (
    <FormField
      control={control}
      name={name}
      disabled={disabled}
      render={({ field }) => (
        <FormItem contentEditable={contentEditable}>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Input
              contentEditable={contentEditable}
              placeholder={placeholder}
              {...field}
              onChange={(e) => {
                const value = e.target.value;
                field.onChange(
                  type === "number"
                    ? value === ""
                      ? ""
                      : Number(value)
                    : value
                );
              }}
              className={`text-sm ${classNames}`}
              type={type}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ControlledInput;
