"use client";

import React from "react";
import { Control, FieldPath, FieldValues } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { BOOLEAN_OPTIONS } from "@/constants/options";

type ControlledSelectProps<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  label?: string;
  list: string[];
  placeholder?: string;
};

const ControlledSelect = <TFieldValues extends FieldValues>({
  control,
  name,
  label,
  list,
  placeholder,
}: ControlledSelectProps<TFieldValues>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl className="w-full">
              <SelectTrigger className="cursor-pointer">
                <SelectValue placeholder={placeholder || "Select"} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {list.map((item) => (
                <SelectItem value={item} key={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ControlledSelect;
