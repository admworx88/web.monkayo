"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { uploadToStorage, deleteFromStorage, extractStoragePath } from "@/lib/supabase/storage";
import type { BrandingSettings, BrandingColors, BrandingLogos, DEFAULT_BRANDING } from "@/types/branding";
import { DEFAULT_BRANDING as defaultBranding } from "@/types/branding";

/**
 * Fetch branding settings from database
 * Falls back to default branding if not found
 */
export async function getBrandingSettings(): Promise<BrandingSettings> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("site_settings")
    .select("value")
    .eq("key", "branding")
    .single();

  if (error || !data) {
    console.log("Using default branding settings");
    return defaultBranding;
  }

  // Parse JSONB value
  const settings = data.value as unknown as BrandingSettings;

  // Merge with defaults to ensure all fields exist
  return {
    colors: {
      ...defaultBranding.colors,
      ...settings.colors,
    },
    logos: {
      ...defaultBranding.logos,
      ...settings.logos,
    },
  };
}

/**
 * Update branding colors
 */
export async function updateBrandingColors(
  colors: BrandingColors
): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = await createClient();

    // Get current branding settings
    const currentBranding = await getBrandingSettings();

    // Update with new colors
    const updatedBranding: BrandingSettings = {
      ...currentBranding,
      colors,
    };

    // Save to database
    const { error } = await supabase
      .from("site_settings")
      .upsert({
        key: "branding",
        value: updatedBranding as any,
        updated_at: new Date().toISOString(),
      }, {
        onConflict: 'key'
      });

    if (error) {
      console.error("Error updating branding colors:", error);
      return { success: false, error: error.message };
    }

    // Revalidate the entire site to apply color changes
    revalidatePath("/", "layout");

    return { success: true };
  } catch (error) {
    console.error("Error updating branding colors:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to update colors",
    };
  }
}

/**
 * Update branding logos (URLs only, not upload)
 */
export async function updateBrandingLogos(
  logos: Partial<BrandingLogos>
): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = await createClient();

    // Get current branding settings
    const currentBranding = await getBrandingSettings();

    // Update with new logos
    const updatedBranding: BrandingSettings = {
      ...currentBranding,
      logos: {
        ...currentBranding.logos,
        ...logos,
      },
    };

    // Save to database
    const { error } = await supabase
      .from("site_settings")
      .upsert({
        key: "branding",
        value: updatedBranding as any,
        updated_at: new Date().toISOString(),
      }, {
        onConflict: 'key'
      });

    if (error) {
      console.error("Error updating branding logos:", error);
      return { success: false, error: error.message };
    }

    // Revalidate the entire site to apply logo changes
    revalidatePath("/", "layout");

    return { success: true };
  } catch (error) {
    console.error("Error updating branding logos:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to update logos",
    };
  }
}

/**
 * Upload branding logo to storage
 * @param logoType - 'header' | 'footer' | 'favicon'
 */
export async function uploadBrandingLogo(
  formData: FormData,
  logoType: keyof BrandingLogos
): Promise<{ success: boolean; publicUrl?: string; error?: string }> {
  try {
    const file = formData.get('file') as File;

    if (!file) {
      return { success: false, error: 'No file provided' };
    }

    // Upload to logos bucket in branding folder
    const result = await uploadToStorage(file, 'logos', `branding/${logoType}`);

    if (!result.success) {
      return { success: false, error: result.error };
    }

    // Update the logo in settings
    const updateResult = await updateBrandingLogos({
      [logoType]: result.publicUrl,
    });

    if (!updateResult.success) {
      return { success: false, error: updateResult.error };
    }

    return {
      success: true,
      publicUrl: result.publicUrl,
    };
  } catch (error) {
    console.error(`Error uploading ${logoType} logo:`, error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Upload failed',
    };
  }
}

/**
 * Delete branding logo from storage
 * @param logoType - 'header' | 'footer' | 'favicon'
 */
export async function deleteBrandingLogo(
  logoUrl: string,
  logoType: keyof BrandingLogos
): Promise<{ success: boolean; error?: string }> {
  try {
    // Extract path from URL
    const path = await extractStoragePath(logoUrl);

    if (path) {
      // Delete from storage
      const result = await deleteFromStorage('logos', path);

      if (!result.success) {
        return result;
      }
    }

    // Clear the logo from settings
    const updateResult = await updateBrandingLogos({
      [logoType]: null,
    });

    return updateResult;
  } catch (error) {
    console.error(`Error deleting ${logoType} logo:`, error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Delete failed',
    };
  }
}
