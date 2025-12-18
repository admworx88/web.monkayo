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
import { createOtherForm, updateOtherForm } from "@/lib/actions/documents";
import type { Database } from "@/types/supabase";

type Document = Database["public"]["Tables"]["documents"]["Row"];

interface OtherFormDialogProps {
  children: React.ReactNode;
  mode: "create" | "edit";
  initialData?: Document;
}

export function OtherFormDialog({ children, mode, initialData }: OtherFormDialogProps) {
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
        const result = await createOtherForm(formData);
        if (result.success) {
          toast.success("Form created successfully");
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
          toast.error(result.error || "Failed to create form");
        }
      } else if (initialData) {
        const result = await updateOtherForm(initialData.id, formData);
        if (result.success) {
          toast.success("Form updated successfully");
          setOpen(false);
          router.refresh();
        } else {
          toast.error(result.error || "Failed to update form");
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
        title={mode === "create" ? "Add Form" : "Edit Form"}
        description={
          mode === "create"
            ? "Add a new form or document"
            : "Update the form details"
        }
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        submitLabel={mode === "create" ? "Create Form" : "Save Changes"}
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g., Business Permit Application Form"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="document_number">Document Number</Label>
            <Input
              id="document_number"
              value={formData.document_number || ""}
              onChange={(e) => setFormData({ ...formData, document_number: e.target.value })}
              placeholder="e.g., FORM-2025-001"
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
              placeholder="e.g., business-permit-form.pdf"
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
