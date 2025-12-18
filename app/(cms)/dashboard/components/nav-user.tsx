"use client";

import {
  LogOut,
  User,
  Settings,
  MoreVertical,
  Shield,
  UserCog,
  Users2,
} from "lucide-react";
import { toast } from "sonner";

import { signOut } from "@/app/(cms)/dashboard/actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

interface NavUserProps {
  user: {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    avatar_url: string | null;
    role: "client" | "staff" | "admin";
  } | null;
}

const roleConfig = {
  admin: {
    label: "Administrator",
    icon: Shield,
    className: "bg-amber-50 text-amber-700 border-amber-200",
  },
  staff: {
    label: "Staff",
    icon: UserCog,
    className: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  client: {
    label: "Client",
    icon: Users2,
    className: "bg-stone-50 text-stone-600 border-stone-200",
  },
};

export function NavUser({ user }: NavUserProps) {
  const { isMobile } = useSidebar();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch {
      toast.error("Failed to sign out. Please try again.");
    }
  };

  if (!user) {
    return null;
  }

  const fullName = `${user.first_name} ${user.last_name}`;
  const initials = `${user.first_name[0] || ""}${
    user.last_name[0] || ""
  }`.toUpperCase();
  const roleInfo = roleConfig[user.role];
  const RoleIcon = roleInfo.icon;

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="h-auto py-2.5 rounded-lg text-stone-700 hover:bg-stone-100 data-[state=open]:bg-stone-100 transition-colors"
            >
              <Avatar className="h-9 w-9 rounded-lg ring-2 ring-stone-200/50">
                <AvatarImage
                  src={user.avatar_url || undefined}
                  alt={fullName}
                />
                <AvatarFallback className="rounded-lg bg-amber-600 text-white text-sm font-medium">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium text-stone-900 dark:text-slate-200 dark:hover:text-slate-900">
                  {fullName}
                </span>
                <span className="truncate text-xs text-stone-500">
                  {user.email}
                </span>
              </div>
              <MoreVertical className="ml-auto h-4 w-4 text-stone-400" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-64 rounded-xl bg-white border-stone-200 shadow-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={8}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-3 px-3 py-3 text-left">
                <Avatar className="h-11 w-11 rounded-xl ring-2 ring-stone-100">
                  <AvatarImage
                    src={user.avatar_url || undefined}
                    alt={fullName}
                  />
                  <AvatarFallback className="rounded-xl bg-amber-600 text-white font-medium">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left leading-tight">
                  <span className="truncate font-semibold text-stone-900">
                    {fullName}
                  </span>
                  <span className="truncate text-xs text-stone-500">
                    {user.email}
                  </span>
                  <Badge
                    variant="outline"
                    className={cn(
                      "mt-1.5 w-fit text-[10px] font-medium px-2 py-0.5",
                      roleInfo.className
                    )}
                  >
                    <RoleIcon className="h-3 w-3 mr-1" />
                    {roleInfo.label}
                  </Badge>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-stone-100" />
            <DropdownMenuGroup>
              <DropdownMenuItem className="text-stone-600 hover:text-stone-900 hover:bg-stone-50 focus:bg-stone-50 focus:text-stone-900 cursor-pointer rounded-lg mx-1">
                <User className="h-4 w-4 mr-2" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="text-stone-600 hover:text-stone-900 hover:bg-stone-50 focus:bg-stone-50 focus:text-stone-900 cursor-pointer rounded-lg mx-1">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator className="bg-stone-100" />
            <DropdownMenuItem
              onClick={handleSignOut}
              className="text-red-600 hover:text-red-700 hover:bg-red-50 focus:bg-red-50 focus:text-red-700 cursor-pointer rounded-lg mx-1 mb-1"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
