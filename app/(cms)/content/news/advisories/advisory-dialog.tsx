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
import { createAdvisory, updateAdvisory } from "@/lib/actions/news";
import type { Database } from "@/types/supabase";

type News = Database["public"]["Tables"]["news"]["Row"];

interface AdvisoryDialogProps {
  children: React.ReactNode;
  mode: "create" | "edit";
  initialData?: News;
}

export function AdvisoryDialog({ children, mode, initialData }: AdvisoryDialogProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    narrative: initialData?.narrative || "",
    facebook_link: initialData?.facebook_link || "",
    featured_image: initialData?.featured_image || "",
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
        const result = await createAdvisory(formData);
        if (result.success) {
          toast.success("Advisory created successfully");
          setOpen(false);
          setFormData({
            title: "",
            narrative: "",
            facebook_link: "",
            featured_image: "",
            status: "draft",
          });
          router.refresh();
        } else {
          toast.error(result.error || "Failed to create advisory");
        }
      } else if (initialData) {
        const result = await updateAdvisory(initialData.id, formData);
        if (result.success) {
          toast.success("Advisory updated successfully");
          setOpen(false);
          router.refresh();
        } else {
          toast.error(result.error || "Failed to update advisory");
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
        title={mode === "create" ? "Add Advisory" : "Edit Advisory"}
        description={
          mode === "create"
            ? "Add a new public advisory to keep citizens informed"
            : "Update the advisory details"
        }
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        submitLabel={mode === "create" ? "Create Advisory" : "Save Changes"}
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g., COVID-19 Health Advisory"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="narrative">Narrative</Label>
            <Textarea
              id="narrative"
              value={formData.narrative || ""}
              onChange={(e) => setFormData({ ...formData, narrative: e.target.value })}
              placeholder="Write the advisory content..."
              rows={6}
              className="resize-none"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="facebook_link">Facebook Link</Label>
            <Input
              id="facebook_link"
              type="url"
              value={formData.facebook_link || ""}
              onChange={(e) => setFormData({ ...formData, facebook_link: e.target.value })}
              placeholder="https://facebook.com/..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="featured_image">Featured Image URL</Label>
            <Input
              id="featured_image"
              type="url"
              value={formData.featured_image || ""}
              onChange={(e) => setFormData({ ...formData, featured_image: e.target.value })}
              placeholder="https://example.com/image.jpg"
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
      </FormDialog>
    </>
  );
}
