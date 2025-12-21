"use client";

import * as React from "react";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/components/theme-toggle";

interface Breadcrumb {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  title: string;
  description?: string;
  breadcrumbs?: Breadcrumb[];
  actions?: React.ReactNode;
  className?: string;
}

export function PageHeader({
  title,
  description,
  breadcrumbs,
  actions,
  className,
}: PageHeaderProps) {
  const pathname = usePathname();

  // Auto-generate breadcrumbs from pathname if not provided
  const autoBreadcrumbs = React.useMemo(() => {
    if (breadcrumbs) return breadcrumbs;

    const segments = pathname.split("/").filter(Boolean);
    return segments.map((segment, index) => {
      const href = "/" + segments.slice(0, index + 1).join("/");
      const label = segment
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
      return { label, href: index < segments.length - 1 ? href : undefined };
    });
  }, [pathname, breadcrumbs]);

  return (
    <header
      className={cn(
        "sticky top-0 z-10 bg-white/80 dark:bg-stone-900/80 backdrop-blur-sm border-b border-stone-200/60 dark:border-stone-800/60",
        className
      )}
    >
      {/* Top bar with sidebar trigger and breadcrumbs */}
      <div className="flex h-14 items-center gap-3 px-6">
        <SidebarTrigger className="text-stone-500 hover:text-stone-900 hover:bg-stone-100 dark:text-stone-400 dark:hover:text-stone-100 dark:hover:bg-stone-800" />
        <Separator
          orientation="vertical"
          className="h-5 bg-stone-200 dark:bg-stone-700"
        />

        {/* Breadcrumbs */}
        <nav className="flex items-center gap-1 text-sm flex-1">
          {autoBreadcrumbs.map((crumb, index) => (
            <div key={index} className="flex items-center gap-1">
              {index > 0 && (
                <ChevronRight className="h-3.5 w-3.5 text-stone-400 dark:text-stone-500" />
              )}
              {crumb.href ? (
                <Link
                  href={crumb.href}
                  className="text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100 transition-colors"
                >
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-stone-900 dark:text-stone-100 font-medium">
                  {crumb.label}
                </span>
              )}
            </div>
          ))}
        </nav>

        {/* Theme Toggle */}
        <ThemeToggle />
      </div>

      {/* Title section */}
      <div className="flex flex-col gap-1 px-6 lg:px-8 pb-4 pt-2">
        <div className="flex items-center justify-between gap-4">
          <div className="min-w-0">
            <h1 className="text-2xl font-semibold text-stone-900 dark:text-stone-100 tracking-tight truncate">
              {title}
            </h1>
            {description && (
              <p className="text-sm text-stone-500 dark:text-stone-400 mt-0.5">
                {description}
              </p>
            )}
          </div>
          {actions && (
            <div className="flex items-center gap-2 flex-shrink-0">
              {actions}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
