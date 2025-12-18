"use server";

import { createClient } from "@/lib/supabase/server";

export interface CurrentUser {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  avatar_url: string | null;
  role: "client" | "staff" | "admin";
  is_active: boolean;
}

export interface DashboardStats {
  totalNews: number;
  totalDocuments: number;
  totalOfficials: number;
  totalDepartments: number;
  totalBarangays: number;
  totalUsers: number;
  recentActivity: ActivityItem[];
}

export interface ActivityItem {
  id: string;
  action: string;
  table_name: string;
  user_email: string | null;
  created_at: string | null;
}

/**
 * Get current authenticated user with role
 */
export async function getCurrentUser(): Promise<CurrentUser | null> {
  const supabase = await createClient();

  // Get auth user
  const {
    data: { user: authUser },
  } = await supabase.auth.getUser();

  if (!authUser) {
    return null;
  }

  // Get user profile with role
  const { data: profile, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", authUser.id)
    .single();

  if (error || !profile) {
    console.error("Error fetching user profile:", error);
    return null;
  }

  return {
    id: profile.id,
    email: profile.email,
    first_name: profile.first_name,
    last_name: profile.last_name,
    avatar_url: profile.avatar_url,
    role: profile.role as "client" | "staff" | "admin",
    is_active: profile.is_active ?? false,
  };
}

/**
 * Check if current user has admin role
 */
export async function isAdmin(): Promise<boolean> {
  const user = await getCurrentUser();
  return user?.role === "admin";
}

/**
 * Check if current user can access CMS (admin or staff)
 */
export async function canAccessCMS(): Promise<boolean> {
  const user = await getCurrentUser();
  return user?.role === "admin" || user?.role === "staff";
}

/**
 * Get dashboard statistics
 */
export async function getDashboardStats(): Promise<DashboardStats> {
  const supabase = await createClient();

  // Fetch counts in parallel
  const [
    newsResult,
    documentsResult,
    officialsResult,
    departmentsResult,
    barangaysResult,
    usersResult,
    activityResult,
  ] = await Promise.all([
    supabase.from("news").select("id", { count: "exact", head: true }),
    supabase.from("documents").select("id", { count: "exact", head: true }),
    supabase
      .from("elected_officials")
      .select("id", { count: "exact", head: true }),
    supabase.from("departments").select("id", { count: "exact", head: true }),
    supabase.from("barangays").select("id", { count: "exact", head: true }),
    supabase.from("users").select("id", { count: "exact", head: true }),
    supabase
      .from("audit_logs")
      .select("id, action, table_name, user_email, created_at")
      .order("created_at", { ascending: false })
      .limit(10),
  ]);

  return {
    totalNews: newsResult.count ?? 0,
    totalDocuments: documentsResult.count ?? 0,
    totalOfficials: officialsResult.count ?? 0,
    totalDepartments: departmentsResult.count ?? 0,
    totalBarangays: barangaysResult.count ?? 0,
    totalUsers: usersResult.count ?? 0,
    recentActivity: (activityResult.data || []).map((item) => ({
      id: item.id,
      action: item.action,
      table_name: item.table_name,
      user_email: item.user_email,
      created_at: item.created_at,
    })),
  };
}

/**
 * Get content counts for quick stats
 */
export async function getContentCounts() {
  const supabase = await createClient();

  const [
    heroSlides,
    faqs,
    homepageNews,
    pressReleases,
    advisories,
    executiveOrders,
    memorandumOrders,
    ordinances,
    otherForms,
  ] = await Promise.all([
    supabase
      .from("hero_slides")
      .select("id", { count: "exact", head: true })
      .eq("is_active", true),
    supabase
      .from("faqs")
      .select("id", { count: "exact", head: true })
      .eq("is_active", true),
    supabase
      .from("homepage_news")
      .select("id", { count: "exact", head: true })
      .eq("is_active", true),
    supabase
      .from("news")
      .select("id", { count: "exact", head: true })
      .eq("category", "press_release"),
    supabase
      .from("news")
      .select("id", { count: "exact", head: true })
      .eq("category", "advisory_announcement"),
    supabase
      .from("documents")
      .select("id", { count: "exact", head: true })
      .eq("category", "executive_order"),
    supabase
      .from("documents")
      .select("id", { count: "exact", head: true })
      .eq("category", "memorandum_order"),
    supabase
      .from("documents")
      .select("id", { count: "exact", head: true })
      .eq("category", "municipal_ordinance"),
    supabase
      .from("documents")
      .select("id", { count: "exact", head: true })
      .eq("category", "other_form"),
  ]);

  return {
    homepage: {
      heroSlides: heroSlides.count ?? 0,
      faqs: faqs.count ?? 0,
      newsFeed: homepageNews.count ?? 0,
    },
    news: {
      pressReleases: pressReleases.count ?? 0,
      advisories: advisories.count ?? 0,
    },
    documents: {
      executiveOrders: executiveOrders.count ?? 0,
      memorandumOrders: memorandumOrders.count ?? 0,
      ordinances: ordinances.count ?? 0,
      otherForms: otherForms.count ?? 0,
    },
  };
}
