"use client";

import { useState } from "react";
import Image from "next/image";
import { Users } from "lucide-react";
import { motion } from "framer-motion";
import type { OfficialCardProps } from "./types";
import { getCardWidthClass } from "./utils";
import { OfficialBackgroundDialog } from "./official-background-dialog";

/**
 * Official Card Component - Government Professional Design
 * Inspired by official government portraits with yellow/gold accent background
 * Features smooth hover animations and clean typography
 */
export function OfficialCard({
  official,
  size,
  branding,
  index,
  onHoverStart,
  onHoverEnd,
}: OfficialCardProps) {
  const [isCardHovered, setIsCardHovered] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const widthClass = getCardWidthClass(size);

  // Portrait sizes - optimized for visibility
  const portraitSize = size === "large" ? 320 : size === "medium" ? 280 : 240;
  const yellowBoxSize = size === "large" ? 340 : size === "medium" ? 300 : 260;

  return (
    <motion.div
      className={`official-card-container ${widthClass}`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.1,
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      }}
      onHoverStart={() => onHoverStart?.(official.id)}
      onHoverEnd={() => onHoverEnd?.()}
    >
      <motion.div
        className="relative group cursor-pointer"
        whileHover={{ y: -12, scale: 1.02 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        onHoverStart={() => setIsCardHovered(true)}
        onHoverEnd={() => setIsCardHovered(false)}
        onClick={() => setIsDialogOpen(true)}
      >
        {/* Electric Border Effect */}
        <div
          className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ zIndex: 10 }}
        >
          <div
            className="absolute inset-0 rounded-3xl animate-electric-flow"
            style={{
              background: `linear-gradient(
                90deg,
                ${branding.colors.primary},
                ${branding.colors.accent},
                ${branding.colors.secondary},
                ${branding.colors.accent},
                ${branding.colors.primary}
              )`,
              backgroundSize: "200% 100%",
              padding: "3px",
              WebkitMask:
                "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              WebkitMaskComposite: "xor",
              maskComposite: "exclude",
            }}
          />
          <style jsx>{`
            @keyframes electric-flow {
              0% {
                background-position: 0% 0%;
                filter: brightness(1)
                  drop-shadow(0 0 2px ${branding.colors.accent});
              }
              50% {
                background-position: 100% 0%;
                filter: brightness(1.3)
                  drop-shadow(0 0 8px ${branding.colors.accent});
              }
              100% {
                background-position: 200% 0%;
                filter: brightness(1)
                  drop-shadow(0 0 2px ${branding.colors.accent});
              }
            }
            .animate-electric-flow {
              animation: electric-flow 2s linear infinite;
            }

            @media (prefers-reduced-motion: reduce) {
              .animate-electric-flow {
                animation: none !important;
              }
            }
          `}</style>
        </div>

        {/* Main Card */}
        <div
          className="relative overflow-hidden flex flex-col"
          style={{
            background: "#FFFFFF",
            borderRadius: "24px",
            padding:
              size === "large"
                ? "56px 44px 44px"
                : size === "medium"
                ? "52px 40px 40px"
                : "48px 36px 36px",
            boxShadow:
              "0 4px 20px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.06)",
            minHeight:
              size === "large"
                ? "580px"
                : size === "medium"
                ? "540px"
                : "500px",
          }}
        >
          {/* Animated Shadow on Hover */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              borderRadius: "24px",
              boxShadow:
                "0 20px 60px rgba(245, 197, 24, 0.3), 0 8px 24px rgba(0, 56, 168, 0.15)",
              opacity: 0,
            }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          />

          {/* Subtle Top Border Accent - Philippine Flag Colors */}
          <div
            className="absolute top-0 left-0 right-0 h-1"
            style={{
              background: `linear-gradient(90deg, ${branding.colors.primary} 0%, ${branding.colors.accent} 50%, ${branding.colors.secondary} 100%)`,
              borderTopLeftRadius: "24px",
              borderTopRightRadius: "24px",
            }}
          />

          {/* Background Pattern - Philippine-inspired geometric design */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern
                  id={`card-bg-pattern-${official.id}`}
                  x="0"
                  y="0"
                  width="120"
                  height="120"
                  patternUnits="userSpaceOnUse"
                >
                  {/* Central diamond */}
                  <path
                    d="M 60 20 L 100 60 L 60 100 L 20 60 Z"
                    fill="none"
                    stroke={branding.colors.primary}
                    strokeWidth="2"
                  />
                  {/* Inner circle */}
                  <circle
                    cx="60"
                    cy="60"
                    r="20"
                    fill="none"
                    stroke={branding.colors.accent}
                    strokeWidth="1.5"
                  />
                  {/* Corner decorations */}
                  <circle
                    cx="0"
                    cy="0"
                    r="3"
                    fill={branding.colors.secondary}
                    opacity="0.4"
                  />
                  <circle
                    cx="120"
                    cy="0"
                    r="3"
                    fill={branding.colors.secondary}
                    opacity="0.4"
                  />
                  <circle
                    cx="0"
                    cy="120"
                    r="3"
                    fill={branding.colors.secondary}
                    opacity="0.4"
                  />
                  <circle
                    cx="120"
                    cy="120"
                    r="3"
                    fill={branding.colors.secondary}
                    opacity="0.4"
                  />
                  {/* Connecting lines */}
                  <path
                    d="M 40 40 L 80 40 L 80 80 L 40 80 Z"
                    fill="none"
                    stroke={branding.colors.primary}
                    strokeWidth="1"
                    opacity="0.3"
                  />
                </pattern>
              </defs>
              <rect
                width="100%"
                height="100%"
                fill={`url(#card-bg-pattern-${official.id})`}
              />
            </svg>
          </div>

          {/* Portrait Section with Yellow Background */}
          <div
            className="flex justify-center mb-8 relative"
            style={{ zIndex: 1 }}
          >
            {/* Yellow/Gold Background Shape */}
            <div
              className="absolute"
              style={{
                width: `${yellowBoxSize}px`,
                height: `${yellowBoxSize}px`,
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: -1,
              }}
            >
              <motion.div
                className="w-full h-full"
                style={{
                  background:
                    "linear-gradient(135deg, #FCD116 0%, #F5C518 50%, #E5B517 100%)",
                  borderRadius: "20px",
                  transformOrigin: "center center",
                }}
                animate={
                  isCardHovered
                    ? { scale: 1.05, rotate: 2 }
                    : { scale: 1, rotate: 0 }
                }
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Subtle Pattern Overlay */}
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    borderRadius: "20px",
                    backgroundImage: `
                    repeating-linear-gradient(
                      45deg,
                      transparent,
                      transparent 10px,
                      rgba(255, 255, 255, 0.5) 10px,
                      rgba(255, 255, 255, 0.5) 11px
                    )
                  `,
                  }}
                />
              </motion.div>
            </div>

            {/* Portrait Image Container */}
            <motion.div
              className="relative overflow-hidden"
              style={{
                width: `${portraitSize}px`,
                height: `${portraitSize}px`,
                borderRadius: "16px",
                background: "#ffffff",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)",
                zIndex: 1,
              }}
              whileHover={{
                scale: 1.03,
                boxShadow: "0 12px 48px rgba(0, 0, 0, 0.18)",
              }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Government Logo Watermark Background */}
              {branding.logos?.header && (
                <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                  <motion.div
                    className="relative"
                    style={{ width: "140%", height: "140%" }}
                    animate={
                      isCardHovered
                        ? { scale: 1.5, opacity: 1 }
                        : { scale: 1.2, opacity: 0.3 }
                    }
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Image
                      src={branding.logos.header}
                      alt="Government seal"
                      fill
                      className="object-contain opacity-15"
                      sizes="400px"
                      unoptimized
                    />
                  </motion.div>
                </div>
              )}

              {/* Portrait Image - stays on top */}
              {official.picture_url ? (
                <Image
                  src={official.picture_url}
                  alt={official.name}
                  fill
                  className="object-cover relative z-10"
                  unoptimized
                  sizes={`${portraitSize}px`}
                  style={{
                    filter: "contrast(1.05) saturate(1.1)",
                  }}
                />
              ) : (
                <div
                  className="w-full h-full flex items-center justify-center relative z-10"
                  style={{ background: "#f8fafc" }}
                >
                  <Users
                    className="w-1/3 h-1/3 opacity-30"
                    style={{ color: branding.colors.primary }}
                  />
                </div>
              )}
            </motion.div>
          </div>

          {/* Content Section - grows to fill space */}
          <div className="flex-grow flex flex-col justify-start">
            {/* Name */}
            <motion.h3
              className={`text-center font-bold mb-3 leading-tight px-2 ${
                size === "large"
                  ? "text-[2.25rem]"
                  : size === "medium"
                  ? "text-[2rem]"
                  : "text-[1.75rem]"
              }`}
            style={{
              color: "#1a1a1a",
              fontFamily:
                '"Playfair Display", "Libre Baskerville", Georgia, serif',
              letterSpacing: "-0.02em",
              fontWeight: 700,
              lineHeight: 1.2,
              position: "relative",
              zIndex: 2,
            }}
            whileHover={{
              color: branding.colors.primary,
              scale: 1.02,
            }}
            transition={{ duration: 0.3 }}
          >
            {official.name}
          </motion.h3>

          {/* Title */}
          <motion.p
            className="text-center font-semibold mb-4 tracking-wide px-4"
            style={{
              color: "#F5C518",
              fontFamily: '"Work Sans", "Inter", system-ui, sans-serif',
              fontSize:
                size === "large"
                  ? "1.125rem"
                  : size === "medium"
                  ? "1rem"
                  : "0.9375rem",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              fontWeight: 600,
              textShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
              position: "relative",
              zIndex: 2,
            }}
            whileHover={{
              color: branding.colors.secondary,
              letterSpacing: "0.1em",
            }}
            transition={{ duration: 0.3 }}
          >
            {official.title}
            </motion.p>
          </div>

          {/* Term Dates */}
          {/* <motion.p
            className="text-center text-sm"
            style={{
              color: "#6b7280",
              fontFamily: '"Work Sans", "Inter", system-ui, sans-serif',
              fontSize: size === "large" ? "0.9375rem" : "0.875rem",
              letterSpacing: "0.025em",
              fontWeight: 500,
              position: "relative",
              zIndex: 2,
            }}
            whileHover={{
              color: "#374151",
            }}
            transition={{ duration: 0.3 }}
          >
            {formatTerm(official.term_start, official.term_end)}
          </motion.p> */}

          {/* Decorative Bottom Element */}
          <motion.div
            className="mt-6 mx-auto"
            style={{
              width: "80px",
              height: "3px",
              background:
                "linear-gradient(90deg, transparent, #F5C518, transparent)",
              borderRadius: "2px",
              opacity: 0,
            }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          />
        </div>

        {/* Glow Effect on Hover */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            borderRadius: "24px",
            background:
              "radial-gradient(circle at 50% 30%, rgba(245, 197, 24, 0.2), transparent 70%)",
            opacity: 0,
            zIndex: -1,
          }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        />
      </motion.div>

      {/* Background History Dialog */}
      <OfficialBackgroundDialog
        official={official}
        branding={branding}
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      />
    </motion.div>
  );
}
