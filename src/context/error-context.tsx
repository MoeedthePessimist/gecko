"use client";

import type React from "react";

import { createContext, useContext, useState, useCallback } from "react";
import { ErrorModal } from "@/components/modals/error";

interface ErrorContextType {
  showError: (
    errors: string | string[],
    options?: {
      title?: string;
      description?: string;
      onRetry?: () => void | Promise<void>;
    }
  ) => void;
  closeError: () => void;
}

const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

export function ErrorProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [title, setTitle] = useState("Something went wrong");
  const [description, setDescription] = useState(
    "Please review the errors below and try again."
  );
  const [onRetry, setOnRetry] = useState<
    (() => void | Promise<void>) | undefined
  >(undefined);

  const showError = useCallback(
    (
      errorInput: string | string[],
      options?: {
        title?: string;
        description?: string;
        onRetry?: () => void | Promise<void>;
      }
    ) => {
      const errorArray = Array.isArray(errorInput) ? errorInput : [errorInput];
      setErrors(errorArray);
      setTitle(options?.title || "Something went wrong");
      setDescription(
        options?.description || "Please review the errors below and try again."
      );
      setOnRetry(() => options?.onRetry);
      setIsOpen(true);
    },
    []
  );

  const closeError = useCallback(() => {
    setIsOpen(false);
    // Reset after animation completes
    setTimeout(() => {
      setErrors([]);
      setOnRetry(undefined);
    }, 300);
  }, []);

  return (
    <ErrorContext.Provider value={{ showError, closeError }}>
      {children}
      <ErrorModal
        isOpen={isOpen}
        errors={errors}
        onClose={closeError}
        onRetry={onRetry}
        title={title}
        description={description}
      />
    </ErrorContext.Provider>
  );
}

export function useErrorModal() {
  const context = useContext(ErrorContext);
  if (!context) {
    throw new Error("useErrorModal must be used within ErrorProvider");
  }
  return context;
}
