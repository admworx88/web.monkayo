"use client";

import { useState, useEffect } from "react";
import { ChevronRight, MapPin, Sparkles } from "lucide-react";
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
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { branding } = useBranding();

  useEffect(() => {
    if (slides.length <= 1) return;

    const timer = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
        setIsTransitioning(false);
      }, 500);
    }, 6000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const activeSlide = slides[currentSlide] || slides[0];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-stone-50 pt-32 sm:pt-28 md:pt-24 lg:pt-5">
      {/* Animated Background Pattern - Indigenous Weaving Inspired */}
      <div className="absolute inset-0 opacity-[0.03] sm:opacity-[0.04]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="tribal-pattern"
              x="0"
              y="0"
              width="120"
              height="120"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 0 60 L 60 0 L 120 60 L 60 120 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                style={{ color: branding.colors.primary }}
              />
              <circle
                cx="60"
                cy="60"
                r="15"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                style={{ color: branding.colors.accent }}
              />
              <path
                d="M 30 30 L 90 30 L 90 90 L 30 90 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                style={{ color: branding.colors.primary }}
                opacity="0.5"
              />
            </pattern>
          </defs>
          <rect
            width="100%"
            height="100%"
            fill="url(#tribal-pattern)"
            className="animate-pattern-shift"
          />
        </svg>
      </div>

      {/* Radial Gradient Accent - Sun-inspired */}
      <div
        className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] rounded-full blur-3xl opacity-20 animate-pulse-slow"
        style={{
          background: `radial-gradient(circle, ${branding.colors.accent} 0%, transparent 70%)`,
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 md:gap-12 items-center min-h-[75vh] sm:min-h-[80vh] lg:min-h-[85vh]">
          {/* LEFT COLUMN - Content */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-6 md:space-y-8">
            {/* Location Badge with Sparkle */}
            <div
              className={`inline-flex items-center gap-1.5 sm:gap-2.5 px-3 py-2 sm:px-5 sm:py-2.5 rounded-full backdrop-blur-md border-2 transition-all duration-700 ${
                isTransitioning
                  ? "opacity-0 translate-y-4"
                  : "opacity-100 translate-y-0"
              }`}
              style={{
                backgroundColor: `${branding.colors.accent}20`,
                borderColor: `${branding.colors.accent}`,
                boxShadow: `0 4px 20px ${branding.colors.accent}25`,
              }}
            >
              <Sparkles
                className="h-3 w-3 sm:h-4 sm:w-4 animate-spin-slow"
                style={{ color: branding.colors.accent }}
              />
              <MapPin
                className="h-3 w-3 sm:h-4 sm:w-4"
                style={{ color: branding.colors.primary }}
              />
              <span
                className="text-[10px] xs:text-xs sm:text-sm font-bold tracking-wide uppercase"
                style={{ color: branding.colors.textPrimary }}
              >
                Davao de Oro, Philippines
              </span>
            </div>

            {/* Main Headline - Bold and Expressive */}
            <div className="space-y-2 sm:space-y-3 md:space-y-4">
              <h1
                className={`text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[0.95] sm:leading-[0.9] tracking-tighter transition-all duration-700 ${
                  isTransitioning
                    ? "opacity-0 translate-x-[-50px]"
                    : "opacity-100 translate-x-0"
                }`}
                style={{
                  color: branding.colors.textPrimary,
                  fontFamily:
                    '"Sora", "Plus Jakarta Sans", system-ui, sans-serif',
                  textShadow: "2px 2px 0px rgba(0,0,0,0.03)",
                }}
              >
                {activeSlide?.title || "Local Government Unit"}
              </h1>
              <div
                className={`h-1.5 sm:h-2 rounded-full transition-all duration-700 delay-100 ${
                  isTransitioning
                    ? "w-0 opacity-0"
                    : "w-20 sm:w-28 md:w-32 opacity-100"
                }`}
                style={{
                  background: `linear-gradient(90deg, ${branding.colors.accent} 0%, ${branding.colors.primary} 100%)`,
                }}
              />
              {/* <h2
                className={`text-5xl sm:text-6xl lg:text-7xl font-black leading-[0.9] tracking-tighter transition-all duration-700 delay-150 ${
                  isTransitioning
                    ? "opacity-0 translate-x-[-50px]"
                    : "opacity-100 translate-x-0"
                }`}
                style={{
                  color: branding.colors.primary,
                  fontFamily:
                    '"Sora", "Plus Jakarta Sans", system-ui, sans-serif',
                  textShadow: `3px 3px 0px ${branding.colors.accent}40`,
                }}
              >
                Monkayo
              </h2> */}
            </div>

            {/* Subtitle - Refined Typography */}
            {/* <p
              className={`text-xl sm:text-2xl lg:text-3xl max-w-2xl leading-relaxed font-medium transition-all duration-700 delay-300 ${
                isTransitioning
                  ? "opacity-0 translate-y-4"
                  : "opacity-100 translate-y-0"
              }`}
              style={{
                color: branding.colors.textSecondary,
                fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
              }}
            >
              {activeSlide?.subtitle || "Gateway to Progress and Prosperity"}
            </p> */}

            {/* CTA Buttons - Bold and Distinctive */}
            <div
              className={`flex flex-col md:flex-row xs:flex-row flex-wrap gap-3 sm:gap-4 transition-all duration-700 delay-500 ${
                isTransitioning
                  ? "opacity-0 translate-y-4"
                  : "opacity-100 translate-y-0"
              }`}
            >
              <Link
                href="/e-services/new-business"
                className="w-full xs:w-auto lg:w-78"
              >
                <button
                  className="group relative w-full xs:w-auto px-6 py-3.5 sm:px-6 sm:py-3 md:px-7 md:py-3.5 rounded-xl sm:rounded-lg md:rounded-xl font-bold text-base sm:text-base flex items-center justify-center gap-2 transition-all duration-300 overflow-hidden"
                  style={{
                    backgroundColor: branding.colors.primary,
                    color: "white",
                    boxShadow: `0 10px 40px ${branding.colors.primary}40`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-3px)";
                    e.currentTarget.style.boxShadow = `0 15px 50px ${branding.colors.primary}50`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = `0 10px 40px ${branding.colors.primary}40`;
                  }}
                >
                  <span className="relative z-10">Access e-Services</span>
                  <ChevronRight className="h-5 w-5 group-hover:translate-x-2 transition-transform relative z-10" />
                  {/* Animated background shimmer */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${branding.colors.accent}40, transparent)`,
                      animation: "shimmer 2s infinite",
                    }}
                  />
                </button>
              </Link>

              <Link href="/about/history" className="w-full xs:w-auto lg:w-78">
                <button
                  className="w-full xs:w-auto px-6 py-3.5 sm:px-6 sm:py-3 md:px-7 md:py-3.5 rounded-xl sm:rounded-lg md:rounded-xl font-bold text-base sm:text-base border-3 sm:border-3 transition-all duration-300 backdrop-blur-sm"
                  style={{
                    borderColor: branding.colors.primary,
                    color: branding.colors.primary,
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = `${branding.colors.primary}`;
                    e.currentTarget.style.color = "white";
                    e.currentTarget.style.transform = "translateY(-3px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor =
                      "rgba(255, 255, 255, 0.8)";
                    e.currentTarget.style.color = branding.colors.primary;
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  Learn About Monkayo
                </button>
              </Link>
            </div>

            {/* Slide Indicators - Circular with Filipino Pattern */}
            {slides.length > 1 && (
              <div className="flex items-center gap-2 sm:gap-3 md:gap-4 pt-4 sm:pt-6 md:pt-8">
                <div className="flex gap-2 sm:gap-3">
                  {slides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setIsTransitioning(true);
                        setTimeout(() => {
                          setCurrentSlide(index);
                          setIsTransitioning(false);
                        }, 500);
                      }}
                      className="relative group"
                      aria-label={`Go to slide ${index + 1}`}
                    >
                      {/* Outer decorative ring */}
                      <div
                        className={`absolute inset-0 rounded-full transition-all duration-500 ${
                          currentSlide === index
                            ? "scale-150 opacity-50"
                            : "scale-100 opacity-0"
                        }`}
                        style={{
                          border: `2px solid ${branding.colors.accent}`,
                        }}
                      />
                      {/* Inner circle */}
                      <div
                        className="w-3 h-3 sm:w-4 sm:h-4 rounded-full transition-all duration-500 relative"
                        style={{
                          backgroundColor:
                            currentSlide === index
                              ? branding.colors.primary
                              : `${branding.colors.primary}30`,
                          transform:
                            currentSlide === index ? "scale(1.3)" : "scale(1)",
                          boxShadow:
                            currentSlide === index
                              ? `0 0 15px ${branding.colors.accent}`
                              : "none",
                        }}
                      >
                        {currentSlide === index && (
                          <div
                            className="absolute inset-0 rounded-full animate-ping"
                            style={{ backgroundColor: branding.colors.accent }}
                          />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
                <div className="hidden xs:block h-px flex-1 max-w-[60px] sm:max-w-20 md:max-w-[100px] bg-linear-to-r from-stone-300 to-transparent" />
                <span
                  className="text-xs sm:text-sm font-bold"
                  style={{ color: branding.colors.textSecondary }}
                >
                  {String(currentSlide + 1).padStart(2, "0")} /{" "}
                  {String(slides.length).padStart(2, "0")}
                </span>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN - Circular Image with Decorative Frame */}
          <div className="lg:col-span-5 flex items-center justify-center relative mt-8 lg:mt-0">
            <div className="relative w-full max-w-[280px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[600px] aspect-square">
              {/* Decorative Rotating Ring - Outer */}
              <div
                className="absolute inset-[-8%] rounded-full border-2 sm:border-[3px] border-dashed opacity-20 sm:opacity-30 animate-spin-slow"
                style={{ borderColor: branding.colors.accent }}
              />

              {/* Decorative Pattern Ring - Middle */}
              <svg
                className="absolute inset-[-5%] w-[110%] h-[110%] animate-spin-reverse opacity-80 sm:opacity-100"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="50%"
                  cy="50%"
                  r="48%"
                  fill="none"
                  stroke={branding.colors.primary}
                  strokeWidth="1.5"
                  strokeDasharray="8 16"
                  opacity="0.4"
                />
              </svg>

              {/* Main Image Circle with Tropical Overlay */}
              <div className="relative w-full h-full rounded-full overflow-hidden shadow-2xl">
                {activeSlide?.image_url ? (
                  <>
                    <div
                      className={`absolute inset-0 bg-cover bg-center transition-all duration-1000 ${
                        isTransitioning
                          ? "scale-110 opacity-0"
                          : "scale-100 opacity-100"
                      }`}
                      style={{
                        backgroundImage: `url(${activeSlide.image_url})`,
                      }}
                    />
                    {/* Tropical Gradient Overlay */}
                    <div
                      className="absolute inset-0 mix-blend-multiply opacity-30"
                      style={{
                        background: `radial-gradient(circle at 30% 30%, ${branding.colors.accent}80, transparent 70%)`,
                      }}
                    />
                  </>
                ) : (
                  <div
                    className="absolute inset-0 flex items-center justify-center text-8xl font-black"
                    style={{
                      background: `linear-gradient(135deg, ${branding.colors.primary}, ${branding.colors.accent})`,
                      color: "white",
                    }}
                  >
                    M
                  </div>
                )}

                {/* Inner Shadow for Depth */}
                <div className="absolute inset-0 rounded-full shadow-[inset_0_0_60px_rgba(0,0,0,0.3)]" />
              </div>

              {/* Floating Accent Elements */}
              <div
                className="hidden sm:block absolute top-[10%] right-[-5%] w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 rounded-full blur-xl sm:blur-2xl opacity-40 sm:opacity-60 animate-float"
                style={{ backgroundColor: branding.colors.accent }}
              />
              <div
                className="hidden sm:block absolute bottom-[15%] left-[-8%] w-20 sm:w-28 md:w-32 h-20 sm:h-28 md:h-32 rounded-full blur-2xl sm:blur-3xl opacity-30 sm:opacity-40 animate-float-delayed"
                style={{ backgroundColor: branding.colors.primary }}
              />

              {/* Geometric Accent Shapes */}
              <div
                className="hidden md:block absolute top-[5%] left-[5%] w-12 md:w-16 h-12 md:h-16 rotate-45 opacity-15 md:opacity-20 animate-spin-slow"
                style={{
                  background: `linear-gradient(135deg, ${branding.colors.accent}, ${branding.colors.primary})`,
                }}
              />
              <div
                className="hidden md:block absolute bottom-[8%] right-[8%] w-10 md:w-12 h-10 md:h-12 rounded-full opacity-20 md:opacity-30 animate-pulse-slow"
                style={{ backgroundColor: branding.colors.accent }}
              />
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap");

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(200%);
          }
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes spin-reverse {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }

        @keyframes pulse-slow {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.4;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.6;
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) translateX(0px);
          }
          33% {
            transform: translateY(-20px) translateX(10px);
          }
          66% {
            transform: translateY(-10px) translateX(-10px);
          }
        }

        @keyframes float-delayed {
          0%,
          100% {
            transform: translateY(0px) translateX(0px);
          }
          33% {
            transform: translateY(20px) translateX(-10px);
          }
          66% {
            transform: translateY(10px) translateX(10px);
          }
        }

        @keyframes pattern-shift {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(120px, 120px);
          }
        }

        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }

        .animate-spin-reverse {
          animation: spin-reverse 25s linear infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }

        .animate-float {
          animation: float 8s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 10s ease-in-out infinite;
        }

        .animate-pattern-shift {
          animation: pattern-shift 60s linear infinite;
        }
      `}</style>
    </section>
  );
}
