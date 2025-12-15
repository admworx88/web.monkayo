import { IconFilter, IconDownload, IconPlus } from "@tabler/icons-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"

export function SiteHeader() {
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b border-border/40 bg-gradient-to-r from-background via-background to-teal-500/5 backdrop-blur-sm transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <div className="flex-1">
          <div>
            <h1 className="text-base font-mono font-bold tracking-tight">CASHMATE</h1>
            <p className="text-xs text-muted-foreground">Welcome back, Alex 👋</p>
          </div>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="outline" size="sm" className="hidden sm:flex gap-2">
            <IconFilter className="size-4" />
            Filter
          </Button>
          <Button variant="outline" size="sm" className="hidden md:flex gap-2">
            <IconDownload className="size-4" />
            Export
          </Button>
          <Button size="sm" className="gap-2 bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white shadow-lg shadow-teal-500/25">
            <IconPlus className="size-4" />
            <span className="hidden sm:inline">New Transaction</span>
          </Button>
        </div>
      </div>
    </header>
  )
}
