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
  createElectedOfficial,
  updateElectedOfficial,
  uploadOfficialImage,
  deleteOfficialImage,
} from "@/lib/actions/about";
import type { Database } from "@/types/supabase";

type ElectedOfficial = Database["public"]["Tables"]["elected_officials"]["Row"];

interface OfficialDialogProps {
  children: React.ReactNode;
  mode: "create" | "edit";
  initialData?: ElectedOfficial;
}

export function OfficialDialog({
  children,
  mode,
  initialData,
}: OfficialDialogProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    title: initialData?.title || "",
    picture_url: initialData?.picture_url || "",
    term_start: initialData?.term_start || "",
    term_end: initialData?.term_end || "",
    sort_order: initialData?.sort_order || 0,
    is_active: initialData?.is_active ?? true,
  });

  // Handle image upload
  const handleImageUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const result = await uploadOfficialImage(formData);
    return result;
  };

  // Handle image delete
  const handleImageDelete = async (url: string) => {
    const result = await deleteOfficialImage(url);
    return result;
  };

  const handleSubmit = async () => {
    if (!formData.name.trim()) {
      toast.error("Name is required");
      return;
    }

    if (!formData.title.trim()) {
      toast.error("Title is required");
      return;
    }

    setIsSubmitting(true);
    try {
      if (mode === "create") {
        const result = await createElectedOfficial({
          name: formData.name,
          title: formData.title,
          picture_url: formData.picture_url || null,
          term_start: formData.term_start || null,
          term_end: formData.term_end || null,
          sort_order: formData.sort_order,
          is_active: formData.is_active,
        });
        if (result.success) {
          toast.success("Elected official created successfully");
          setOpen(false);
          setFormData({
            name: "",
            title: "",
            picture_url: "",
            term_start: "",
            term_end: "",
            sort_order: 0,
            is_active: true,
          });
          router.refresh();
        } else {
          toast.error(result.error || "Failed to create elected official");
        }
      } else if (initialData) {
        const result = await updateElectedOfficial(initialData.id, {
          name: formData.name,
          title: formData.title,
          picture_url: formData.picture_url || null,
          term_start: formData.term_start || null,
          term_end: formData.term_end || null,
          sort_order: formData.sort_order,
          is_active: formData.is_active,
        });
        if (result.success) {
          toast.success("Elected official updated successfully");
          setOpen(false);
          router.refresh();
        } else {
          toast.error(result.error || "Failed to update elected official");
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
        title={
          mode === "create" ? "Add Elected Official" : "Edit Elected Official"
        }
        description={
          mode === "create"
            ? "Add a new elected official"
            : "Update the elected official details"
        }
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        submitLabel={mode === "create" ? "Create Official" : "Save Changes"}
        size="xl"
      >
        {/* 2-Column Layout: Image Left (60%), Form Right (40%) */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 py-2">
          {/* Left Column - Image Upload (3 columns = 60%) */}
          <div className="lg:col-span-3 space-y-3">
            <Label className="text-stone-700 dark:text-stone-300 mb-2 block text-base">
              Official Portrait
            </Label>
            <div className="min-w-[400px]">
              <ImageUpload
                value={formData.picture_url || ""}
                onChange={(url) =>
                  setFormData({ ...formData, picture_url: url })
                }
                onUpload={handleImageUpload}
                onDelete={handleImageDelete}
                aspectRatio="portrait"
                maxSizeMB={5}
                allowUrl={true}
              />
            </div>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-3">
              Recommended size: 600x800px portrait for best quality
            </p>
          </div>

          {/* Right Column - Form Fields (2 columns = 40%) */}
          <div className="lg:col-span-2 space-y-5">
            {/* Name */}
            <div>
              <Label
                htmlFor="name"
                className="text-stone-700 dark:text-stone-300"
              >
                Name *
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="e.g., Hon. Juan dela Cruz"
                className="mt-1.5"
              />
            </div>

            {/* Title/Position */}
            <div>
              <Label
                htmlFor="title"
                className="text-stone-700 dark:text-stone-300"
              >
                Title/Position *
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="e.g., Municipal Mayor"
                className="mt-1.5"
              />
            </div>

            {/* Term Dates */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label
                  htmlFor="term_start"
                  className="text-stone-700 dark:text-stone-300"
                >
                  Term Start
                </Label>
                <Input
                  id="term_start"
                  type="date"
                  value={formData.term_start || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, term_start: e.target.value })
                  }
                  className="mt-1.5"
                />
              </div>

              <div>
                <Label
                  htmlFor="term_end"
                  className="text-stone-700 dark:text-stone-300"
                >
                  Term End
                </Label>
                <Input
                  id="term_end"
                  type="date"
                  value={formData.term_end || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, term_end: e.target.value })
                  }
                  className="mt-1.5"
                />
              </div>
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
                value={formData.sort_order || 0}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    sort_order: parseInt(e.target.value) || 0,
                  })
                }
                className="mt-1.5"
              />
            </div>

            {/* Active Status */}
            <div className="flex items-center justify-between pt-2">
              <Label
                htmlFor="is_active"
                className="cursor-pointer text-stone-700 dark:text-stone-300"
              >
                Active
              </Label>
              <Switch
                id="is_active"
                checked={formData.is_active}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, is_active: checked })
                }
              />
            </div>
          </div>
        </div>
      </FormDialog>
    </>
  );
}
