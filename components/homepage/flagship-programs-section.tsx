"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import type { Database } from "@/types/supabase";

type FlagshipProgram = Database["public"]["Tables"]["flagship_programs"]["Row"];

interface FlagshipProgramsSectionProps {
  programs: FlagshipProgram[];
}

export function FlagshipProgramsSection({ programs }: FlagshipProgramsSectionProps) {
  if (!programs || programs.length === 0) return null;

  return (
    <section className="relative py-24 lg:py-32 bg-gradient-to-b from-white via-stone-50/30 to-white overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute top-20 right-0 w-96 h-96 bg-[#0038a8] rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-0 w-96 h-96 bg-[#fcd116] rounded-full blur-3xl" />
      </div>

      {/* Geometric Accent Lines */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#0038a8] to-transparent opacity-20" />
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#ce1126] to-transparent opacity-20" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center mb-16 lg:mb-20"
        >
          {/* Decorative Top Element */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#0038a8]" />
            <div className="w-2 h-2 bg-[#fcd116] rotate-45" />
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#0038a8]" />
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
            <span className="bg-gradient-to-r from-[#0038a8] via-[#0038a8] to-[#ce1126] bg-clip-text text-transparent">
              Flagship Programs
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-stone-600 max-w-2xl mx-auto leading-relaxed">
            Government Initiatives Making a Difference
          </p>
        </motion.div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {programs.map((program, index) => (
            <ProgramCard key={program.id} program={program} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

interface ProgramCardProps {
  program: FlagshipProgram;
  index: number;
}

function ProgramCard({ program, index }: ProgramCardProps) {
  const hasLink = !!program.link_url;

  const CardWrapper = hasLink ? "a" : "div";
  const cardProps = hasLink
    ? {
        href: program.link_url!,
        target: "_blank",
        rel: "noopener noreferrer",
      }
    : {};

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.25, 0.4, 0.25, 1],
      }}
      className="group relative"
    >
      <CardWrapper
        {...cardProps}
        className={`
          block relative overflow-hidden rounded-2xl
          bg-white shadow-lg shadow-stone-200/50
          transition-all duration-500 ease-out
          ${hasLink ? "cursor-pointer" : ""}
        `}
      >
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden">
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110"
            style={{ backgroundImage: `url(${program.image_url})` }}
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0038a8]/95 via-[#0038a8]/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

          {/* Diagonal Accent */}
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#fcd116]/30 to-transparent transform translate-x-4 -translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-500" />

          {/* Content Overlay */}
          <div className="absolute inset-0 p-6 flex flex-col justify-end">
            {/* Title */}
            {program.title && (
              <h3 className="text-white font-bold text-xl sm:text-2xl mb-2 leading-tight drop-shadow-lg transform group-hover:translate-y-0 transition-transform duration-500">
                {program.title}
              </h3>
            )}

            {/* Description */}
            {program.description && (
              <p className="text-white/90 text-sm leading-relaxed line-clamp-2 drop-shadow-md transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                {program.description}
              </p>
            )}

            {/* Link Indicator */}
            {hasLink && (
              <div className="mt-3 inline-flex items-center gap-1.5 text-[#fcd116] text-sm font-medium transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-150">
                <span>Learn More</span>
                <ExternalLink className="w-4 h-4" />
              </div>
            )}
          </div>

          {/* Hover Border Effect */}
          <div className="absolute inset-0 border-2 border-[#fcd116]/0 group-hover:border-[#fcd116]/50 transition-all duration-500 rounded-2xl" />
        </div>

        {/* Bottom Accent Bar */}
        <div className="h-1.5 bg-gradient-to-r from-[#0038a8] via-[#fcd116] to-[#ce1126] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
      </CardWrapper>

      {/* Card Shadow Enhancement */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#0038a8]/5 via-transparent to-[#fcd116]/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-2" />
    </motion.div>
  );
}
