"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Clock } from "lucide-react";
import { useBranding } from "@/lib/context/branding-context";
import { useScrollDirection } from "@/hooks/use-scroll-direction";
import { cn } from "@/lib/utils";

interface PublicTopBarProps {
  text?: string;
  showDateTime?: boolean;
}

export function PublicTopBar({
  text = "The official website of the Municipality of Monkayo, Davao De Oro",
  showDateTime = true,
}: PublicTopBarProps) {
  const { branding } = useBranding();
  const { isVisible } = useScrollDirection(10);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isMounted, setIsMounted] = useState(false);

  // Update time every second for ticking effect and set mounted flag
  useEffect(() => {
    // Mark as mounted to avoid hydration mismatch
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);

    // Start ticking timer
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // Update every second

    return () => clearInterval(timer);
  }, []);

  // Format date and time for display
  const formattedDateTime = currentTime.toLocaleString("en-PH", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
    timeZone: "Asia/Manila",
  });

  return (
    <aside
      role="banner"
      aria-label="Site information"
      className={cn(
        // Position and layout
        "fixed left-0 right-0 top-0 z-50",
        "px-4 py-2.5 sm:py-3",

        // Transition and animation
        "transition-transform duration-300 ease-in-out",
        isVisible ? "translate-y-0" : "-translate-y-full",

        // Shadow
        "shadow-sm"
      )}
      style={{
        backgroundColor: branding.colors.accent,
        color: branding.colors.textPrimary,
      }}
    >
      <div className="container mx-auto z-10 px-2 sm:px-4">
        <div className="flex flex-row items-center justify-between gap-2 sm:gap-4">
          {/* Official message - Hidden on very small screens */}
          <span className="hidden xs:inline text-[10px] xs:text-xs sm:text-sm italic font-medium text-left text-stone-100 flex-1 leading-tight">
            {text}
          </span>

          {/* Date and time display with flag */}
          {showDateTime && isMounted && (
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              <time
                dateTime={currentTime.toISOString()}
                className="text-[10px] xs:text-xs sm:text-sm font-medium flex items-center gap-1 sm:gap-1.5 tabular-nums text-stone-100"
                aria-label={`Current time: ${formattedDateTime}`}
              >
                <Clock className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:hidden" aria-hidden="true" />
                <span className="hidden md:inline">{formattedDateTime}</span>
                <span className="md:hidden">
                  {currentTime.toLocaleString("en-PH", {
                    month: "short",
                    day: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
                    timeZone: "Asia/Manila",
                  })}
                </span>
              </time>

              {/* Divider */}
              <div className="h-4 sm:h-5 md:h-6 w-px bg-white/30" aria-hidden="true" />

              {/* Philippine Flag */}
              <div className="relative h-4 w-6 sm:h-5 sm:w-8 md:h-6 md:w-10">
                <Image
                  src="https://flagcdn.com/ph.svg"
                  alt="Philippine Flag"
                  fill
                  className="object-cover rounded-sm"
                  unoptimized
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
