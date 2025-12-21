"use client";

import { useState, useRef, DragEvent, ChangeEvent } from "react";
import { Image as ImageIcon, Upload, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface ImageUploadProps {
  value?: string; // Current image URL
  onChange: (url: string) => void; // Callback when image changes
  onUpload: (
    file: File
  ) => Promise<{ success: boolean; publicUrl?: string; error?: string }>;
  onDelete?: (url: string) => Promise<{ success: boolean; error?: string }>; // Optional delete callback
  disabled?: boolean;
  aspectRatio?: "video" | "square" | "portrait"; // For different layouts
  maxSizeMB?: number;
  allowUrl?: boolean; // Allow manual URL input
}

export function ImageUpload({
  value,
  onChange,
  onUpload,
  onDelete,
  disabled = false,
  aspectRatio = "video",
  maxSizeMB = 10,
  allowUrl = true,
}: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [urlInput, setUrlInput] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const aspectClasses = {
    video: "aspect-video",
    square: "aspect-square",
    portrait: "aspect-[3/4]",
  };

  // Validate file client-side
  const validateFile = (file: File): string | null => {
    // Check file type
    const allowedTypes = [
      "image/png",
      "image/jpeg",
      "image/jpg",
      "image/webp",
      "image/gif",
    ];
    if (!allowedTypes.includes(file.type)) {
      return "Invalid file type. Please upload PNG, JPEG, WebP, or GIF.";
    }

    // Check file size
    const maxBytes = maxSizeMB * 1024 * 1024;
    if (file.size > maxBytes) {
      return `File size exceeds ${maxSizeMB}MB limit.`;
    }

    return null;
  };

  // Handle file upload
  const handleFileUpload = async (file: File) => {
    setError(null);

    // Validate
    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    // Simulate progress (real progress tracking requires different approach)
    const progressInterval = setInterval(() => {
      setUploadProgress((prev) => Math.min(prev + 10, 90));
    }, 200);

    try {
      const result = await onUpload(file);

      clearInterval(progressInterval);
      setUploadProgress(100);

      if (result.success && result.publicUrl) {
        onChange(result.publicUrl);
        setTimeout(() => {
          setUploadProgress(0);
        }, 500);
      } else {
        setError(result.error || "Upload failed");
        setUploadProgress(0);
      }
    } catch (err) {
      clearInterval(progressInterval);
      setError(err instanceof Error ? err.message : "Upload failed");
      setUploadProgress(0);
    } finally {
      setIsUploading(false);
    }
  };

  // Drag and drop handlers
  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!disabled) setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    if (disabled) return;

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  // File input change
  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  // URL input submit
  const handleUrlSubmit = () => {
    if (urlInput.trim()) {
      onChange(urlInput.trim());
      setUrlInput("");
      setShowUrlInput(false);
    }
  };

  // Remove image
  const handleRemove = async () => {
    if (!value) return;

    // If onDelete handler is provided, call it to delete from storage
    if (onDelete) {
      setIsDeleting(true);
      setError(null);

      try {
        const result = await onDelete(value);

        if (!result.success) {
          setError(result.error || "Failed to delete image");
          setIsDeleting(false);
          return;
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to delete image");
        setIsDeleting(false);
        return;
      } finally {
        setIsDeleting(false);
      }
    }

    // Clear the UI state
    onChange("");
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-3">
      {/* Image Preview / Upload Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          "relative rounded-lg overflow-hidden bg-stone-50 dark:bg-stone-900 ring-1 ring-stone-200 dark:ring-stone-800 transition-all",
          aspectClasses[aspectRatio],
          isDragging &&
            "ring-2 ring-amber-500 dark:ring-amber-500 bg-amber-50 dark:bg-amber-950",
          disabled && "opacity-60 cursor-not-allowed"
        )}
      >
        {value ? (
          // Image Preview
          <>
            <div className="relative w-full h-full">
              <Image
                src={value}
                alt="Preview"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 500px"
                unoptimized
              />
            </div>
            {!disabled && (
              <div className="absolute top-2 right-2 flex gap-2">
                <Button
                  type="button"
                  size="sm"
                  variant="destructive"
                  onClick={handleRemove}
                  disabled={isDeleting}
                  className="h-8 w-8 p-0"
                >
                  {isDeleting ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <X className="h-4 w-4" />
                  )}
                </Button>
              </div>
            )}
          </>
        ) : (
          // Upload Zone
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
            {isUploading ? (
              <>
                <Loader2 className="h-10 w-10 text-amber-500 dark:text-amber-400 animate-spin mb-3" />
                <p className="text-sm font-medium text-stone-700 dark:text-stone-300">
                  Uploading...
                </p>
                <Progress value={uploadProgress} className="w-48 mt-2" />
              </>
            ) : (
              <>
                <Upload className="h-10 w-10 text-stone-400 dark:text-stone-500 mb-3" />
                <p className="text-sm font-medium text-stone-700 dark:text-stone-300 mb-1">
                  Drop image here or click to browse
                </p>
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  PNG, JPEG, WebP, GIF (max {maxSizeMB}MB)
                </p>
              </>
            )}
          </div>
        )}

        {/* Click to upload overlay */}
        {!value && !disabled && !isUploading && (
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/jpg,image/webp,image/gif"
            onChange={handleFileSelect}
            disabled={disabled || isUploading}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/50 px-3 py-2 rounded-md border border-red-200 dark:border-red-900">
          {error}
        </div>
      )}

      {/* URL Input Option */}
      {allowUrl && (
        <div className="space-y-2">
          {showUrlInput ? (
            <div className="flex gap-2">
              <input
                type="url"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="flex-1 px-3 py-2 text-sm border border-stone-200 dark:border-stone-800 rounded-md bg-white dark:bg-stone-950 text-stone-900 dark:text-stone-100"
                disabled={disabled}
              />
              <Button
                type="button"
                size="sm"
                onClick={handleUrlSubmit}
                disabled={!urlInput.trim() || disabled}
                className="bg-amber-600 hover:bg-amber-700 text-white"
              >
                Apply
              </Button>
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() => {
                  setShowUrlInput(false);
                  setUrlInput("");
                }}
                className="border-stone-200 dark:border-stone-800"
              >
                Cancel
              </Button>
            </div>
          ) : (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setShowUrlInput(true)}
              disabled={disabled || isUploading}
              className="w-full border-stone-200 dark:border-stone-800"
            >
              <ImageIcon className="h-4 w-4 mr-2" />
              Or use image URL
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
