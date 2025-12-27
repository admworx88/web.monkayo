"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useBranding } from "@/lib/context/branding-context";
import { Bebas_Neue } from "next/font/google";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

interface NewsItem {
  id: string;
  title: string | null;
  facebook_embed_url: string | null;
  created_at: string;
}

interface ModernNewsSectionProps {
  items: NewsItem[];
}

export function ModernNewsSection({ items }: ModernNewsSectionProps) {
  const { branding } = useBranding();

  // Show max 3 recent items
  const recentNews = items.slice(0, 3);

  if (recentNews.length === 0) {
    return null;
  }

  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-br from-stone-50 via-amber-50/40 to-white">
      {/* Tropical Weave Pattern Background */}
      <div className="absolute inset-0 opacity-[0.025]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="news-weave"
              x="0"
              y="0"
              width="100"
              height="100"
              patternUnits="userSpaceOnUse"
            >
              {/* Upper wave - primary color */}
              <path
                d="M0,50 L25,25 L50,50 L75,25 L100,50"
                stroke={branding.colors.primary}
                strokeWidth="1.5"
                fill="none"
              />
              {/* Lower wave - accent color */}
              <path
                d="M0,50 L25,75 L50,50 L75,75 L100,50"
                stroke={branding.colors.accent}
                strokeWidth="1"
                fill="none"
                opacity="0.6"
              />
              {/* Center dot */}
              <circle
                cx="50"
                cy="50"
                r="3"
                fill={branding.colors.accent}
                opacity="0.4"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#news-weave)" />
        </svg>
      </div>

      {/* Warm Accent Glow - Top Right */}
      <div
        className="absolute top-[-10%] right-[-8%] w-[500px] h-[500px] rounded-full blur-3xl opacity-[0.08]"
        style={{
          background: `radial-gradient(circle, ${branding.colors.accent} 0%, transparent 70%)`,
        }}
      />

      {/* Section header */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-16 relative z-10">
        <div className="flex items-end justify-between">
          <div className="max-w-2xl">
            <p
              className="text-sm font-semibold uppercase tracking-wider mb-4"
              style={{ color: branding.colors.primary }}
            >
              Latest Updates
            </p>
            <h2
              className="text-4xl sm:text-5xl font-bold mb-4"
              style={{
                color: branding.colors.textPrimary,
                fontFamily: '"DM Serif Display", Georgia, serif',
              }}
            >
              News & Announcements
            </h2>
            <p
              className="text-lg leading-relaxed"
              style={{
                color: branding.colors.textSecondary,
                fontFamily: '"Instrument Sans", system-ui, sans-serif',
              }}
            >
              Stay informed with the latest updates from our community
            </p>
          </div>

          <Link
            href="/news"
            className="hidden md:flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 group"
            style={{
              color: branding.colors.primary,
              border: `2px solid ${branding.colors.primary}`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = branding.colors.primary;
              e.currentTarget.style.color = "white";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = branding.colors.primary;
            }}
          >
            View All News
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* News grid */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recentNews.map((item, index) => (
            <article
              key={item.id}
              className="group perspective-1000"
              style={{
                animation: `newsCardFadeIn 0.8s ease-out ${index * 0.15}s both`,
              }}
            >
              <div className="relative bg-white rounded-3xl overflow-hidden h-full border-2 transition-all duration-700 transform-gpu group-hover:scale-[1.02] group-hover:-translate-y-2 group-hover:shadow-2xl"
                   style={{
                     borderColor: `${branding.colors.primary}20`,
                   }}>

                {/* LGU Logo Watermark Background */}
                {branding.logos.header && (
                  <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
                    <div className="relative w-full h-full opacity-[0.08] grayscale transition-all duration-700 group-hover:opacity-[0.15] group-hover:scale-110">
                      <Image
                        src={branding.logos.header}
                        alt="LGU Monkayo Logo"
                        fill
                        className="object-contain p-4"
                        unoptimized
                      />
                    </div>
                  </div>
                )}

                {/* Diagonal Accent Strip - Top Right */}
                <div
                  className="absolute top-0 right-0 w-32 h-32 opacity-10 transform rotate-45 translate-x-16 -translate-y-16 transition-all duration-700 group-hover:scale-150 group-hover:opacity-20"
                  style={{
                    background: `linear-gradient(135deg, ${branding.colors.primary} 0%, ${branding.colors.accent} 100%)`,
                  }}
                />

                {/* Gradient Border Animation on Hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-3xl"
                  style={{
                    background: `linear-gradient(135deg, ${branding.colors.primary}15, ${branding.colors.accent}15)`,
                    boxShadow: `inset 0 0 0 2px ${branding.colors.accent}40`,
                  }}
                />

                <div className="relative p-8 flex flex-col h-full">
                  {/* Date Badge - Circular */}
                  <div className="absolute -top-4 -left-4 z-10">
                    <div
                      className="w-20 h-20 rounded-full flex flex-col items-center justify-center shadow-lg border-4 border-white transform transition-all duration-700 group-hover:scale-110 group-hover:rotate-12"
                      style={{
                        background: `linear-gradient(135deg, ${branding.colors.primary} 0%, ${branding.colors.accent} 100%)`,
                      }}
                    >
                      <span className={`text-2xl font-black text-white leading-none ${bebasNeue.className}`}>
                        {new Date(item.created_at).getDate()}
                      </span>
                      <span className={`text-[9px] font-bold text-white uppercase tracking-wider leading-none mt-0.5 ${bebasNeue.className}`}>
                        {new Date(item.created_at).toLocaleDateString("en-US", { month: "short" })}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 pt-8">
                    {/* Title */}
                    <h3
                      className={`text-2xl sm:text-3xl font-black mb-6 leading-tight line-clamp-3 transition-colors duration-500 ${bebasNeue.className}`}
                      style={{
                        color: branding.colors.textPrimary,
                        letterSpacing: '0.02em',
                      }}
                    >
                      {item.title}
                    </h3>

                    {/* Decorative Divider */}
                    <div className="flex gap-2 mb-6">
                      <div
                        className="h-1 w-16 rounded-full transition-all duration-700 group-hover:w-24"
                        style={{ backgroundColor: branding.colors.primary }}
                      />
                      <div
                        className="h-1 w-8 rounded-full transition-all duration-700 group-hover:w-12"
                        style={{ backgroundColor: branding.colors.accent }}
                      />
                    </div>
                  </div>

                  {/* View Article Link - Only show if facebook_embed_url exists */}
                  {item.facebook_embed_url && (
                    <a
                      href={item.facebook_embed_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center justify-center gap-3 px-8 py-5 rounded-2xl font-black text-lg uppercase tracking-wider transition-all duration-500 group/link overflow-hidden relative shadow-lg w-full ${bebasNeue.className}`}
                      style={{
                        backgroundColor: `${branding.colors.primary}`,
                        color: 'white',
                        letterSpacing: '0.1em',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = branding.colors.accent;
                        e.currentTarget.style.transform = 'scale(1.05)';
                        e.currentTarget.style.boxShadow = `0 15px 40px ${branding.colors.accent}50`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = branding.colors.primary;
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.boxShadow = '';
                      }}
                    >
                      {/* Shimmer Effect */}
                      <div
                        className="absolute inset-0 opacity-0 group-hover/link:opacity-100 transition-opacity duration-700"
                        style={{
                          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                          backgroundSize: '200% 100%',
                          animation: 'shimmer 1.5s infinite',
                        }}
                      />

                      <span className="relative z-10">View Article</span>
                      <ArrowRight className="h-6 w-6 relative z-10 transition-transform duration-500 group-hover/link:translate-x-2" />
                    </a>
                  )}
                </div>

                {/* Bottom Accent Border */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-2 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"
                  style={{
                    background: `linear-gradient(90deg, ${branding.colors.primary} 0%, ${branding.colors.accent} 100%)`,
                  }}
                />
              </div>
            </article>
          ))}
        </div>

        {/* Mobile "View All" button */}
        <div className="md:hidden mt-8 text-center">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300"
            style={{
              color: branding.colors.primary,
              border: `2px solid ${branding.colors.primary}`,
            }}
          >
            View All News
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Card Animations */}
      <style jsx global>{`
        @keyframes newsCardFadeIn {
          from {
            opacity: 0;
            transform: translateY(40px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes shimmer {
          0% {
            background-position: -200% center;
          }
          100% {
            background-position: 200% center;
          }
        }

        .perspective-1000 {
          perspective: 1000px;
        }

        .transform-gpu {
          transform: translateZ(0);
          will-change: transform;
        }
      `}</style>
    </section>
  );
}
