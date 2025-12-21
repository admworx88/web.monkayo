"use client";

import { useState, useEffect } from "react";
import { ChevronRight, MapPin } from "lucide-react";
import Link from "next/link";
import { useBranding } from "@/lib/context/branding-context";

interface HeroSlide {
  id: string;
  title: string | null;
  subtitle: string | null;
  image_url: string | null;
  link_url: string | null;
  sort_order: number;
}

interface MinimalHeroProps {
  slides: HeroSlide[];
}

export function MinimalHero({ slides }: MinimalHeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { branding } = useBranding();

  useEffect(() => {
    if (slides.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const activeSlide = slides[currentSlide] || slides[0];

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-stone-50">
      {/* Background Image */}
      {activeSlide?.image_url && (
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
            style={{
              backgroundImage: `url(${activeSlide.image_url})`,
            }}
          />
          {/* Gradient overlay for text readability */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to right, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.75) 50%, rgba(255,255,255,0.60) 100%)`,
            }}
          />
        </div>
      )}

      {/* Subtle background pattern (when no image) */}
      {!activeSlide?.image_url && (
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, ${branding.colors.primary} 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      )}

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl">
          {/* Location badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 backdrop-blur-sm border"
            style={{
              backgroundColor: `${branding.colors.accent}15`,
              borderColor: `${branding.colors.accent}30`,
              animation: "fadeIn 1s ease-out",
            }}
          >
            <MapPin
              className="h-3.5 w-3.5"
              style={{ color: branding.colors.primary }}
            />
            <span
              className="text-sm font-medium"
              style={{ color: branding.colors.textPrimary }}
            >
              Davao de Oro, Philippines
            </span>
          </div>

          {/* Main heading */}
          <h1
            className="text-6xl sm:text-7xl lg:text-8xl font-bold mb-6 leading-[0.95] tracking-tight"
            style={{
              color: branding.colors.textPrimary,
              animation: "fadeInUp 1s ease-out 0.2s both",
              fontFamily: '"DM Serif Display", Georgia, serif',
            }}
          >
            {activeSlide?.title || "Local Government Unit"}
            <br />
            <span style={{ color: branding.colors.primary }}>Monkayo</span>
          </h1>

          {/* Subtitle */}
          <p
            className="text-xl sm:text-2xl mb-12 max-w-2xl leading-relaxed"
            style={{
              color: branding.colors.textSecondary,
              animation: "fadeInUp 1s ease-out 0.4s both",
              fontFamily: '"Instrument Sans", system-ui, sans-serif',
            }}
          >
            {activeSlide?.subtitle || "Gateway to Progress and Prosperity"}
          </p>

          {/* CTA Buttons */}
          <div
            className="flex flex-wrap gap-4"
            style={{ animation: "fadeInUp 1s ease-out 0.6s both" }}
          >
            <Link href="/e-services/new-business">
              <button
                className="group px-8 py-4 rounded-full font-medium flex items-center gap-2 transition-all duration-300 shadow-lg hover:shadow-xl"
                style={{
                  backgroundColor: branding.colors.primary,
                  color: "white",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                Access e-Services
                <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>

            <Link href="/about/history">
              <button
                className="px-8 py-4 rounded-full font-medium border-2 transition-all duration-300"
                style={{
                  borderColor: branding.colors.primary,
                  color: branding.colors.primary,
                  backgroundColor: "transparent",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = `${branding.colors.primary}10`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                Learn About Monkayo
              </button>
            </Link>
          </div>

          {/* Slide indicators */}
          {slides.length > 1 && (
            <div className="flex gap-2 mt-16">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className="h-1.5 rounded-full transition-all duration-500"
                  style={{
                    width: currentSlide === index ? "48px" : "24px",
                    backgroundColor:
                      currentSlide === index
                        ? branding.colors.primary
                        : `${branding.colors.primary}30`,
                  }}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Decorative element */}
      <div
        className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full blur-3xl opacity-10 pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${branding.colors.accent} 0%, transparent 70%)`,
          animation: "pulse 8s ease-in-out infinite",
        }}
      />

      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Instrument+Sans:wght@400;500;600;700&display=swap");

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.1;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.15;
          }
        }
      `}</style>
    </section>
  );
}
