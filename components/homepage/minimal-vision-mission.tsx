"use client";

import { useBranding } from "@/lib/context/branding-context";
import { Eye, Target, Zap } from "lucide-react";

interface VisionMissionData {
  id?: string;
  vision: string | null;
  mission: string | null;
  goals: string | null;
}

interface MinimalVisionMissionProps {
  data: VisionMissionData | null;
}

export function MinimalVisionMission({ data }: MinimalVisionMissionProps) {
  const { branding } = useBranding();

  if (!data || (!data.vision && !data.mission && !data.goals)) {
    return null;
  }

  const sections = [
    {
      icon: Eye,
      title: "Vision",
      content: data.vision,
      color: branding.colors.primary
    },
    {
      icon: Target,
      title: "Mission",
      content: data.mission,
      color: branding.colors.secondary
    },
    {
      icon: Zap,
      title: "Goals",
      content: data.goals,
      color: branding.colors.accent
    }
  ].filter(section => section.content);

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Decorative elements */}
      <div
        className="absolute top-0 left-0 w-96 h-96 rounded-full blur-3xl opacity-5"
        style={{ backgroundColor: branding.colors.primary }}
      />
      <div
        className="absolute bottom-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-5"
        style={{ backgroundColor: branding.colors.accent }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p
            className="text-sm font-semibold uppercase tracking-wider mb-4"
            style={{ color: branding.colors.primary }}
          >
            Our Commitment
          </p>
          <h2
            className="text-4xl sm:text-5xl font-bold mb-6"
            style={{
              color: branding.colors.textPrimary,
              fontFamily: '"DM Serif Display", Georgia, serif'
            }}
          >
            Building Tomorrow, Together
          </h2>
          <p
            className="text-lg leading-relaxed"
            style={{
              color: branding.colors.textSecondary,
              fontFamily: '"Instrument Sans", system-ui, sans-serif'
            }}
          >
            Guided by our vision, driven by our mission, focused on our goals
          </p>
        </div>

        {/* Content cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {sections.map((section, index) => {
            const Icon = section.icon;
            return (
              <div
                key={section.title}
                className="group"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.15}s both`
                }}
              >
                <div className="relative h-full">
                  {/* Card */}
                  <div className="bg-stone-50 rounded-2xl p-8 h-full transition-all duration-300 hover:shadow-lg">
                    {/* Icon */}
                    <div
                      className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 transition-transform duration-300 group-hover:scale-110"
                      style={{
                        backgroundColor: `${section.color}15`
                      }}
                    >
                      <Icon className="h-8 w-8" style={{ color: section.color }} />
                    </div>

                    {/* Title */}
                    <h3
                      className="text-2xl font-bold mb-4"
                      style={{
                        color: branding.colors.textPrimary,
                        fontFamily: '"DM Serif Display", Georgia, serif'
                      }}
                    >
                      {section.title}
                    </h3>

                    {/* Content */}
                    <div
                      className="prose prose-sm max-w-none leading-relaxed"
                      style={{
                        color: branding.colors.textSecondary,
                        fontFamily: '"Instrument Sans", system-ui, sans-serif'
                      }}
                      dangerouslySetInnerHTML={{ __html: section.content || '' }}
                    />
                  </div>

                  {/* Hover accent line */}
                  <div
                    className="absolute top-0 left-0 w-1 h-0 group-hover:h-full transition-all duration-500 rounded-l-2xl"
                    style={{ backgroundColor: section.color }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
