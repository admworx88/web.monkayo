"use client";

import Link from "next/link";
import { FileText, Building2, Landmark, Download, Briefcase, Phone, ArrowUpRight } from "lucide-react";
import { useBranding } from "@/lib/context/branding-context";

const services = [
  {
    icon: FileText,
    title: "e-Services",
    description: "Apply for permits and licenses online",
    href: "/e-services/new-business",
    color: "#3b82f6"
  },
  {
    icon: Building2,
    title: "Directory",
    description: "Find departments and barangays",
    href: "/directory/departments",
    color: "#8b5cf6"
  },
  {
    icon: Landmark,
    title: "Transparency",
    description: "View budgets and procurement",
    href: "/transparency/annual-budget",
    color: "#ec4899"
  },
  {
    icon: Download,
    title: "Downloads",
    description: "Access forms and ordinances",
    href: "/downloads",
    color: "#f59e0b"
  },
  {
    icon: Briefcase,
    title: "Opportunities",
    description: "Explore job vacancies",
    href: "/opportunities",
    color: "#10b981"
  },
  {
    icon: Phone,
    title: "Contact Us",
    description: "Get in touch with our office",
    href: "/contact",
    color: "#06b6d4"
  }
];

export function QuickServices() {
  const { branding } = useBranding();

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Section header */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-3xl">
          <p
            className="text-sm font-semibold uppercase tracking-wider mb-4"
            style={{ color: branding.colors.primary }}
          >
            Quick Access
          </p>
          <h2
            className="text-4xl sm:text-5xl font-bold mb-4"
            style={{
              color: branding.colors.textPrimary,
              fontFamily: '"DM Serif Display", Georgia, serif'
            }}
          >
            Services at Your Fingertips
          </h2>
          <p
            className="text-lg leading-relaxed"
            style={{
              color: branding.colors.textSecondary,
              fontFamily: '"Instrument Sans", system-ui, sans-serif'
            }}
          >
            Access government services, information, and resources with ease
          </p>
        </div>
      </div>

      {/* Services grid */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Link
                key={service.title}
                href={service.href}
                className="group"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                }}
              >
                <div
                  className="relative p-8 rounded-2xl border-2 transition-all duration-300 h-full bg-white hover:shadow-xl"
                  style={{
                    borderColor: `${branding.colors.primary}15`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.borderColor = branding.colors.primary;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.borderColor = `${branding.colors.primary}15`;
                  }}
                >
                  {/* Icon */}
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110"
                    style={{
                      backgroundColor: `${branding.colors.primary}15`,
                    }}
                  >
                    <Icon className="h-7 w-7" style={{ color: branding.colors.primary }} />
                  </div>

                  {/* Content */}
                  <h3
                    className="text-xl font-bold mb-2 flex items-center justify-between"
                    style={{ color: branding.colors.textPrimary }}
                  >
                    {service.title}
                    <ArrowUpRight className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" style={{ color: branding.colors.primary }} />
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: branding.colors.textSecondary }}
                  >
                    {service.description}
                  </p>

                  {/* Hover accent */}
                  <div
                    className="absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-500 rounded-b-xl"
                    style={{ backgroundColor: branding.colors.accent }}
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
