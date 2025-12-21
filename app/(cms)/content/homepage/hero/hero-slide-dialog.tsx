"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { FormDialog } from "@/components/cms/form-dialog";
import { ImageUpload } from "@/components/cms/image-upload";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  createHeroSlide,
  updateHeroSlide,
  uploadHeroSlideImage,
  deleteHeroSlideImage,
} from "@/lib/actions/homepage";
import type { Database } from "@/types/supabase";

type HeroSlide = Database["public"]["Tables"]["hero_slides"]["Row"];

interface HeroSlideDialogProps {
  children: React.ReactNode;
  mode: "create" | "edit";
  slide?: HeroSlide;
}

export function HeroSlideDialog({
  children,
  mode,
  slide,
}: HeroSlideDialogProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: slide?.title || "",
    subtitle: slide?.subtitle || "",
    image_url: slide?.image_url || "",
    link_url: slide?.link_url || "",
    sort_order: slide?.sort_order || 0,
    is_active: slide?.is_active ?? true,
  });

  // Handle image upload
  const handleImageUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const result = await uploadHeroSlideImage(formData);
    return result;
  };

  // Handle image delete
  const handleImageDelete = async (url: string) => {
    const result = await deleteHeroSlideImage(url);
    return result;
  };

  const handleSubmit = async () => {
    // Validation
    if (!formData.image_url) {
      toast.error("Please provide an image");
      return;
    }

    setIsSubmitting(true);
    try {
      if (mode === "create") {
        const result = await createHeroSlide(formData);
        if (result.success) {
          toast.success("Slide created successfully");
          setOpen(false);
          setFormData({
            title: "",
            subtitle: "",
            image_url: "",
            link_url: "",
            sort_order: 0,
            is_active: true,
          });
          router.refresh();
        } else {
          toast.error(result.error || "Failed to create slide");
        }
      } else if (slide) {
        const result = await updateHeroSlide(slide.id, formData);
        if (result.success) {
          toast.success("Slide updated successfully");
          setOpen(false);
          router.refresh();
        } else {
          toast.error(result.error || "Failed to update slide");
        }
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div onClick={() => setOpen(true)}>{children}</div>
      <FormDialog
        open={open}
        onOpenChange={setOpen}
        title={mode === "create" ? "Add New Slide" : "Edit Slide"}
        description={
          mode === "create"
            ? "Create a new hero slide for the homepage carousel."
            : "Update the slide details."
        }
        onSubmit={handleSubmit}
        submitLabel={mode === "create" ? "Create Slide" : "Save Changes"}
        isSubmitting={isSubmitting}
        size="full"
      >
        {/* 2-Column Layout: Image Left (60%), Form Right (40%) */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 py-2">
          {/* Left Column - Image Upload (3 columns = 60%) */}
          <div className="lg:col-span-3 space-y-3">
            <Label className="text-stone-700 dark:text-stone-300 mb-2 block text-base">
              Slide Image *
            </Label>
            <div className="min-h-[400px]">
              <ImageUpload
                value={formData.image_url}
                onChange={(url) => setFormData({ ...formData, image_url: url })}
                onUpload={handleImageUpload}
                onDelete={handleImageDelete}
                aspectRatio="video"
                maxSizeMB={5}
                allowUrl={true}
              />
            </div>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-3">
              Recommended size: 1920x600px for best quality
            </p>
          </div>

          {/* Right Column - Form Fields (2 columns = 40%) */}
          <div className="lg:col-span-2 space-y-5">
            {/* Title */}
            <div>
              <Label
                htmlFor="title"
                className="text-stone-700 dark:text-stone-300"
              >
                Title
              </Label>
              <Input
                id="title"
                placeholder="Enter slide title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="mt-1.5"
              />
            </div>

            {/* Subtitle */}
            <div>
              <Label
                htmlFor="subtitle"
                className="text-stone-700 dark:text-stone-300"
              >
                Subtitle
              </Label>
              <Textarea
                id="subtitle"
                placeholder="Enter slide subtitle or description"
                value={formData.subtitle}
                onChange={(e) =>
                  setFormData({ ...formData, subtitle: e.target.value })
                }
                rows={3}
                className="mt-1.5 resize-none"
              />
            </div>

            {/* Link URL */}
            <div>
              <Label
                htmlFor="link_url"
                className="text-stone-700 dark:text-stone-300"
              >
                Link URL (optional)
              </Label>
              <Input
                id="link_url"
                placeholder="https://example.com/page"
                value={formData.link_url}
                onChange={(e) =>
                  setFormData({ ...formData, link_url: e.target.value })
                }
                className="mt-1.5"
              />
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                Users will be redirected here when clicking the slide
              </p>
            </div>

            {/* Sort Order */}
            <div>
              <Label
                htmlFor="sort_order"
                className="text-stone-700 dark:text-stone-300"
              >
                Sort Order
              </Label>
              <Input
                id="sort_order"
                type="number"
                min={0}
                value={formData.sort_order}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    sort_order: parseInt(e.target.value) || 0,
                  })
                }
                className="mt-1.5 w-32"
              />
            </div>

            {/* Active Status */}
            <div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-stone-700 dark:text-stone-300">
                    Active Status
                  </Label>
                  <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                    Show this slide on the homepage
                  </p>
                </div>
                <Switch
                  checked={formData.is_active}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, is_active: checked })
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </FormDialog>
    </>
  );
}
