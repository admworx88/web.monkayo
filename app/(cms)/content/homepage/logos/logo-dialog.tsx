"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { FormDialog } from "@/components/cms/form-dialog";
import { ImageUpload } from "@/components/cms/image-upload";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  createPartnerLogo,
  updatePartnerLogo,
  uploadPartnerLogoImage,
  deletePartnerLogoImage,
} from "@/lib/actions/homepage";
import type { Database } from "@/types/supabase";

type LogoSection = Database["public"]["Tables"]["logo_section"]["Row"];

interface LogoDialogProps {
  children: React.ReactNode;
  mode: "create" | "edit";
  logo?: LogoSection;
}

export function LogoDialog({ children, mode, logo }: LogoDialogProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: logo?.name || "",
    image_url: logo?.image_url || "",
    link_url: logo?.link_url || "",
    sort_order: logo?.sort_order || 0,
    is_active: logo?.is_active ?? true,
  });

  // Handle image upload
  const handleImageUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const result = await uploadPartnerLogoImage(formData);
    return result;
  };

  // Handle image delete
  const handleImageDelete = async (url: string) => {
    const result = await deletePartnerLogoImage(url);
    return result;
  };

  const handleSubmit = async () => {
    if (!formData.name.trim()) {
      toast.error("Partner name is required");
      return;
    }

    if (!formData.image_url) {
      toast.error("Please provide a logo image");
      return;
    }

    setIsSubmitting(true);
    try {
      if (mode === "create") {
        const result = await createPartnerLogo(formData);
        if (result.success) {
          toast.success("Logo added successfully");
          setOpen(false);
          setFormData({
            name: "",
            image_url: "",
            link_url: "",
            sort_order: 0,
            is_active: true,
          });
          router.refresh();
        } else {
          toast.error(result.error || "Failed to add logo");
        }
      } else if (logo) {
        const result = await updatePartnerLogo(logo.id, formData);
        if (result.success) {
          toast.success("Logo updated successfully");
          setOpen(false);
          router.refresh();
        } else {
          toast.error(result.error || "Failed to update logo");
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
        title={mode === "create" ? "Add Partner Logo" : "Edit Partner Logo"}
        description={
          mode === "create"
            ? "Add a partner or government agency logo."
            : "Update the logo details."
        }
        onSubmit={handleSubmit}
        submitLabel={mode === "create" ? "Add Logo" : "Save Changes"}
        isSubmitting={isSubmitting}
        size="lg"
      >
        {/* 2-Column Layout: Image Left, Form Right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 py-2">
          {/* Left Column - Image Upload */}
          <div className="space-y-3">
            <Label className="text-stone-700 dark:text-stone-300 mb-2 block text-base">
              Logo Image *
            </Label>
            <div className="w-72 h-72 mx-auto">
              <ImageUpload
                value={formData.image_url}
                onChange={(url) => setFormData({ ...formData, image_url: url })}
                onUpload={handleImageUpload}
                onDelete={handleImageDelete}
                aspectRatio="square"
                maxSizeMB={5}
                allowUrl={true}
              />
            </div>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-15 text-center">
              Recommended: PNG with transparent background, 200x200px or
              500x500px
            </p>
          </div>

          {/* Right Column - Form Fields */}
          <div className="space-y-5">
            {/* Partner Name */}
            <div>
              <Label
                htmlFor="name"
                className="text-stone-700 dark:text-stone-300"
              >
                Partner Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                placeholder="e.g., Department of Interior and Local Government"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="mt-1.5"
              />
            </div>

            {/* Website Link */}
            <div>
              <Label
                htmlFor="link_url"
                className="text-stone-700 dark:text-stone-300"
              >
                Website Link (optional)
              </Label>
              <Input
                id="link_url"
                placeholder="https://example.gov.ph"
                value={formData.link_url}
                onChange={(e) =>
                  setFormData({ ...formData, link_url: e.target.value })
                }
                className="mt-1.5"
              />
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                Users will be redirected here when clicking the logo
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
                    Show this logo on the homepage
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
