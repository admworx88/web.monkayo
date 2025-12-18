"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { FormDialog } from "@/components/cms/form-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createPlace, updatePlace } from "@/lib/actions/tourism";
import type { Database } from "@/types/supabase";

type Tourism = Database["public"]["Tables"]["tourism"]["Row"];

interface TourismPlaceDialogProps {
  children: React.ReactNode;
  mode: "create" | "edit";
  initialData?: Tourism;
}

export function TourismPlaceDialog({ children, mode, initialData }: TourismPlaceDialogProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    narrative: initialData?.narrative || "",
    facebook_link: initialData?.facebook_link || "",
    sort_order: initialData?.sort_order || 0,
    status: initialData?.status || ("draft" as "draft" | "published" | "archived"),
  });

  const handleSubmit = async () => {
    if (!formData.title.trim()) {
      toast.error("Title is required");
      return;
    }

    setIsSubmitting(true);
    try {
      if (mode === "create") {
        const result = await createPlace(formData);
        if (result.success) {
          toast.success("Place created successfully");
          setOpen(false);
          setFormData({
            title: "",
            narrative: "",
            facebook_link: "",
            sort_order: 0,
            status: "draft",
          });
          router.refresh();
        } else {
          toast.error(result.error || "Failed to create place");
        }
      } else if (initialData) {
        const result = await updatePlace(initialData.id, formData);
        if (result.success) {
          toast.success("Place updated successfully");
          setOpen(false);
          router.refresh();
        } else {
          toast.error(result.error || "Failed to update place");
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
        title={mode === "create" ? "Add Place to Visit" : "Edit Place to Visit"}
        description={
          mode === "create"
            ? "Add a new tourist destination in Monkayo"
            : "Update the place details"
        }
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        submitLabel={mode === "create" ? "Create Place" : "Save Changes"}
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g., Mt. Diwata View Deck"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="narrative">Description</Label>
            <Textarea
              id="narrative"
              value={formData.narrative || ""}
              onChange={(e) => setFormData({ ...formData, narrative: e.target.value })}
              placeholder="Describe the place..."
              rows={6}
              className="resize-none"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="facebook_link">Facebook Link</Label>
            <Input
              id="facebook_link"
              value={formData.facebook_link || ""}
              onChange={(e) => setFormData({ ...formData, facebook_link: e.target.value })}
              placeholder="https://facebook.com/..."
              type="url"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="sort_order">Sort Order</Label>
              <Input
                id="sort_order"
                type="number"
                value={formData.sort_order || 0}
                onChange={(e) =>
                  setFormData({ ...formData, sort_order: parseInt(e.target.value) || 0 })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value: "draft" | "published" | "archived") =>
                  setFormData({ ...formData, status: value })
                }
              >
                <SelectTrigger id="status">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </FormDialog>
    </>
  );
}
