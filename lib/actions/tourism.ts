"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/types/supabase";

type Tourism = Database["public"]["Tables"]["tourism"]["Row"];
type TourismInsert = Database["public"]["Tables"]["tourism"]["Insert"];
type TourismUpdate = Database["public"]["Tables"]["tourism"]["Update"];

// ============================================
// PLACES TO VISIT
// ============================================

export async function getAllPlaces(): Promise<Tourism[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("tourism")
    .select("*")
    .eq("category", "places_to_visit")
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("Error fetching places:", error);
    return [];
  }
  return data || [];
}

export async function createPlace(
  item: Omit<TourismInsert, "id" | "created_at" | "updated_at" | "category">
): Promise<{ success: boolean; error?: string; data?: Tourism }> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("tourism")
    .insert({ ...item, category: "places_to_visit" })
    .select()
    .single();

  if (error) {
    console.error("Error creating place:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/content/tourism/places");
  return { success: true, data };
}

export async function updatePlace(
  id: string,
  updates: Omit<TourismUpdate, "category">
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient();
  const { error } = await supabase
    .from("tourism")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", id);

  if (error) {
    console.error("Error updating place:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/content/tourism/places");
  return { success: true };
}

export async function deletePlace(id: string): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient();
  const { error } = await supabase.from("tourism").delete().eq("id", id);

  if (error) {
    console.error("Error deleting place:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/content/tourism/places");
  return { success: true };
}

// ============================================
// EVENTS & FESTIVALS
// ============================================

export async function getAllEvents(): Promise<Tourism[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("tourism")
    .select("*")
    .eq("category", "festivals_events")
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("Error fetching events:", error);
    return [];
  }
  return data || [];
}

export async function createEvent(
  item: Omit<TourismInsert, "id" | "created_at" | "updated_at" | "category">
): Promise<{ success: boolean; error?: string; data?: Tourism }> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("tourism")
    .insert({ ...item, category: "festivals_events" })
    .select()
    .single();

  if (error) {
    console.error("Error creating event:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/content/tourism/events");
  return { success: true, data };
}

export async function updateEvent(
  id: string,
  updates: Omit<TourismUpdate, "category">
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient();
  const { error } = await supabase
    .from("tourism")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", id);

  if (error) {
    console.error("Error updating event:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/content/tourism/events");
  return { success: true };
}

export async function deleteEvent(id: string): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient();
  const { error } = await supabase.from("tourism").delete().eq("id", id);

  if (error) {
    console.error("Error deleting event:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/content/tourism/events");
  return { success: true };
}
