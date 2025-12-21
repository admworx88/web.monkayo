"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { useBranding } from "@/lib/context/branding-context";

interface FAQItem {
  id: string;
  question: string | null;
  answer: string | null;
  sort_order: number;
}

interface MinimalFAQProps {
  items: FAQItem[];
}

export function MinimalFAQ({ items }: MinimalFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { branding } = useBranding();

  if (items.length === 0) {
    return null;
  }

  return (
    <section className="py-24 bg-stone-50 relative overflow-hidden">
      {/* Subtle pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, ${branding.colors.primary} 1px, transparent 0)`,
          backgroundSize: '48px 48px'
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p
            className="text-sm font-semibold uppercase tracking-wider mb-4"
            style={{ color: branding.colors.primary }}
          >
            Frequently Asked Questions
          </p>
          <h2
            className="text-4xl sm:text-5xl font-bold mb-6"
            style={{
              color: branding.colors.textPrimary,
              fontFamily: '"DM Serif Display", Georgia, serif'
            }}
          >
            Have Questions?
          </h2>
          <p
            className="text-lg leading-relaxed"
            style={{
              color: branding.colors.textSecondary,
              fontFamily: '"Instrument Sans", system-ui, sans-serif'
            }}
          >
            Find answers to common questions about our services and processes
          </p>
        </div>

        {/* FAQ accordion */}
        <div className="max-w-4xl mx-auto space-y-4">
          {items.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl border-2 overflow-hidden transition-all duration-300"
                style={{
                  borderColor: isOpen ? branding.colors.primary : '#f5f5f4',
                  animation: `fadeInUp 0.4s ease-out ${index * 0.05}s both`
                }}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full p-6 sm:p-8 flex items-start gap-6 text-left transition-colors duration-300"
                  style={{
                    backgroundColor: isOpen ? `${branding.colors.primary}05` : 'white'
                  }}
                >
                  {/* Icon */}
                  <div
                    className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300"
                    style={{
                      backgroundColor: isOpen ? branding.colors.primary : `${branding.colors.primary}15`,
                      transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)'
                    }}
                  >
                    {isOpen ? (
                      <Minus className="h-5 w-5 text-white" />
                    ) : (
                      <Plus className="h-5 w-5" style={{ color: branding.colors.primary }} />
                    )}
                  </div>

                  {/* Question */}
                  <div className="flex-1">
                    <h3
                      className="text-lg sm:text-xl font-bold leading-tight"
                      style={{
                        color: isOpen ? branding.colors.primary : branding.colors.textPrimary,
                        fontFamily: '"Instrument Sans", system-ui, sans-serif'
                      }}
                    >
                      {item.question}
                    </h3>
                  </div>
                </button>

                {/* Answer */}
                <div
                  className="overflow-hidden transition-all duration-300"
                  style={{
                    maxHeight: isOpen ? '1000px' : '0'
                  }}
                >
                  <div className="px-6 sm:px-8 pb-6 sm:pb-8 pl-[5.5rem]">
                    <div
                      className="prose prose-sm max-w-none leading-relaxed"
                      style={{
                        color: branding.colors.textSecondary,
                        fontFamily: '"Instrument Sans", system-ui, sans-serif'
                      }}
                      dangerouslySetInnerHTML={{ __html: item.answer || '' }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
