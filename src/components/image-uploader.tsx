"use client";

import type React from "react";

import { useState, useRef, useCallback, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Camera, X, User } from "lucide-react";
import { cn } from "@/lib/utils";
import useUpload from "@/hooks/use-upload";
import { env } from "@/configs/env";

interface ImageUploaderProps {
  currentImage?: string;
  onImageUpload?: (fileName: string) => void;
  onImageRemove?: () => void;
  maxSize?: number; // in MB
  className?: string;
}

export default function ImageUploader({
  currentImage,
  onImageUpload,
  onImageRemove,
  maxSize = 5,
  className,
}: ImageUploaderProps) {
  const [preview, setPreview] = useState<string | null>(
    `${env.axios.CDN_URL}${currentImage}` || null
  );
  const [, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { uploadMutation } = useUpload();

  const validateFile = (file: File): string | null => {
    if (!file.type.startsWith("image/")) {
      return "Please select an image file";
    }
    if (file.size > maxSize * 1024 * 1024) {
      return `File size must be less than ${maxSize}MB`;
    }
    return null;
  };

  const handleFileSelect = useCallback(
    async (file: File) => {
      const validationError = validateFile(file);
      if (validationError) {
        setError(validationError);
        return;
      }

      setError(null);

      try {
        // Create preview
        const reader = new FileReader();
        reader.onload = (e) => {
          setPreview(e.target?.result as string);
        };
        reader.readAsDataURL(file);

        uploadMutation.mutate(file);
      } catch (err) {
        setError("Failed to upload image");
        console.error("Upload error:", err);
      }
    },
    [onImageUpload, maxSize]
  );

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleRemoveImage = () => {
    setPreview(null);
    setError(null);
    onImageRemove?.();
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  useEffect(() => {
    if (uploadMutation.isSuccess) {
      console.log(uploadMutation.data.data);
      onImageUpload && onImageUpload(uploadMutation.data.data.fileName);
    }
  }, [uploadMutation.isSuccess]);

  return (
    <div className={cn("flex flex-col items-center space-y-4", className)}>
      {/* Avatar Preview */}
      <div className="relative group">
        <Avatar
          className="w-32 h-32 border-4 border-background shadow-lg cursor-pointer"
          onClick={triggerFileInput}
        >
          <AvatarImage src={preview || undefined} alt="Profile" />
          <AvatarFallback className="bg-muted">
            <User className="w-12 h-12 text-muted-foreground" />
          </AvatarFallback>
        </Avatar>

        {/* Remove button */}
        {preview && !uploadMutation.isPending && (
          <Button
            size="sm"
            variant="destructive"
            className="absolute -top-2 -right-2 w-8 h-8 rounded-full p-0 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={handleRemoveImage}
          >
            <X className="w-4 h-4" />
          </Button>
        )}

        {/* Upload overlay */}
        <div
          className="absolute inset-0 rounded-full bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
          onClick={triggerFileInput}
        >
          <Camera className="w-8 h-8 text-white" />
        </div>

        {/* Loading overlay */}
        {uploadMutation.isPending && (
          <div className="absolute inset-0 rounded-full bg-black/70 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileInputChange}
        className="hidden"
      />
    </div>
  );
}
