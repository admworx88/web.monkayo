"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  ChevronRight,
  LayoutDashboard,
  Home,
  Image as ImageIcon,
  Target,
  Rss,
  HelpCircle,
  Award,
  Info,
  BookOpen,
  Network,
  Users,
  UsersRound,
  Building2,
  MapPin,
  Newspaper,
  Megaphone,
  AlertCircle,
  Plane,
  Map,
  CalendarDays,
  FileText,
  FileCheck,
  FileSpreadsheet,
  Gavel,
  Files,
  Briefcase,
  Laptop,
  Eye,
  ClipboardList,
  UserSearch,
  Images,
  Settings,
  History,
  UserCog,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarGroup,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { NavUser } from "./nav-user";
import type { AdminMenuItem } from "@/lib/actions/menus";

// Icon mapping from database icon names to Lucide components
const iconMap: Record<string, LucideIcon> = {
  "layout-dashboard": LayoutDashboard,
  home: Home,
  photo: ImageIcon,
  target: Target,
  rss: Rss,
  "help-circle": HelpCircle,
  award: Award,
  info: Info,
  book: BookOpen,
  sitemap: Network,
  users: Users,
  "users-group": UsersRound,
  "address-book": Users,
  building: Building2,
  "map-pin": MapPin,
  newspaper: Newspaper,
  megaphone: Megaphone,
  "alert-circle": AlertCircle,
  plane: Plane,
  map: Map,
  "calendar-event": CalendarDays,
  "file-text": FileText,
  "file-certificate": FileCheck,
  "file-description": FileSpreadsheet,
  gavel: Gavel,
  forms: Files,
  briefcase: Briefcase,
  "briefcase-2": Briefcase,
  "device-laptop": Laptop,
  eye: Eye,
  "clipboard-list": ClipboardList,
  "user-search": UserSearch,
  "photo-library": Images,
  "users-cog": UserCog,
  settings: Settings,
  history: History,
};

function getIcon(iconName: string | null): LucideIcon {
  if (!iconName) return FileText;
  return iconMap[iconName] || FileText;
}

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  menuItems: AdminMenuItem[];
  user: {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    avatar_url: string | null;
    role: "client" | "staff" | "admin";
  } | null;
}

export function AppSidebar({ menuItems, user, ...props }: AppSidebarProps) {
  const pathname = usePathname();

  // Separate items by type
  const dashboardItem = menuItems.find((item) => item.url === "/dashboard");

  // Get content items (dropdowns with children)
  const contentItems = menuItems.filter(
    (item) =>
      item.item_type === "dropdown" &&
      item.title !== "Dashboard" &&
      (item.children?.length ?? 0) > 0
  );

  // Get system items (direct links)
  const systemItems = menuItems.filter(
    (item) =>
      item.item_type === "link" &&
      item.url &&
      ["/media", "/users", "/settings", "/audit"].some((path) =>
        item.url?.includes(path)
      )
  );

  // Filter system items based on role
  const filteredSystemItems = systemItems.filter((item) => {
    if (
      item.url?.includes("/users") ||
      item.url?.includes("/settings") ||
      item.url?.includes("/audit")
    ) {
      return user?.role === "admin";
    }
    return true;
  });

  return (
    <Sidebar collapsible="icon" className=" bg-white" {...props}>
      <TooltipProvider delayDuration={0}>
        {/* Header with LGU Monkayo Branding */}
        <SidebarHeader className="border-b border-stone-100/20 px-4 py-4 group-data-[collapsible=icon]:px-2">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 group group-data-[collapsible=icon]:justify-center"
          >
            {/* Municipal Seal */}
            <div className="relative shrink-0">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-amber-600 to-amber-700 shadow-sm ring-1 ring-stone-200/50 transition-shadow group-hover:shadow-md">
                <span className="text-amber-100 font-bold text-base">M</span>
              </div>
            </div>
            <div className="flex flex-col group-data-[collapsible=icon]:hidden">
              <h1 className="font-semibold text-[15px] text-stone-900 dark:text-slate-200 tracking-tight leading-tight">
                LGU Monkayo
              </h1>
              <p className="text-[11px] text-stone-500 font-medium">
                Content Management
              </p>
            </div>
          </Link>
        </SidebarHeader>

        <SidebarContent className="px-3 py-4 group-data-[collapsible=icon]:px-1">
          {/* Dashboard Link */}
          {dashboardItem && (
            <SidebarGroup className="pb-2 group-data-[collapsible=icon]:p-0">
              <SidebarMenu>
                <SidebarMenuItem>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <SidebarMenuButton
                        asChild
                        isActive={pathname === "/dashboard"}
                        className={cn(
                          "h-10 rounded-lg font-medium transition-all duration-200",
                          "dark:text-stone-200 text-stone-800 hover:text-stone-900 hover:bg-stone-100",
                          pathname === "/dashboard" &&
                            "bg-amber-600 text-white hover:bg-amber-600 hover:text-white shadow-sm"
                        )}
                      >
                        <Link href="/dashboard">
                          <LayoutDashboard className="h-[18px] w-[18px]" />
                          <span>Dashboard</span>
                        </Link>
                      </SidebarMenuButton>
                    </TooltipTrigger>
                    <TooltipContent
                      side="right"
                      className="group-data-[collapsible=icon]:block hidden"
                    >
                      <p>Dashboard</p>
                    </TooltipContent>
                  </Tooltip>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>
          )}

          {/* Content Management Section */}
          <SidebarGroup className="pt-2 group-data-[collapsible=icon]:p-0">
            <SidebarGroupLabel className="text-[10px] font-semibold uppercase tracking-widest text-stone-400 px-5 mb-1 group-data-[collapsible=icon]:hidden">
              Content
            </SidebarGroupLabel>
            <SidebarMenu>
              {contentItems.map((item) => {
                const Icon = getIcon(item.icon);
                const isActive = item.children?.some(
                  (child) => child.url && pathname.startsWith(child.url)
                );

                return (
                  <Collapsible
                    key={item.id}
                    asChild
                    defaultOpen={isActive}
                    className="group/collapsible"
                  >
                    <SidebarMenuItem>
                      <Tooltip>
                        <CollapsibleTrigger asChild>
                          <TooltipTrigger asChild>
                            <SidebarMenuButton
                              className={cn(
                                "h-10 rounded-lg font-medium transition-all duration-200",
                                "dark:text-stone-200 text-stone-800 hover:text-stone-900 hover:bg-stone-100",
                                isActive && "bg-stone-100 text-stone-900"
                              )}
                            >
                              <Icon className="h-[18px] w-[18px]" />
                              <span>{item.title}</span>
                              <ChevronRight className="ml-auto h-4 w-4 text-stone-400 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90 group-data-[collapsible=icon]:hidden" />
                            </SidebarMenuButton>
                          </TooltipTrigger>
                        </CollapsibleTrigger>
                        <TooltipContent
                          side="right"
                          className="group-data-[collapsible=icon]:block hidden"
                        >
                          <p>{item.title}</p>
                        </TooltipContent>
                      </Tooltip>
                      <CollapsibleContent>
                        <SidebarMenuSub className="ml-[22px] border-l border-dashed dark:border-stone-200 border-stone-600 pl-3 mt-1">
                          {item.children?.map((child) => {
                            const ChildIcon = getIcon(child.icon);
                            const isChildActive =
                              child.url && pathname === child.url;

                            return (
                              <SidebarMenuSubItem key={child.id}>
                                <SidebarMenuSubButton
                                  asChild
                                  isActive={!!isChildActive}
                                  className={cn(
                                    "h-9 rounded-md text-[13px] transition-all duration-200",
                                    "dark:text-stone-300 text-stone-700 hover:text-stone-900 hover:bg-stone-50",
                                    isChildActive &&
                                      "text-amber-600 bg-amber-50/80 font-medium hover:bg-amber-50/80 hover:text-amber-600"
                                  )}
                                >
                                  <Link href={child.url || "#"}>
                                    <ChildIcon className="h-[15px] w-[15px]" />
                                    <span>{child.title}</span>
                                  </Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            );
                          })}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                );
              })}
            </SidebarMenu>
          </SidebarGroup>

          {/* System Section */}
          {filteredSystemItems.length > 0 && (
            <SidebarGroup className="pt-4 mt-2 border-t border-stone-100/30 group-data-[collapsible=icon]:mt-0 group-data-[collapsible=icon]:p-0 group-data-[collapsible=icon]:border-t-0">
              <SidebarGroupLabel className="text-[10px] font-semibold uppercase tracking-widest text-stone-400 px-3 mb-1 group-data-[collapsible=icon]:hidden">
                System
              </SidebarGroupLabel>
              <SidebarMenu>
                {filteredSystemItems.map((item) => {
                  const Icon = getIcon(item.icon);
                  const isActive = item.url && pathname === item.url;

                  return (
                    <SidebarMenuItem key={item.id}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <SidebarMenuButton
                            asChild
                            isActive={!!isActive}
                            className={cn(
                              "h-10 rounded-lg font-medium transition-all duration-200",
                              "dark:text-stone-200 text-stone-800 hover:text-stone-900 hover:bg-stone-100",
                              isActive &&
                                "bg-amber-600 text-white hover:bg-amber-600 hover:text-white shadow-sm"
                            )}
                          >
                            <Link href={item.url || "#"}>
                              <Icon className="h-[18px] w-[18px]" />
                              <span>{item.title}</span>
                            </Link>
                          </SidebarMenuButton>
                        </TooltipTrigger>
                        <TooltipContent
                          side="right"
                          className="group-data-[collapsible=icon]:block hidden"
                        >
                          <p>{item.title}</p>
                        </TooltipContent>
                      </Tooltip>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroup>
          )}
        </SidebarContent>

        {/* Footer with User */}
        <SidebarFooter className="border-t border-stone-100/30 p-3">
          <NavUser user={user} />
        </SidebarFooter>
      </TooltipProvider>
    </Sidebar>
  );
}
