"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ExternalLink, Loader2, ImageIcon, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { getOfficialBackgrounds } from "@/lib/actions/about";
import type { ElectedOfficial, OfficialBackground } from "./types";

interface OfficialBackgroundDialogProps {
  official: ElectedOfficial;
  branding: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function OfficialBackgroundDialog({
  official,
  branding,
  open,
  onOpenChange,
}: OfficialBackgroundDialogProps) {
  const [backgrounds, setBackgrounds] = useState<OfficialBackground[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch backgrounds when dialog opens
  useEffect(() => {
    if (open && official.id) {
      setLoading(true);
      setError(null);

      getOfficialBackgrounds(official.id)
        .then((result) => {
          if (result.success && result.data) {
            setBackgrounds(result.data);
          } else {
            setError(result.error || "Failed to load background information");
          }
        })
        .catch((err) => {
          setError("Failed to load background information");
          console.error(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [open, official.id]);

  // Separate featured and regular items
  const featured = backgrounds.find((bg) => bg.is_featured);
  const otherItems = backgrounds.filter((bg) => !bg.is_featured);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-4xl max-h-[90vh] p-0 overflow-hidden"
        style={{
          background: "#FFFFFF",
          borderRadius: "24px",
        }}
      >
        {/* Header with gradient accent */}
        <div
          className="relative px-8 pt-8 pb-6"
          style={{
            background: `linear-gradient(135deg, ${branding.colors.primary}08 0%, ${branding.colors.accent}08 100%)`,
          }}
        >
          <div
            className="absolute top-0 left-0 right-0 h-1"
            style={{
              background: `linear-gradient(90deg, ${branding.colors.primary} 0%, ${branding.colors.accent} 50%, ${branding.colors.secondary} 100%)`,
            }}
          />

          <DialogHeader>
            <div className="flex items-center gap-6">
              {/* Official Portrait Thumbnail */}
              <div
                className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0"
                style={{
                  boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)",
                }}
              >
                {official.picture_url ? (
                  <Image
                    src={official.picture_url}
                    alt={official.name}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                ) : (
                  <div
                    className="w-full h-full flex items-center justify-center"
                    style={{ background: "#f1f5f9" }}
                  >
                    <ImageIcon
                      className="w-8 h-8"
                      style={{ color: branding.colors.primary, opacity: 0.4 }}
                    />
                  </div>
                )}
              </div>

              <div>
                <DialogTitle
                  className="text-2xl font-bold mb-1"
                  style={{
                    color: branding.colors.textPrimary,
                    fontFamily:
                      '"Playfair Display", "Libre Baskerville", Georgia, serif',
                  }}
                >
                  {official.name}
                </DialogTitle>
                <DialogDescription
                  className="text-base font-medium tracking-wide uppercase"
                  style={{
                    color: branding.colors.accent,
                    fontFamily: '"Work Sans", "Inter", system-ui, sans-serif',
                    letterSpacing: "0.05em",
                  }}
                >
                  {official.title}
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>
        </div>

        {/* Content */}
        <ScrollArea className="max-h-[calc(90vh-180px)]">
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-16 px-8"
              >
                <Loader2
                  className="w-10 h-10 animate-spin mb-4"
                  style={{ color: branding.colors.primary }}
                />
                <p
                  className="text-sm"
                  style={{ color: branding.colors.textSecondary }}
                >
                  Loading background information...
                </p>
              </motion.div>
            ) : error ? (
              <motion.div
                key="error"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-16 px-8"
              >
                <p className="text-red-500 text-sm">{error}</p>
              </motion.div>
            ) : backgrounds.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-16 px-8"
              >
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center mb-4"
                  style={{ background: `${branding.colors.primary}10` }}
                >
                  <ImageIcon
                    className="w-10 h-10"
                    style={{ color: branding.colors.primary, opacity: 0.5 }}
                  />
                </div>
                <p
                  className="text-lg font-medium mb-2"
                  style={{ color: branding.colors.textPrimary }}
                >
                  No Background Information
                </p>
                <p
                  className="text-sm text-center max-w-md"
                  style={{ color: branding.colors.textSecondary }}
                >
                  Background and history information for this official is not
                  yet available.
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="content"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                {/* All Background Items - Full Width */}
                {backgrounds.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                    className="relative"
                  >
                    {/* Featured Badge */}
                    {item.is_featured && (
                      <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm shadow-sm">
                        <Star
                          className="w-4 h-4"
                          style={{ color: branding.colors.accent }}
                          fill={branding.colors.accent}
                        />
                        <span
                          className="text-xs font-semibold uppercase tracking-wide"
                          style={{ color: branding.colors.accent }}
                        >
                          Featured
                        </span>
                      </div>
                    )}

                    {/* Full Width Image */}
                    <div className="relative w-full">
                      <Image
                        src={item.image_url}
                        alt={item.title}
                        width={1200}
                        height={800}
                        className="w-full h-auto object-contain"
                        unoptimized
                      />
                    </div>

                    {/* Title and Caption */}
                    <div className="px-6 py-4 bg-white">
                      <h3
                        className="text-xl font-bold mb-2"
                        style={{
                          color: branding.colors.textPrimary,
                          fontFamily: '"Playfair Display", Georgia, serif',
                        }}
                      >
                        {item.title}
                      </h3>
                      {item.caption && (
                        <p
                          className="text-sm leading-relaxed mb-3"
                          style={{ color: branding.colors.textSecondary }}
                        >
                          {item.caption}
                        </p>
                      )}
                      {item.link_url && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="gap-2"
                          onClick={() => window.open(item.link_url!, "_blank")}
                          style={{
                            borderColor: branding.colors.primary,
                            color: branding.colors.primary,
                          }}
                        >
                          <ExternalLink className="w-4 h-4" />
                          Learn More
                        </Button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
