"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { FormDialog } from "@/components/cms/form-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { createElectedOfficial, updateElectedOfficial } from "@/lib/actions/about";
import type { Database } from "@/types/supabase";

type ElectedOfficial = Database["public"]["Tables"]["elected_officials"]["Row"];

interface OfficialDialogProps {
  children: React.ReactNode;
  mode: "create" | "edit";
  initialData?: ElectedOfficial;
}

export function OfficialDialog({ children, mode, initialData }: OfficialDialogProps) {
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
        title={mode === "create" ? "Add Elected Official" : "Edit Elected Official"}
        description={
          mode === "create"
            ? "Add a new elected official"
            : "Update the elected official details"
        }
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        submitLabel={mode === "create" ? "Create Official" : "Save Changes"}
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., Hon. Juan dela Cruz"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Title/Position *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g., Municipal Mayor"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="picture_url">Picture URL</Label>
            <Input
              id="picture_url"
              value={formData.picture_url || ""}
              onChange={(e) => setFormData({ ...formData, picture_url: e.target.value })}
              placeholder="https://example.com/picture.jpg"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="term_start">Term Start</Label>
              <Input
                id="term_start"
                type="date"
                value={formData.term_start || ""}
                onChange={(e) => setFormData({ ...formData, term_start: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="term_end">Term End</Label>
              <Input
                id="term_end"
                type="date"
                value={formData.term_end || ""}
                onChange={(e) => setFormData({ ...formData, term_end: e.target.value })}
              />
            </div>
          </div>

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

          <div className="flex items-center justify-between pt-2">
            <Label htmlFor="is_active" className="cursor-pointer">
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
      </FormDialog>
    </>
  );
}
