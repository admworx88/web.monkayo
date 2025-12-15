"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ArrowLeftRight,
  CreditCard,
  Gamepad2,
  Ticket,
  Wallet,
  MessageSquare,
  Bell,
  Settings,
  LogOut,
  ChevronRight,
  TrendingUp,
  BarChart3,
  Users,
  FileText,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const mainNavItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    url: "/cms/dashboard",
    badge: null,
  },
  {
    title: "Analytics",
    icon: BarChart3,
    url: "/cms/analytics",
    badge: "New",
  },
  {
    title: "Transactions",
    icon: ArrowLeftRight,
    url: "/cms/transactions",
    badge: null,
  },
  {
    title: "Customers",
    icon: Users,
    url: "/cms/customers",
    badge: "12",
  },
];

const financeNavItems = [
  {
    title: "Payments",
    icon: CreditCard,
    url: "/cms/payments",
  },
  {
    title: "Wallet",
    icon: Wallet,
    url: "/cms/wallet",
  },
  {
    title: "Invoices",
    icon: FileText,
    url: "/cms/invoices",
  },
];

const supportNavItems = [
  {
    title: "Tickets",
    icon: Ticket,
    url: "/cms/tickets",
    badge: "3",
  },
  {
    title: "Messages",
    icon: MessageSquare,
    url: "/cms/messages",
    badge: "5",
  },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar className="border-r border-border/40 bg-card/50 backdrop-blur-xl">
      <SidebarHeader className="border-b border-border/40 p-6">
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-lg blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
            <div className="relative flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-teal-500 to-cyan-600 shadow-lg">
              <TrendingUp className="h-5 w-5 text-white" />
            </div>
          </div>
          <div>
            <h2 className="font-mono text-lg font-bold tracking-tight">CASHMATE</h2>
            <p className="text-xs text-muted-foreground">Financial CMS</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-3 py-6 space-y-6">
        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className="px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground/70 mb-2">
            Main
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {mainNavItems.map((item) => {
                const isActive = pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      className={`
                        group relative overflow-hidden transition-all duration-200
                        ${
                          isActive
                            ? "bg-gradient-to-r from-teal-500/10 to-cyan-500/10 text-teal-600 dark:text-teal-400 shadow-sm"
                            : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                        }
                      `}
                    >
                      <Link href={item.url} className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-3">
                          <item.icon className={`h-4 w-4 transition-transform group-hover:scale-110 ${isActive ? "text-teal-600 dark:text-teal-400" : ""}`} />
                          <span className="font-medium">{item.title}</span>
                        </div>
                        {item.badge && (
                          <Badge variant="secondary" className="ml-auto text-xs px-2 py-0">
                            {item.badge}
                          </Badge>
                        )}
                        {isActive && (
                          <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-teal-500 to-cyan-500 rounded-r" />
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Finance Section */}
        <SidebarGroup>
          <SidebarGroupLabel className="px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground/70 mb-2">
            Finance
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {financeNavItems.map((item) => {
                const isActive = pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      className={`
                        group relative overflow-hidden transition-all duration-200
                        ${
                          isActive
                            ? "bg-gradient-to-r from-teal-500/10 to-cyan-500/10 text-teal-600 dark:text-teal-400 shadow-sm"
                            : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                        }
                      `}
                    >
                      <Link href={item.url} className="flex items-center gap-3">
                        <item.icon className={`h-4 w-4 transition-transform group-hover:scale-110 ${isActive ? "text-teal-600 dark:text-teal-400" : ""}`} />
                        <span className="font-medium">{item.title}</span>
                        {isActive && (
                          <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-teal-500 to-cyan-500 rounded-r" />
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Support Section */}
        <SidebarGroup>
          <SidebarGroupLabel className="px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground/70 mb-2">
            Support
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {supportNavItems.map((item) => {
                const isActive = pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      className={`
                        group relative overflow-hidden transition-all duration-200
                        ${
                          isActive
                            ? "bg-gradient-to-r from-teal-500/10 to-cyan-500/10 text-teal-600 dark:text-teal-400 shadow-sm"
                            : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                        }
                      `}
                    >
                      <Link href={item.url} className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-3">
                          <item.icon className={`h-4 w-4 transition-transform group-hover:scale-110 ${isActive ? "text-teal-600 dark:text-teal-400" : ""}`} />
                          <span className="font-medium">{item.title}</span>
                        </div>
                        {item.badge && (
                          <Badge variant="destructive" className="ml-auto text-xs px-2 py-0">
                            {item.badge}
                          </Badge>
                        )}
                        {isActive && (
                          <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-teal-500 to-cyan-500 rounded-r" />
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Quick Stats */}
        <div className="mx-3 rounded-lg border border-border/50 bg-gradient-to-br from-card to-card/50 p-4 backdrop-blur">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-muted-foreground">Monthly Goal</span>
              <span className="text-xs font-mono font-bold text-foreground">78%</span>
            </div>
            <Progress value={78} className="h-2" />
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">$23,400 / $30,000</span>
              <span className="font-mono font-semibold text-teal-600 dark:text-teal-400">+12%</span>
            </div>
          </div>
        </div>
      </SidebarContent>

      <SidebarFooter className="border-t border-border/40 p-4">
        {/* User Profile */}
        <div className="flex items-center gap-3 rounded-lg p-3 hover:bg-accent/50 transition-colors cursor-pointer group">
          <Avatar className="h-10 w-10 ring-2 ring-border/50 group-hover:ring-teal-500/50 transition-all">
            <AvatarImage src="/avatars/01.png" />
            <AvatarFallback className="bg-gradient-to-br from-teal-500 to-cyan-600 text-white text-sm font-semibold">
              AM
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">Alex Morgan</p>
            <p className="text-xs text-muted-foreground truncate">alex@cashmate.io</p>
          </div>
          <Settings className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
        </div>

        <Button
          variant="ghost"
          className="w-full justify-start text-muted-foreground hover:text-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
          size="sm"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
