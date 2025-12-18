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
import { createDisclosure, updateDisclosure } from "@/lib/actions/services";
import type { Database } from "@/types/supabase";

type Disclosure = Database["public"]["Tables"]["disclosure_documents"]["Row"];
type DisclosureCategory = Database["public"]["Enums"]["disclosure_category"];
type ContentStatus = Database["public"]["Enums"]["content_status"];

interface DisclosureDocumentDialogProps {
  children: React.ReactNode;
  mode: "create" | "edit";
  initialData?: Disclosure;
}

export function DisclosureDocumentDialog({ children, mode, initialData }: DisclosureDocumentDialogProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    description: initialData?.description || "",
    category: initialData?.category || ("annual_budget" as DisclosureCategory),
    file_url: initialData?.file_url || "",
    file_name: initialData?.file_name || "",
    file_size: initialData?.file_size || null,
    fiscal_year: initialData?.fiscal_year || new Date().getFullYear(),
    quarter: initialData?.quarter || null,
    sort_order: initialData?.sort_order || 0,
    status: initialData?.status || ("draft" as ContentStatus),
  });

  const handleSubmit = async () => {
    if (!formData.title.trim()) {
      toast.error("Title is required");
      return;
    }
    if (!formData.file_url.trim()) {
      toast.error("File URL is required");
      return;
    }

    setIsSubmitting(true);
    try {
      if (mode === "create") {
        const result = await createDisclosure(formData);
        if (result.success) {
          toast.success("Disclosure document created successfully");
          setOpen(false);
          setFormData({
            title: "",
            description: "",
            category: "annual_budget",
            file_url: "",
            file_name: "",
            file_size: null,
            fiscal_year: new Date().getFullYear(),
            quarter: null,
            sort_order: 0,
            status: "draft",
          });
          router.refresh();
        } else {
          toast.error(result.error || "Failed to create disclosure document");
        }
      } else if (initialData) {
        const result = await updateDisclosure(initialData.id, formData);
        if (result.success) {
          toast.success("Disclosure document updated successfully");
          setOpen(false);
          router.refresh();
        } else {
          toast.error(result.error || "Failed to update disclosure document");
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
        title={mode === "create" ? "Add Disclosure Document" : "Edit Disclosure Document"}
        description={
          mode === "create"
            ? "Add a new disclosure document for transparency"
            : "Update the disclosure document details"
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
              placeholder="e.g., Annual Budget 2024"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category *</Label>
            <Select
              value={formData.category}
              onValueChange={(value: DisclosureCategory) =>
                setFormData({ ...formData, category: value })
              }
            >
              <SelectTrigger id="category">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="annual_budget">Annual Budget</SelectItem>
                <SelectItem value="procurement_bid">Procurement/Bid Notice</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description || ""}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe the document..."
              rows={4}
              className="resize-none"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="file_url">File URL *</Label>
            <Input
              id="file_url"
              value={formData.file_url}
              onChange={(e) => setFormData({ ...formData, file_url: e.target.value })}
              placeholder="https://example.com/document.pdf"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fiscal_year">Fiscal Year</Label>
              <Input
                id="fiscal_year"
                type="number"
                value={formData.fiscal_year || ""}
                onChange={(e) =>
                  setFormData({ ...formData, fiscal_year: parseInt(e.target.value) || new Date().getFullYear() })
                }
                placeholder="2024"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="quarter">Quarter (optional)</Label>
              <Input
                id="quarter"
                type="number"
                min="1"
                max="4"
                value={formData.quarter || ""}
                onChange={(e) =>
                  setFormData({ ...formData, quarter: parseInt(e.target.value) || null })
                }
                placeholder="1-4"
              />
            </div>
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
