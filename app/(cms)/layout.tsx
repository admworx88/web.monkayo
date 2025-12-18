import { redirect } from "next/navigation";
import { AppSidebar } from "@/app/(cms)/dashboard/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { getAdminSidebar } from "@/lib/actions/menus";
import { getCurrentUser } from "@/lib/actions/admin";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Fetch user and menu data in parallel
  const [user, menuItems] = await Promise.all([
    getCurrentUser(),
    getAdminSidebar(),
  ]);

  // Redirect to login if not authenticated
  if (!user) {
    redirect("/signin");
  }

  // Check if user can access CMS (admin or staff only)
  if (user.role === "client") {
    redirect("/");
  }

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "17rem",
          "--header-height": "3.5rem",
        } as React.CSSProperties
      }
    >
      <AppSidebar menuItems={menuItems} user={user} />
      <SidebarInset className="bg-stone-50/50 dark:bg-stone-950">
        <div className="flex flex-1 flex-col">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
