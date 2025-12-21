"use client";

import Link from "next/link";
import { Facebook, ExternalLink, ArrowRight } from "lucide-react";
import { useBranding } from "@/lib/context/branding-context";

interface NewsItem {
  id: string;
  title: string | null;
  facebook_link: string | null;
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
    <section className="py-24 bg-stone-50 relative">
      {/* Section header */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-16">
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
                fontFamily: '"DM Serif Display", Georgia, serif'
              }}
            >
              News & Announcements
            </h2>
            <p
              className="text-lg leading-relaxed"
              style={{
                color: branding.colors.textSecondary,
                fontFamily: '"Instrument Sans", system-ui, sans-serif'
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
              border: `2px solid ${branding.colors.primary}`
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = branding.colors.primary;
              e.currentTarget.style.color = 'white';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = branding.colors.primary;
            }}
          >
            View All News
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* News grid */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recentNews.map((item, index) => (
            <div
              key={item.id}
              className="group"
              style={{
                animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
              }}
            >
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 h-full border border-stone-100">
                {/* Colored accent bar */}
                <div
                  className="h-2"
                  style={{
                    background: `linear-gradient(90deg, ${branding.colors.primary} 0%, ${branding.colors.accent} 100%)`
                  }}
                />

                <div className="p-8">
                  {/* Date */}
                  <div
                    className="text-xs font-semibold uppercase tracking-wider mb-4"
                    style={{ color: branding.colors.primary }}
                  >
                    {new Date(item.created_at).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </div>

                  {/* Title */}
                  <h3
                    className="text-xl font-bold mb-4 leading-tight line-clamp-3 group-hover:text-opacity-80 transition-colors"
                    style={{
                      color: branding.colors.textPrimary,
                      fontFamily: '"Instrument Sans", system-ui, sans-serif'
                    }}
                  >
                    {item.title}
                  </h3>

                  {/* Facebook link */}
                  {item.facebook_link && (
                    <a
                      href={item.facebook_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-medium group/link"
                      style={{ color: branding.colors.primary }}
                    >
                      <div
                        className="p-2 rounded-lg transition-colors"
                        style={{ backgroundColor: `${branding.colors.primary}10` }}
                      >
                        <Facebook className="h-4 w-4" />
                      </div>
                      <span className="group-hover/link:underline">
                        Read on Facebook
                      </span>
                      <ExternalLink className="h-3.5 w-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile "View All" button */}
        <div className="md:hidden mt-8 text-center">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300"
            style={{
              color: branding.colors.primary,
              border: `2px solid ${branding.colors.primary}`
            }}
          >
            View All News
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
