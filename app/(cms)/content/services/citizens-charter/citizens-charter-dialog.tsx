"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { FormDialog } from "@/components/cms/form-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createCharter, updateCharter } from "@/lib/actions/services";
import type { Database } from "@/types/supabase";

type Charter = Database["public"]["Tables"]["citizens_charter"]["Row"];
type CharterCategory = Database["public"]["Enums"]["charter_category"];
type ContentStatus = Database["public"]["Enums"]["content_status"];

interface CitizensCharterDialogProps {
  children: React.ReactNode;
  mode: "create" | "edit";
  initialData?: Charter;
}

export function CitizensCharterDialog({ children, mode, initialData }: CitizensCharterDialogProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    description: initialData?.description || "",
    category: initialData?.category || ("frontline_services" as CharterCategory),
    file_url: initialData?.file_url || "",
    file_name: initialData?.file_name || "",
    file_size: initialData?.file_size || null,
    sort_order: initialData?.sort_order || 0,
    status: initialData?.status || ("draft" as ContentStatus),
  });

  const handleSubmit = async () => {
    if (!formData.title.trim()) {
      toast.error("Title is required");
      return;
    }

    setIsSubmitting(true);
    try {
      if (mode === "create") {
        const result = await createCharter(formData);
        if (result.success) {
          toast.success("Charter item created successfully");
          setOpen(false);
          setFormData({
            title: "",
            description: "",
            category: "frontline_services",
            file_url: "",
            file_name: "",
            file_size: null,
            sort_order: 0,
            status: "draft",
          });
          router.refresh();
        } else {
          toast.error(result.error || "Failed to create charter item");
        }
      } else if (initialData) {
        const result = await updateCharter(initialData.id, formData);
        if (result.success) {
          toast.success("Charter item updated successfully");
          setOpen(false);
          router.refresh();
        } else {
          toast.error(result.error || "Failed to update charter item");
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
        title={mode === "create" ? "Add Charter Item" : "Edit Charter Item"}
        description={
          mode === "create"
            ? "Add a new citizen's charter item"
            : "Update the charter item details"
        }
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        submitLabel={mode === "create" ? "Create Item" : "Save Changes"}
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g., Community Tax Certificate"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category *</Label>
            <Select
              value={formData.category}
              onValueChange={(value: CharterCategory) =>
                setFormData({ ...formData, category: value })
              }
            >
              <SelectTrigger id="category">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="frontline_services">Frontline Services</SelectItem>
                <SelectItem value="process_flow">Process Flow</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description || ""}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe the service or process..."
              rows={4}
              className="resize-none"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="file_url">File URL (optional)</Label>
            <Input
              id="file_url"
              value={formData.file_url || ""}
              onChange={(e) => setFormData({ ...formData, file_url: e.target.value })}
              placeholder="https://example.com/document.pdf"
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
                onValueChange={(value: ContentStatus) =>
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
