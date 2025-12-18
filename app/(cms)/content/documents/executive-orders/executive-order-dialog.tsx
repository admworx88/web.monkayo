"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { FormDialog } from "@/components/cms/form-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createExecutiveOrder, updateExecutiveOrder } from "@/lib/actions/documents";
import type { Database } from "@/types/supabase";

type Document = Database["public"]["Tables"]["documents"]["Row"];

interface ExecutiveOrderDialogProps {
  children: React.ReactNode;
  mode: "create" | "edit";
  initialData?: Document;
}

export function ExecutiveOrderDialog({ children, mode, initialData }: ExecutiveOrderDialogProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    document_number: initialData?.document_number || "",
    file_url: initialData?.file_url || "",
    file_name: initialData?.file_name || "",
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
        const result = await createExecutiveOrder(formData);
        if (result.success) {
          toast.success("Executive Order created successfully");
          setOpen(false);
          setFormData({
            title: "",
            document_number: "",
            file_url: "",
            file_name: "",
            status: "draft",
          });
          router.refresh();
        } else {
          toast.error(result.error || "Failed to create Executive Order");
        }
      } else if (initialData) {
        const result = await updateExecutiveOrder(initialData.id, formData);
        if (result.success) {
          toast.success("Executive Order updated successfully");
          setOpen(false);
          router.refresh();
        } else {
          toast.error(result.error || "Failed to update Executive Order");
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
        title={mode === "create" ? "Add Executive Order" : "Edit Executive Order"}
        description={
          mode === "create"
            ? "Add a new Executive Order document"
            : "Update the Executive Order details"
        }
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        submitLabel={mode === "create" ? "Create Document" : "Save Changes"}
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g., Executive Order No. 2025-001"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="document_number">Document Number</Label>
            <Input
              id="document_number"
              value={formData.document_number || ""}
              onChange={(e) => setFormData({ ...formData, document_number: e.target.value })}
              placeholder="e.g., EO-2025-001"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="file_url">File URL</Label>
            <Input
              id="file_url"
              value={formData.file_url || ""}
              onChange={(e) => setFormData({ ...formData, file_url: e.target.value })}
              placeholder="https://example.com/document.pdf"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="file_name">File Name</Label>
            <Input
              id="file_name"
              value={formData.file_name || ""}
              onChange={(e) => setFormData({ ...formData, file_name: e.target.value })}
              placeholder="e.g., executive-order-2025-001.pdf"
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
