"use client";

import Image from "next/image";
import { useBranding } from "@/lib/context/branding-context";

interface Logo {
  id: string;
  name: string | null;
  image_url: string | null;
  link_url: string | null;
  sort_order: number;
}

interface MinimalPartnersProps {
  logos: Logo[];
}

export function MinimalPartners({ logos }: MinimalPartnersProps) {
  const { branding } = useBranding();

  if (logos.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-white border-t border-stone-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <p
            className="text-sm font-semibold uppercase tracking-wider"
            style={{ color: branding.colors.textSecondary }}
          >
            Our Partners & Affiliates
          </p>
        </div>

        {/* Logos grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center">
          {logos.map((logo, index) => (
            <div
              key={logo.id}
              className="group"
              style={{
                animation: `fadeIn 0.6s ease-out ${index * 0.1}s both`,
              }}
            >
              {logo.link_url ? (
                <a
                  href={logo.link_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block transition-all duration-300 hover:scale-110"
                >
                  <div className="relative w-24 h-24 grayscale group-hover:grayscale-0 transition-all duration-300 opacity-60 group-hover:opacity-100">
                    {logo.image_url && (
                      <Image
                        src={logo.image_url}
                        alt={logo.name || "Partner logo"}
                        fill
                        className="object-contain"
                        unoptimized
                      />
                    )}
                  </div>
                </a>
              ) : (
                <div className="relative w-24 h-24">
                  {logo.image_url && (
                    <Image
                      src={logo.image_url}
                      alt={logo.name || "Partner logo"}
                      fill
                      className="object-contain"
                      unoptimized
                    />
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 0.6;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
