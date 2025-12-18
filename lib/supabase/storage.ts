"use server";

import { createClient } from "@/lib/supabase/server";

/**
 * Upload result type
 */
export interface UploadResult {
  success: boolean;
  publicUrl?: string;
  path?: string;
  error?: string;
}

/**
 * Validation result type
 */
export interface ValidationResult {
  valid: boolean;
  error?: string;
}

/**
 * Allowed image MIME types
 */
const ALLOWED_IMAGE_TYPES = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
  "image/gif",
] as const;

/**
 * Allowed logo MIME types (includes SVG)
 */
const ALLOWED_LOGO_TYPES = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
  "image/svg+xml",
] as const;

/**
 * Maximum file sizes (in bytes)
 */
const MAX_FILE_SIZE = {
  "hero-slides": 10 * 1024 * 1024, // 10MB
  logos: 5 * 1024 * 1024, // 5MB
} as const;

/**
 * Validate file before upload
 */
export async function validateImageFile(
  file: File,
  bucket: "hero-slides" | "logos"
): Promise<ValidationResult> {
  // Check file size
  const maxSize = MAX_FILE_SIZE[bucket];
  if (file.size > maxSize) {
    const maxMB = maxSize / (1024 * 1024);
    return {
      valid: false,
      error: `File size exceeds ${maxMB}MB limit`,
    };
  }

  // Check MIME type
  const allowedTypes =
    bucket === "logos" ? ALLOWED_LOGO_TYPES : ALLOWED_IMAGE_TYPES;
  if (!allowedTypes.includes(file.type as any)) {
    return {
      valid: false,
      error: `Invalid file type. Allowed: ${allowedTypes.join(", ")}`,
    };
  }

  return { valid: true };
}

/**
 * Generate unique filename to prevent collisions
 */
function generateUniqueFilename(originalFilename: string): string {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 15);
  const extension = originalFilename.split(".").pop();
  const nameWithoutExt = originalFilename.replace(/\.[^/.]+$/, "");
  const sanitizedName = nameWithoutExt
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "-")
    .substring(0, 50); // Limit length

  return `${sanitizedName}-${timestamp}-${randomString}.${extension}`;
}

/**
 * Upload file to Supabase Storage bucket
 */
export async function uploadToStorage(
  file: File,
  bucket: "hero-slides" | "logos",
  folder?: string
): Promise<UploadResult> {
  const supabase = await createClient();

  // Debug: Check current user
  const { data: { user } } = await supabase.auth.getUser();
  console.log("Upload attempt by user:", user?.id, user?.email);

  // Validate file
  const validation = await validateImageFile(file, bucket);
  if (!validation.valid) {
    return { success: false, error: validation.error };
  }

  // Generate unique filename
  const filename = generateUniqueFilename(file.name);
  const path = folder ? `${folder}/${filename}` : filename;

  try {
    // Convert File to ArrayBuffer (Next.js compatible)
    const arrayBuffer = await file.arrayBuffer();
    const fileBuffer = new Uint8Array(arrayBuffer);

    // Upload to storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(path, fileBuffer, {
        contentType: file.type,
        cacheControl: "3600",
        upsert: false, // Don't overwrite existing files
      });

    if (uploadError) {
      console.error("Storage upload error:", uploadError);
      return { success: false, error: uploadError.message };
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(uploadData.path);

    return {
      success: true,
      publicUrl: urlData.publicUrl,
      path: uploadData.path,
    };
  } catch (error) {
    console.error("Upload error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Upload failed",
    };
  }
}

/**
 * Delete file from storage bucket
 */
export async function deleteFromStorage(
  bucket: "hero-slides" | "logos",
  path: string
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient();

  try {
    const { error } = await supabase.storage.from(bucket).remove([path]);

    if (error) {
      console.error("Storage delete error:", error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error("Delete error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Delete failed",
    };
  }
}

/**
 * Extract storage path from public URL
 */
export async function extractStoragePath(
  publicUrl: string
): Promise<string | null> {
  try {
    const url = new URL(publicUrl);
    const pathMatch = url.pathname.match(
      /\/storage\/v1\/object\/public\/[^/]+\/(.+)/
    );
    return pathMatch ? pathMatch[1] : null;
  } catch {
    return null;
  }
}
