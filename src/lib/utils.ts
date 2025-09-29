import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { rolesEnum } from "@/enums/roles.enum";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getFirstAlphabets = (text: string) => {
  if (!text) return "";

  const words = text.trim().split(/\s+/); // Split by any amount of whitespace

  if (words.length === 1) {
    return words[0].charAt(0).toLowerCase(); // Only one word, return its first letter
  }

  return words
    .filter((word) => word.length > 0)
    .map((word) => word[0].toLowerCase())
    .join("");
};

export const formatRoles = (roles: rolesEnum[]): string[] =>
  JSON.parse(roles[0]) as string[];
