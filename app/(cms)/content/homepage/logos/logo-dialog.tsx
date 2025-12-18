"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Award } from "lucide-react";

import { FormDialog } from "@/components/cms/form-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { createPartnerLogo, updatePartnerLogo } from "@/lib/actions/homepage";
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

  const handleSubmit = async () => {
    if (!formData.name.trim()) {
      toast.error("Partner name is required");
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
        size="md"
      >
        <div className="space-y-5">
          {/* Preview */}
          <div>
            <Label className="text-stone-700">Logo Preview</Label>
            <div className="mt-2 flex items-start gap-4">
              <div className="relative h-20 w-32 rounded-lg overflow-hidden bg-stone-100 ring-1 ring-stone-200 flex items-center justify-center flex-shrink-0">
                {formData.image_url ? (
                  <img
                    src={formData.image_url}
                    alt="Preview"
                    className="h-full w-full object-contain p-2"
                  />
                ) : (
                  <Award className="h-8 w-8 text-stone-400" />
                )}
              </div>
              <div className="flex-1 space-y-2">
                <Input
                  placeholder="https://example.com/logo.png"
                  value={formData.image_url}
                  onChange={(e) =>
                    setFormData({ ...formData, image_url: e.target.value })
                  }
                />
                <p className="text-xs text-stone-500">
                  Enter a logo image URL. PNG with transparent background recommended.
                </p>
              </div>
            </div>
          </div>

          {/* Name */}
          <div>
            <Label htmlFor="name" className="text-stone-700">
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

          {/* Link URL */}
          <div>
            <Label htmlFor="link_url" className="text-stone-700">
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
          </div>

          {/* Sort Order and Status */}
          <div className="flex items-center gap-6">
            <div className="w-32">
              <Label htmlFor="sort_order" className="text-stone-700">
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
                className="mt-1.5"
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-stone-700">Active Status</Label>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Show on the homepage
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
