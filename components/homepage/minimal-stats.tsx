"use client";

import { useBranding } from "@/lib/context/branding-context";
import { Users, Building2, MapPin, Leaf } from "lucide-react";

const stats = [
  {
    icon: Users,
    value: "100K+",
    label: "Constituents",
    description: "Proud residents of Monkayo"
  },
  {
    icon: MapPin,
    value: "25",
    label: "Barangays",
    description: "Communities we serve"
  },
  {
    icon: Building2,
    value: "15+",
    label: "Departments",
    description: "Government offices"
  },
  {
    icon: Leaf,
    value: "Est. 1936",
    label: "Founded",
    description: "Rich history and heritage"
  }
];

export function MinimalStats() {
  const { branding } = useBranding();

  return (
    <section
      className="py-20 relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${branding.colors.primary} 0%, ${branding.colors.secondary} 100%)`
      }}
    >
      {/* Decorative pattern overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="text-center"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                }}
              >
                {/* Icon */}
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm mb-4">
                  <Icon className="h-8 w-8 text-white" />
                </div>

                {/* Value */}
                <div
                  className="text-4xl sm:text-5xl font-bold mb-2 text-white"
                  style={{ fontFamily: '"DM Serif Display", Georgia, serif' }}
                >
                  {stat.value}
                </div>

                {/* Label */}
                <div
                  className="text-lg font-semibold mb-1 text-white/90"
                  style={{ fontFamily: '"Instrument Sans", system-ui, sans-serif' }}
                >
                  {stat.label}
                </div>

                {/* Description */}
                <p className="text-sm text-white/70">
                  {stat.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
