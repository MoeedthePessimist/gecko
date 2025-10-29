"use client";

import { AlertCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ErrorModalProps {
  isOpen: boolean;
  errors: string[];
  onClose: () => void;
  onRetry?: () => void | Promise<void>;
  title?: string;
  description?: string;
}

export function ErrorModal({
  isOpen,
  errors,
  onClose,
  onRetry,
  title = "Something went wrong",
  description = "Please review the errors below and try again.",
}: ErrorModalProps) {
  const handleRetry = async () => {
    if (onRetry) {
      await onRetry();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 mt-0.5">
              <AlertCircle className="h-5 w-5 text-destructive" />
            </div>
            <div className="flex-1">
              <DialogTitle>{title}</DialogTitle>
              <DialogDescription className="mt-1">
                {description}
              </DialogDescription>
            </div>
            <button
              onClick={onClose}
              className="flex-shrink-0 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Close error modal"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </DialogHeader>

        {/* Error List */}
        <div className="mt-4 space-y-2 max-h-64 overflow-y-auto">
          {errors.map((error, index) => (
            <div
              key={index}
              className="flex gap-3 p-3 bg-destructive/10 rounded-lg border border-destructive/20"
            >
              <div className="flex-shrink-0 mt-0.5">
                <div className="h-2 w-2 rounded-full bg-destructive mt-1" />
              </div>
              <p className="text-sm text-foreground flex-1 break-words">
                {error}
              </p>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex gap-2 justify-end">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          {onRetry && (
            <Button onClick={handleRetry} className="gap-2">
              Retry
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
