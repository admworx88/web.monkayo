"use client"

import * as React from "react"
import {
  IconArrowsLeftRight,
  IconChartBar,
  IconCreditCard,
  IconDashboard,
  IconFileDescription,
  IconHelp,
  IconMessage,
  IconSearch,
  IconSettings,
  IconTicket,
  IconTrendingUp,
  IconUsers,
  IconWallet,
} from "@tabler/icons-react"

import { NavDocuments } from "@/app/(cms)/dashboard/components/nav-documents"
import { NavMain } from "@/app/(cms)/dashboard/components/nav-main"
import { NavSecondary } from "@/app/(cms)/dashboard/components/nav-secondary"
import { NavUser } from "@/app/(cms)/dashboard/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "Alex Morgan",
    email: "alex@cashmate.io",
    avatar: "/avatars/01.png",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/cms/dashboard",
      icon: IconDashboard,
    },
    {
      title: "Analytics",
      url: "/cms/analytics",
      icon: IconChartBar,
      badge: "New",
    },
    {
      title: "Transactions",
      url: "/cms/transactions",
      icon: IconArrowsLeftRight,
    },
    {
      title: "Customers",
      url: "/cms/customers",
      icon: IconUsers,
      badge: "12",
    },
  ],
  navSecondary: [
    {
      title: "Tickets",
      url: "/cms/tickets",
      icon: IconTicket,
      badge: "3",
    },
    {
      title: "Messages",
      url: "/cms/messages",
      icon: IconMessage,
      badge: "5",
    },
    {
      title: "Settings",
      url: "/cms/settings",
      icon: IconSettings,
    },
  ],
  documents: [
    {
      name: "Payments",
      url: "/cms/payments",
      icon: IconCreditCard,
    },
    {
      name: "Wallet",
      url: "/cms/wallet",
      icon: IconWallet,
    },
    {
      name: "Invoices",
      url: "/cms/invoices",
      icon: IconFileDescription,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader className="border-b border-border/40 p-6">
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-teal-500 to-cyan-600 blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
            <div className="relative flex h-10 w-10 items-center justify-center bg-gradient-to-br from-teal-500 to-cyan-600 shadow-lg">
              <IconTrendingUp className="h-5 w-5 text-white" />
            </div>
          </div>
          <div>
            <h2 className="font-mono text-lg font-bold tracking-tight">CASHMATE</h2>
            <p className="text-xs text-muted-foreground">Financial CMS</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavDocuments items={data.documents} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
