"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/types/supabase";

type JobVacancy = Database["public"]["Tables"]["job_vacancies"]["Row"];
type JobVacancyInsert = Database["public"]["Tables"]["job_vacancies"]["Insert"];
type JobVacancyUpdate = Database["public"]["Tables"]["job_vacancies"]["Update"];

// ============================================
// JOB VACANCIES
// ============================================

export async function getAllJobVacancies(): Promise<JobVacancy[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("job_vacancies")
    .select("*")
    .order("deadline", { ascending: false });

  if (error) {
    console.error("Error fetching job vacancies:", error);
    return [];
  }
  return data || [];
}

export async function getActiveJobVacancies(): Promise<JobVacancy[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("job_vacancies")
    .select("*")
    .eq("is_active", true)
    .gte("deadline", new Date().toISOString())
    .order("deadline", { ascending: true });

  if (error) {
    console.error("Error fetching active job vacancies:", error);
    return [];
  }
  return data || [];
}

export async function createJobVacancy(
  item: Omit<JobVacancyInsert, "id" | "created_at" | "updated_at">
): Promise<{ success: boolean; error?: string; data?: JobVacancy }> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("job_vacancies")
    .insert(item)
    .select()
    .single();

  if (error) {
    console.error("Error creating job vacancy:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/content/opportunities/jobs");
  return { success: true, data };
}

export async function updateJobVacancy(
  id: string,
  updates: JobVacancyUpdate
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient();
  const { error } = await supabase
    .from("job_vacancies")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", id);

  if (error) {
    console.error("Error updating job vacancy:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/content/opportunities/jobs");
  return { success: true };
}

export async function deleteJobVacancy(id: string): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient();
  const { error } = await supabase.from("job_vacancies").delete().eq("id", id);

  if (error) {
    console.error("Error deleting job vacancy:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/content/opportunities/jobs");
  return { success: true };
}
