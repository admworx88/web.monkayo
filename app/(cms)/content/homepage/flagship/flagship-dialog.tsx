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
  createFlagshipProgram,
  updateFlagshipProgram,
  uploadFlagshipProgramImage,
  deleteFlagshipProgramImage,
} from "@/lib/actions/homepage";
import type { Database } from "@/types/supabase";

type FlagshipProgram = Database["public"]["Tables"]["flagship_programs"]["Row"];

interface FlagshipDialogProps {
  children: React.ReactNode;
  mode: "create" | "edit";
  program?: FlagshipProgram;
}

export function FlagshipDialog({
  children,
  mode,
  program,
}: FlagshipDialogProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: program?.title || "",
    description: program?.description || "",
    image_url: program?.image_url || "",
    link_url: program?.link_url || "",
    sort_order: program?.sort_order || 0,
    is_active: program?.is_active ?? true,
  });

  // Handle image upload
  const handleImageUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const result = await uploadFlagshipProgramImage(formData);
    return result;
  };

  // Handle image delete
  const handleImageDelete = async (url: string) => {
    const result = await deleteFlagshipProgramImage(url);
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
        const result = await createFlagshipProgram(formData);
        if (result.success) {
          toast.success("Program created successfully");
          setOpen(false);
          setFormData({
            title: "",
            description: "",
            image_url: "",
            link_url: "",
            sort_order: 0,
            is_active: true,
          });
          router.refresh();
        } else {
          toast.error(result.error || "Failed to create program");
        }
      } else if (program) {
        const result = await updateFlagshipProgram(program.id, formData);
        if (result.success) {
          toast.success("Program updated successfully");
          setOpen(false);
          router.refresh();
        } else {
          toast.error(result.error || "Failed to update program");
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
        title={mode === "create" ? "Add New Program" : "Edit Program"}
        description={
          mode === "create"
            ? "Create a new flagship program to showcase on the homepage."
            : "Update the program details."
        }
        onSubmit={handleSubmit}
        submitLabel={mode === "create" ? "Create Program" : "Save Changes"}
        isSubmitting={isSubmitting}
        size="full"
      >
        {/* 2-Column Layout: Image Left (60%), Form Right (40%) */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 py-2">
          {/* Left Column - Image Upload (3 columns = 60%) */}
          <div className="lg:col-span-3 space-y-3">
            <Label className="text-stone-700 dark:text-stone-300 mb-2 block text-base">
              Program Image *
            </Label>
            <div className="min-h-[400px]">
              <ImageUpload
                value={formData.image_url}
                onChange={(url) => setFormData({ ...formData, image_url: url })}
                onUpload={handleImageUpload}
                onDelete={handleImageDelete}
                aspectRatio="square"
                maxSizeMB={10}
                allowUrl={true}
              />
            </div>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-3">
              Recommended size: 800x800px for best quality
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
                Title (optional)
              </Label>
              <Input
                id="title"
                placeholder="Enter program name"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="mt-1.5"
              />
            </div>

            {/* Description */}
            <div>
              <Label
                htmlFor="description"
                className="text-stone-700 dark:text-stone-300"
              >
                Description (optional)
              </Label>
              <Textarea
                id="description"
                placeholder="Enter short program description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
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
                placeholder="https://example.com/program-details"
                value={formData.link_url}
                onChange={(e) =>
                  setFormData({ ...formData, link_url: e.target.value })
                }
                className="mt-1.5"
              />
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                Users will be redirected here when clicking the program
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
                    Show this program on the homepage
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
