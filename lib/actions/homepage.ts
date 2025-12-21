"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { uploadToStorage, deleteFromStorage, extractStoragePath } from "@/lib/supabase/storage";
import type { Database } from "@/types/supabase";

type HeroSlide = Database["public"]["Tables"]["hero_slides"]["Row"];
type HeroSlideInsert = Database["public"]["Tables"]["hero_slides"]["Insert"];
type HeroSlideUpdate = Database["public"]["Tables"]["hero_slides"]["Update"];

type FAQ = Database["public"]["Tables"]["faqs"]["Row"];
type FAQInsert = Database["public"]["Tables"]["faqs"]["Insert"];
type FAQUpdate = Database["public"]["Tables"]["faqs"]["Update"];

type HomepageNews = Database["public"]["Tables"]["homepage_news"]["Row"];
type HomepageNewsInsert = Database["public"]["Tables"]["homepage_news"]["Insert"];
type HomepageNewsUpdate = Database["public"]["Tables"]["homepage_news"]["Update"];

type LogoSection = Database["public"]["Tables"]["logo_section"]["Row"];
type LogoSectionInsert = Database["public"]["Tables"]["logo_section"]["Insert"];
type LogoSectionUpdate = Database["public"]["Tables"]["logo_section"]["Update"];

type VisionMission = Database["public"]["Tables"]["vision_mission"]["Row"];
type VisionMissionUpdate = Database["public"]["Tables"]["vision_mission"]["Update"];

// ============================================
// HERO SLIDES
// ============================================

/**
 * Fetch active hero slides ordered by sort_order
 */
export async function getHeroSlides() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("hero_slides")
    .select("*")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("Error fetching hero slides:", error);
    return [];
  }

  return data || [];
}

/**
 * Fetch all hero slides (including inactive) for admin
 */
export async function getAllHeroSlides(): Promise<HeroSlide[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("hero_slides")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("Error fetching all hero slides:", error);
    return [];
  }

  return data || [];
}

/**
 * Create a new hero slide
 */
export async function createHeroSlide(
  slide: Omit<HeroSlideInsert, "id" | "created_at" | "updated_at">
): Promise<{ success: boolean; error?: string; data?: HeroSlide }> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("hero_slides")
    .insert(slide)
    .select()
    .single();

  if (error) {
    console.error("Error creating hero slide:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/content/homepage/hero");
  revalidatePath("/");
  return { success: true, data };
}

/**
 * Update a hero slide
 */
export async function updateHeroSlide(
  id: string,
  updates: HeroSlideUpdate
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient();

  const { error } = await supabase
    .from("hero_slides")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", id);

  if (error) {
    console.error("Error updating hero slide:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/content/homepage/hero");
  revalidatePath("/");
  return { success: true };
}

/**
 * Upload hero slide image to storage
 */
export async function uploadHeroSlideImage(
  formData: FormData
): Promise<{ success: boolean; publicUrl?: string; error?: string }> {
  try {
    const file = formData.get('file') as File;

    if (!file) {
      return { success: false, error: 'No file provided' };
    }

    // Upload to hero-slides bucket in slides folder
    const result = await uploadToStorage(file, 'hero-slides', 'slides');

    if (!result.success) {
      return { success: false, error: result.error };
    }

    return {
      success: true,
      publicUrl: result.publicUrl,
    };
  } catch (error) {
    console.error('Error uploading hero slide image:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Upload failed',
    };
  }
}

/**
 * Delete hero slide image from storage
 */
export async function deleteHeroSlideImage(
  imageUrl: string
): Promise<{ success: boolean; error?: string }> {
  try {
    // Extract path from URL
    const path = await extractStoragePath(imageUrl);

    if (!path) {
      // If it's not a storage URL, just return success (external URL)
      return { success: true };
    }

    // Delete from storage
    const result = await deleteFromStorage('hero-slides', path);

    return result;
  } catch (error) {
    console.error('Error deleting hero slide image:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Delete failed',
    };
  }
}

/**
 * Delete a hero slide
 */
export async function deleteHeroSlide(
  id: string
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient();

  // Get the slide to extract image URL for cleanup
  const { data: slide } = await supabase
    .from("hero_slides")
    .select("image_url")
    .eq("id", id)
    .single();

  // Delete the database record
  const { error } = await supabase.from("hero_slides").delete().eq("id", id);

  if (error) {
    console.error("Error deleting hero slide:", error);
    return { success: false, error: error.message };
  }

  // Clean up storage file if it exists
  if (slide?.image_url) {
    await deleteHeroSlideImage(slide.image_url);
    // Don't fail the deletion if storage cleanup fails
  }

  revalidatePath("/content/homepage/hero");
  revalidatePath("/");
  return { success: true };
}

// ============================================
// VISION & MISSION
// ============================================

/**
 * Fetch vision and mission content (single row)
 */
export async function getVisionMission(): Promise<VisionMission | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("vision_mission")
    .select("*")
    .limit(1)
    .single();

  if (error) {
    console.error("Error fetching vision/mission:", error);
    return null;
  }

  return data;
}

/**
 * Update vision and mission content
 */
export async function updateVisionMission(
  updates: VisionMissionUpdate
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient();

  // Get existing record first
  const { data: existing } = await supabase
    .from("vision_mission")
    .select("id")
    .limit(1)
    .single();

  if (existing) {
    const { error } = await supabase
      .from("vision_mission")
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq("id", existing.id);

    if (error) {
      console.error("Error updating vision/mission:", error);
      return { success: false, error: error.message };
    }
  } else {
    // Create if doesn't exist
    const { error } = await supabase.from("vision_mission").insert(updates as Database["public"]["Tables"]["vision_mission"]["Insert"]);

    if (error) {
      console.error("Error creating vision/mission:", error);
      return { success: false, error: error.message };
    }
  }

  revalidatePath("/content/homepage/vision-mission");
  revalidatePath("/");
  return { success: true };
}

// ============================================
// HOMEPAGE NEWS (Facebook Embeds)
// ============================================

/**
 * Fetch active homepage news (Facebook embeds) ordered by sort_order, limited to 5
 */
export async function getHomepageNews(): Promise<HomepageNews[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("homepage_news")
    .select("*")
    .eq("is_active", true)
    .order("sort_order", { ascending: true })
    .limit(5);

  if (error) {
    console.error("Error fetching homepage news:", error);
    return [];
  }

  return data || [];
}

/**
 * Fetch all homepage news for admin
 */
export async function getAllHomepageNews(): Promise<HomepageNews[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("homepage_news")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("Error fetching all homepage news:", error);
    return [];
  }

  return data || [];
}

/**
 * Create homepage news item
 */
export async function createHomepageNews(
  news: Omit<HomepageNewsInsert, "id" | "created_at" | "updated_at">
): Promise<{ success: boolean; error?: string; data?: HomepageNews }> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("homepage_news")
    .insert(news)
    .select()
    .single();

  if (error) {
    console.error("Error creating homepage news:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/content/homepage/news-feed");
  revalidatePath("/");
  return { success: true, data };
}

/**
 * Update homepage news item
 */
export async function updateHomepageNews(
  id: string,
  updates: HomepageNewsUpdate
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient();

  const { error } = await supabase
    .from("homepage_news")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", id);

  if (error) {
    console.error("Error updating homepage news:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/content/homepage/news-feed");
  revalidatePath("/");
  return { success: true };
}

/**
 * Delete homepage news item
 */
export async function deleteHomepageNews(
  id: string
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient();

  const { error } = await supabase.from("homepage_news").delete().eq("id", id);

  if (error) {
    console.error("Error deleting homepage news:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/content/homepage/news-feed");
  revalidatePath("/");
  return { success: true };
}

// ============================================
// FAQs
// ============================================

/**
 * Fetch active FAQs ordered by sort_order
 */
export async function getFAQs(): Promise<FAQ[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("faqs")
    .select("*")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("Error fetching FAQs:", error);
    return [];
  }

  return data || [];
}

/**
 * Fetch all FAQs for admin
 */
export async function getAllFAQs(): Promise<FAQ[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("faqs")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("Error fetching all FAQs:", error);
    return [];
  }

  return data || [];
}

/**
 * Create FAQ
 */
export async function createFAQ(
  faq: Omit<FAQInsert, "id" | "created_at" | "updated_at">
): Promise<{ success: boolean; error?: string; data?: FAQ }> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("faqs")
    .insert(faq)
    .select()
    .single();

  if (error) {
    console.error("Error creating FAQ:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/content/homepage/faqs");
  revalidatePath("/");
  return { success: true, data };
}

/**
 * Update FAQ
 */
export async function updateFAQ(
  id: string,
  updates: FAQUpdate
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient();

  const { error } = await supabase
    .from("faqs")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", id);

  if (error) {
    console.error("Error updating FAQ:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/content/homepage/faqs");
  revalidatePath("/");
  return { success: true };
}

/**
 * Delete FAQ
 */
export async function deleteFAQ(
  id: string
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient();

  const { error } = await supabase.from("faqs").delete().eq("id", id);

  if (error) {
    console.error("Error deleting FAQ:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/content/homepage/faqs");
  revalidatePath("/");
  return { success: true };
}

// ============================================
// PARTNER LOGOS
// ============================================

/**
 * Fetch active partner logos ordered by sort_order
 */
export async function getPartnerLogos(): Promise<LogoSection[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("logo_section")
    .select("*")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("Error fetching partner logos:", error);
    return [];
  }

  return data || [];
}

/**
 * Fetch all partner logos for admin
 */
export async function getAllPartnerLogos(): Promise<LogoSection[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("logo_section")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("Error fetching all partner logos:", error);
    return [];
  }

  return data || [];
}

/**
 * Upload partner logo image to storage
 */
export async function uploadPartnerLogoImage(
  formData: FormData
): Promise<{ success: boolean; publicUrl?: string; error?: string }> {
  try {
    const file = formData.get('file') as File;

    if (!file) {
      return { success: false, error: 'No file provided' };
    }

    // Upload to logos bucket in partner-logos folder
    const result = await uploadToStorage(file, 'logos', 'partner-logos');

    if (!result.success) {
      return { success: false, error: result.error };
    }

    return {
      success: true,
      publicUrl: result.publicUrl,
    };
  } catch (error) {
    console.error('Error uploading partner logo image:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to upload image',
    };
  }
}

/**
 * Delete partner logo image from storage
 */
export async function deletePartnerLogoImage(
  imageUrl: string
): Promise<{ success: boolean; error?: string }> {
  try {
    // Extract path from URL
    const path = await extractStoragePath(imageUrl);

    if (!path) {
      // If it's not a storage URL, just return success (external URL)
      return { success: true };
    }

    // Delete from storage
    const result = await deleteFromStorage('logos', path);

    return result;
  } catch (error) {
    console.error('Error deleting partner logo image:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Delete failed',
    };
  }
}

/**
 * Create partner logo
 */
export async function createPartnerLogo(
  logo: Omit<LogoSectionInsert, "id" | "created_at" | "updated_at">
): Promise<{ success: boolean; error?: string; data?: LogoSection }> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("logo_section")
    .insert(logo)
    .select()
    .single();

  if (error) {
    console.error("Error creating partner logo:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/content/homepage/logos");
  revalidatePath("/");
  return { success: true, data };
}

/**
 * Update partner logo
 */
export async function updatePartnerLogo(
  id: string,
  updates: LogoSectionUpdate
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient();

  const { error } = await supabase
    .from("logo_section")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", id);

  if (error) {
    console.error("Error updating partner logo:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/content/homepage/logos");
  revalidatePath("/");
  return { success: true };
}

/**
 * Delete partner logo
 */
export async function deletePartnerLogo(
  id: string
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient();

  const { error } = await supabase.from("logo_section").delete().eq("id", id);

  if (error) {
    console.error("Error deleting partner logo:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/content/homepage/logos");
  revalidatePath("/");
  return { success: true };
}
