"use client";

import { CheckCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface SuccessModalProps {
  isOpen: boolean;
  messages: string[];
  onClose: () => void;
  title?: string;
  description?: string;
}

export function SuccessModal({
  isOpen,
  messages,
  onClose,
  title = "Success!",
  description = "Your action completed successfully.",
}: SuccessModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 mt-0.5">
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
            <div className="flex-1">
              <DialogTitle>{title}</DialogTitle>
              <DialogDescription className="mt-1">
                {description}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {/* Success Messages */}
        <div className="mt-4 space-y-2 max-h-64 overflow-y-auto">
          {messages.map((message, index) => (
            <div
              key={index}
              className="flex gap-3 p-3 bg-green-50 rounded-lg border border-green-200"
            >
              <div className="flex-shrink-0 mt-0.5">
                <div className="h-2 w-2 rounded-full bg-green-600 mt-1" />
              </div>
              <p className="text-sm text-foreground flex-1 break-words">
                {message}
              </p>
            </div>
          ))}
        </div>

        {/* Action Button */}
        <div className="mt-6 flex gap-2 justify-end">
          <Button onClick={onClose}>Done</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
