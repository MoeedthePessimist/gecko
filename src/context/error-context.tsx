"use client";

import type React from "react";

import { createContext, useContext, useState, useCallback } from "react";
import { ErrorModal } from "@/components/modals/error";
import { SuccessModal } from "@/components/modals/success";
import { ConfirmationModal } from "@/components/modals/confirmation";

interface GlobalModalContextType {
  showError: (
    errors: string | string[],
    options?: {
      title?: string;
      description?: string;
      onRetry?: () => void | Promise<void>;
    }
  ) => void;
  closeError: () => void;
  showSuccess: (
    messages: string | string[],
    options?: {
      title?: string;
      description?: string;
    }
  ) => void;
  closeSuccess: () => void;
  showConfirmation: (
    message: string,
    onConfirm: () => void | Promise<void>,
    options?: {
      title?: string;
      description?: string;
      confirmText?: string;
      cancelText?: string;
      isDestructive?: boolean;
    }
  ) => void;
  closeConfirmation: () => void;
}

const GlobalModalContext = createContext<GlobalModalContextType | undefined>(
  undefined
);

export function ErrorProvider({ children }: { children: React.ReactNode }) {
  const [isErrorOpen, setIsErrorOpen] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [errorTitle, setErrorTitle] = useState("Something went wrong");
  const [errorDescription, setErrorDescription] = useState(
    "Please review the errors below and try again."
  );
  const [onRetry, setOnRetry] = useState<
    (() => void | Promise<void>) | undefined
  >(undefined);

  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [successMessages, setSuccessMessages] = useState<string[]>([]);
  const [successTitle, setSuccessTitle] = useState("Success!");
  const [successDescription, setSuccessDescription] = useState(
    "Your action completed successfully."
  );

  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [confirmationTitle, setConfirmationTitle] = useState("Confirm Action");
  const [confirmationDescription, setConfirmationDescription] = useState(
    "Are you sure you want to proceed?"
  );
  const [confirmationConfirmText, setConfirmationConfirmText] =
    useState("Confirm");
  const [confirmationCancelText, setConfirmationCancelText] =
    useState("Cancel");
  const [confirmationIsDestructive, setConfirmationIsDestructive] =
    useState(false);
  const [onConfirmation, setOnConfirmation] = useState<
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
      setErrorTitle(options?.title || "Something went wrong");
      setErrorDescription(
        options?.description || "Please review the errors below and try again."
      );
      setOnRetry(() => options?.onRetry);
      setIsErrorOpen(true);
    },
    []
  );

  const closeError = useCallback(() => {
    setIsErrorOpen(false);
    // Reset after animation completes
    setTimeout(() => {
      setErrors([]);
      setOnRetry(undefined);
    }, 300);
  }, []);

  const showSuccess = useCallback(
    (
      messageInput: string | string[],
      options?: {
        title?: string;
        description?: string;
      }
    ) => {
      const messageArray = Array.isArray(messageInput)
        ? messageInput
        : [messageInput];
      setSuccessMessages(messageArray);
      setSuccessTitle(options?.title || "Success!");
      setSuccessDescription(
        options?.description || "Your action completed successfully."
      );
      setIsSuccessOpen(true);
    },
    []
  );

  const closeSuccess = useCallback(() => {
    setIsSuccessOpen(false);
    // Reset after animation completes
    setTimeout(() => {
      setSuccessMessages([]);
    }, 300);
  }, []);

  const showConfirmation = useCallback(
    (
      message: string,
      onConfirm: () => void | Promise<void>,
      options?: {
        title?: string;
        description?: string;
        confirmText?: string;
        cancelText?: string;
        isDestructive?: boolean;
      }
    ) => {
      setConfirmationMessage(message);
      setConfirmationTitle(options?.title || "Confirm Action");
      setConfirmationDescription(
        options?.description || "Are you sure you want to proceed?"
      );
      setConfirmationConfirmText(options?.confirmText || "Confirm");
      setConfirmationCancelText(options?.cancelText || "Cancel");
      setConfirmationIsDestructive(options?.isDestructive || false);
      setOnConfirmation(() => onConfirm);
      setIsConfirmationOpen(true);
    },
    []
  );

  const closeConfirmation = useCallback(() => {
    setIsConfirmationOpen(false);
    // Reset after animation completes
    setTimeout(() => {
      setConfirmationMessage("");
      setOnConfirmation(undefined);
    }, 300);
  }, []);

  return (
    <GlobalModalContext.Provider
      value={{
        showError,
        closeError,
        showSuccess,
        closeSuccess,
        showConfirmation,
        closeConfirmation,
      }}
    >
      {children}
      <ErrorModal
        isOpen={isErrorOpen}
        errors={errors}
        onClose={closeError}
        onRetry={onRetry}
        title={errorTitle}
        description={errorDescription}
      />
      <SuccessModal
        isOpen={isSuccessOpen}
        messages={successMessages}
        onClose={closeSuccess}
        title={successTitle}
        description={successDescription}
      />
      <ConfirmationModal
        isOpen={isConfirmationOpen}
        message={confirmationMessage}
        onConfirm={onConfirmation || (() => {})}
        onCancel={closeConfirmation}
        title={confirmationTitle}
        description={confirmationDescription}
        confirmText={confirmationConfirmText}
        cancelText={confirmationCancelText}
        isDestructive={confirmationIsDestructive}
      />
    </GlobalModalContext.Provider>
  );
}

export function useGlobalModal() {
  const context = useContext(GlobalModalContext);
  if (!context) {
    throw new Error("useGlobalModal must be used within GlobalProvider");
  }
  return context;
}
