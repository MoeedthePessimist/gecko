"use client";

import type React from "react";

import { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Upload, File, X, CheckCircle } from "lucide-react";

interface FileUploaderProps {
  onSelected?: (file: File) => void;
  fileName?: string;
  acceptedFileTypes?: string[];
  maxFileSize?: number; // in MB
  className?: string;
}

export function FileUploader({
  onSelected,
  fileName,
  acceptedFileTypes = ["*"],
  maxFileSize = 10,
  className,
}: FileUploaderProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const validateFile = (file: File): string | null => {
    if (file.size > maxFileSize * 1024 * 1024) {
      return `File size must be less than ${maxFileSize}MB`;
    }

    if (acceptedFileTypes[0] !== "*") {
      const fileExtension = "." + file.name.split(".").pop()?.toLowerCase();
      if (
        !acceptedFileTypes.some(
          (type) =>
            type === fileExtension ||
            file.type.startsWith(type.replace("*", ""))
        )
      ) {
        return `File type not supported. Accepted types: ${acceptedFileTypes.join(
          ", "
        )}`;
      }
    }

    return null;
  };

  const processFile = (file: File) => {
    const error = validateFile(file);
    if (error) {
      alert(error);
      return;
    }

    setSelectedFile(file);
    onSelected?.(file);
  };

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);

      const droppedFiles = e.dataTransfer.files;
      if (droppedFiles.length > 0) {
        processFile(droppedFiles[0]); // Only take first file
      }
    },
    [onSelected]
  );

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles && selectedFiles.length > 0) {
      processFile(selectedFiles[0]); // Only take first file
    }
    // Reset input value to allow selecting the same file again
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const clearFile = () => {
    setSelectedFile(null);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return (
      Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
    );
  };

  const displayFile =
    selectedFile || (fileName ? { name: fileName, size: 0 } : null);

  return (
    <div className={cn("w-full max-w-md mx-auto", className)}>
      <Card
        className={cn(
          "relative border-2 border-dashed transition-all duration-200 cursor-pointer",
          isDragOver
            ? "border-accent bg-accent/5"
            : "border-border hover:border-primary/50"
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <div className="flex flex-col items-center justify-center py-8 px-4 text-center">
          <Upload
            className={cn(
              "h-6 w-6 mb-3",
              isDragOver ? "text-accent" : "text-muted-foreground"
            )}
          />

          <p className="text-sm text-muted-foreground mb-3">
            {isDragOver ? "Drop file here" : "Drop file or click to browse"}
          </p>

          <Button variant="outline" size="sm" type="button">
            Choose File
          </Button>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept={acceptedFileTypes.join(",")}
          onChange={handleFileSelect}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
      </Card>

      {displayFile && (
        <div className="mt-4">
          <Card className="p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 flex-1 min-w-0">
                <File className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">
                    {displayFile.name}
                  </p>
                  {selectedFile && (
                    <p className="text-xs text-muted-foreground">
                      {formatFileSize(selectedFile.size)}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                {selectedFile && (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                )}
                {selectedFile && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFile}
                    className="h-6 w-6 p-0"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                )}
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
