"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useBranding } from "@/lib/context/branding-context";
import { useScrollDirection } from "@/hooks/use-scroll-direction";

interface NavItem {
  label: string;
  href?: string;
  children?: {
    label: string;
    href: string;
    description?: string;
  }[];
}

const navigationItems: NavItem[] = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "About Monkayo",
    children: [
      { label: "History", href: "/about/history" },
      {
        label: "Organizational Structure",
        href: "/about/organizational-structure",
      },
      { label: "Elected Officials", href: "/about/elected-officials" },
      { label: "Committees", href: "/about/committees" },
    ],
  },
  {
    label: "Directory",
    children: [
      { label: "Departments", href: "/directory/departments" },
      { label: "Barangays", href: "/directory/barangays" },
    ],
  },
  {
    label: "e-Services",
    children: [
      { label: "New Business Application", href: "/e-services/new-business" },
      { label: "Renewal", href: "/e-services/renewal" },
      { label: "Civil Registry Services", href: "/e-services/civil-registry" },
    ],
  },
  {
    label: "Transparency",
    children: [
      { label: "Annual Budget", href: "/transparency/annual-budget" },
      { label: "Procurement & Bids", href: "/transparency/procurement" },
      { label: "Citizen's Charter", href: "/transparency/citizens-charter" },
    ],
  },
  {
    label: "News",
    href: "/news",
  },
  {
    label: "Tourism",
    href: "/tourism",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];

export function PublicHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const { branding } = useBranding();
  const { isVisible: isTopBarVisible } = useScrollDirection();

  // TopBar height in pixels (h-12 on desktop = 48px)
  const TOPBAR_HEIGHT = 44;

  return (
    <header
      className="sticky z-40 w-full border-b border-stone-200 bg-white/95 backdrop-blur supports-backdrop-filter:bg-white/80 transition-[top] duration-300 ease-in-out"
      style={{
        top: isTopBarVisible ? `${TOPBAR_HEIGHT}px` : "0px",
      }}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo - with z-60 to appear on top of topbar (topbar is z-50) */}
          <div className="flex items-center gap-3 relative z-50">
            <Link href="/" className="flex items-center gap-3 group z-50">
              {branding.logos.header ? (
                <div className="relative h-20 w-32 sm:h-28 sm:w-44 md:h-32 md:w-52 lg:h-36 lg:w-60 top-2 sm:top-3 md:top-4 lg:top-5">
                  <Image
                    src={branding.logos.header}
                    alt="LGU Monkayo"
                    fill
                    className="object-contain"
                    unoptimized
                  />
                </div>
              ) : (
                <>
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br shadow-sm ring-1 transition-all group-hover:shadow-md"
                    style={{
                      backgroundImage: `linear-gradient(to bottom right, ${branding.colors.primary}, ${branding.colors.primary})`,
                      borderColor: `${branding.colors.primary}33`,
                    }}
                  >
                    <Building2 className="h-6 w-6 text-white" />
                  </div>
                  <div className="hidden sm:block">
                    <h1 className="text-base font-bold text-stone-900 leading-tight tracking-tight">
                      LGU Monkayo
                    </h1>
                    <p className="text-[10px] text-stone-500 font-medium">
                      Davao de Oro
                    </p>
                  </div>
                </>
              )}
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:gap-1">
            {navigationItems.map((item) =>
              item.children ? (
                <div
                  key={item.label}
                  className="relative group"
                  onMouseEnter={() => setOpenDropdown(item.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button
                    className="flex items-center gap-1 px-3 py-2 text-base font-black tracking-wide text-stone-600 transition-colors rounded-md hover:bg-stone-50 uppercase"
                    style={{
                      color:
                        openDropdown === item.label
                          ? branding.colors.primary
                          : undefined,
                      fontFamily: '"Bebas Neue", "Arial Black", sans-serif',
                      letterSpacing: "0.5px",
                    }}
                  >
                    {item.label}
                    <ChevronDown
                      className={cn(
                        "h-3.5 w-3.5 transition-transform duration-200",
                        openDropdown === item.label && "rotate-180"
                      )}
                    />
                  </button>

                  {/* Dropdown Menu - pt-2 creates invisible hover bridge */}
                  {openDropdown === item.label && (
                    <div className="absolute left-0 top-full pt-2">
                      <div className="w-64 rounded-lg border border-stone-200 bg-white shadow-lg ring-1 ring-black/5 animate-in fade-in-0 slide-in-from-top-1 duration-150">
                        <div className="p-1">
                          {item.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className="block px-3 py-2.5 text-sm font-bold tracking-wide text-stone-700 rounded-md transition-colors hover:bg-opacity-10 uppercase"
                              style={{
                                ["--hover-bg" as string]:
                                  branding.colors.primary,
                                fontFamily:
                                  '"Bebas Neue", "Arial Black", sans-serif',
                                letterSpacing: "0.3px",
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = `${branding.colors.primary}1A`;
                                e.currentTarget.style.color =
                                  branding.colors.primary;
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = "";
                                e.currentTarget.style.color = "";
                              }}
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.label}
                  href={item.href!}
                  className="px-3 py-2 text-base font-black tracking-wide text-stone-600 transition-colors rounded-md hover:bg-stone-50 uppercase"
                  style={{
                    fontFamily: '"Bebas Neue", "Arial Black", sans-serif',
                    letterSpacing: "0.5px",
                  }}
                >
                  {item.label}
                </Link>
              )
            )}
          </div>

          {/* Right Side - Login Button */}
          <div className="flex items-center gap-4">
            <Link href="/signin" className="hidden sm:block">
              <Button
                variant="outline"
                size="sm"
                className="font-medium"
                style={{
                  borderColor: branding.colors.primary,
                  color: branding.colors.primary,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = `${branding.colors.primary}0D`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "";
                }}
              >
                Login
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <button
              type="button"
              className="lg:hidden inline-flex items-center justify-center rounded-md p-2 text-stone-600 hover:bg-stone-100 hover:text-stone-900 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Toggle menu</span>
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-stone-200 py-4 animate-in slide-in-from-top-2 fade-in-20">
            <div className="space-y-1">
              {navigationItems.map((item) =>
                item.children ? (
                  <div key={item.label} className="space-y-1">
                    <button
                      className="flex w-full items-center justify-between px-3 py-2 text-lg font-black tracking-wide text-stone-700 hover:bg-stone-50 rounded-md uppercase"
                      onClick={() =>
                        setOpenDropdown(
                          openDropdown === item.label ? null : item.label
                        )
                      }
                      style={{
                        fontFamily: '"Bebas Neue", "Arial Black", sans-serif',
                        letterSpacing: "0.5px",
                      }}
                    >
                      {item.label}
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 transition-transform",
                          openDropdown === item.label && "rotate-180"
                        )}
                      />
                    </button>
                    {openDropdown === item.label && (
                      <div className="pl-4 space-y-1">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block px-3 py-2 text-base font-bold tracking-wide text-stone-600 rounded-md transition-colors uppercase"
                            onClick={() => setMobileMenuOpen(false)}
                            style={{
                              fontFamily:
                                '"Bebas Neue", "Arial Black", sans-serif',
                              letterSpacing: "0.3px",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = `${branding.colors.primary}1A`;
                              e.currentTarget.style.color =
                                branding.colors.primary;
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = "";
                              e.currentTarget.style.color = "";
                            }}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={item.label}
                    href={item.href!}
                    className="block px-3 py-2 text-lg font-black tracking-wide text-stone-700 hover:bg-stone-50 rounded-md uppercase"
                    onClick={() => setMobileMenuOpen(false)}
                    style={{
                      fontFamily: '"Bebas Neue", "Arial Black", sans-serif',
                      letterSpacing: "0.5px",
                    }}
                  >
                    {item.label}
                  </Link>
                )
              )}

              {/* Mobile Login Button */}
              <div className="pt-4 border-t border-stone-200 mt-4">
                <Link
                  href="/signin"
                  className="block"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Button
                    variant="outline"
                    className="w-full border-amber-600 text-amber-700 hover:bg-amber-50 hover:text-amber-800 hover:border-amber-700 font-medium"
                  >
                    Login
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Font Import for Navigation */}
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap");
      `}</style>
    </header>
  );
}
