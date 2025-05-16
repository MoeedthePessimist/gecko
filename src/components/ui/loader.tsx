"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

type LoaderVariant = "circle" | "dots" | "pulse";
type LoaderSize = "sm" | "md" | "lg";

interface SpinnerLoaderProps {
  variant?: LoaderVariant;
  size?: LoaderSize;
  className?: string;
  showText?: boolean;
  text?: string;
}

export default function SpinnerLoader({
  variant = "circle",
  size = "md",
  className,
  showText = true,
  text = "Loading...",
}: SpinnerLoaderProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  };

  const textSizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-2",
        className
      )}
    >
      {variant === "circle" && (
        <div
          className={cn(
            "rounded-full border-4 border-secondary animate-spin",
            sizeClasses[size]
          )}
          style={{
            borderTopColor: "var(--color-accent)",
            borderRightColor: "var(--color-dark)",
            borderBottomColor: "var(--color-primary)",
          }}
          role="status"
          aria-label="Loading"
        >
          <span className="sr-only">Loading</span>
        </div>
      )}

      {variant === "dots" && (
        <div className="flex space-x-1" role="status" aria-label="Loading">
          <div
            className={cn("rounded-full animate-bounce", sizeClasses[size])}
            style={{
              backgroundColor: "var(--color-primary)",
              animationDelay: "0ms",
            }}
          />
          <div
            className={cn("rounded-full animate-bounce", sizeClasses[size])}
            style={{
              backgroundColor: "var(--color-dark)",
              animationDelay: "150ms",
            }}
          />
          <div
            className={cn("rounded-full animate-bounce", sizeClasses[size])}
            style={{
              backgroundColor: "var(--color-accent)",
              animationDelay: "300ms",
            }}
          />
          <span className="sr-only">Loading</span>
        </div>
      )}

      {variant === "pulse" && (
        <div
          className={cn(
            "rounded-full animate-pulse flex items-center justify-center",
            sizeClasses[size]
          )}
          style={{ backgroundColor: "var(--color-secondary)" }}
          role="status"
          aria-label="Loading"
        >
          <div
            className="h-3/4 w-3/4 rounded-full"
            style={{ backgroundColor: "var(--color-accent)" }}
          />
          <span className="sr-only">Loading</span>
        </div>
      )}

      {showText && (
        <p
          className={cn("font-medium", textSizeClasses[size])}
          style={{ color: "var(--color-primary)" }}
        >
          {text}
        </p>
      )}
    </div>
  );
}
