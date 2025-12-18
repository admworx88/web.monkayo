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
import { createEService, updateEService } from "@/lib/actions/services";
import type { Database } from "@/types/supabase";

type EService = Database["public"]["Tables"]["eservices"]["Row"];
type EServiceCategory = Database["public"]["Enums"]["eservice_category"];
type ContentStatus = Database["public"]["Enums"]["content_status"];

interface EServiceDialogProps {
  children: React.ReactNode;
  mode: "create" | "edit";
  initialData?: EService;
}

export function EServiceDialog({ children, mode, initialData }: EServiceDialogProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    description: initialData?.description || "",
    category: initialData?.category || ("new_business_application" as EServiceCategory),
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
        const result = await createEService(formData);
        if (result.success) {
          toast.success("e-Service created successfully");
          setOpen(false);
          setFormData({
            title: "",
            description: "",
            category: "new_business_application",
            file_url: "",
            file_name: "",
            file_size: null,
            sort_order: 0,
            status: "draft",
          });
          router.refresh();
        } else {
          toast.error(result.error || "Failed to create e-service");
        }
      } else if (initialData) {
        const result = await updateEService(initialData.id, formData);
        if (result.success) {
          toast.success("e-Service updated successfully");
          setOpen(false);
          router.refresh();
        } else {
          toast.error(result.error || "Failed to update e-service");
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
        title={mode === "create" ? "Add e-Service" : "Edit e-Service"}
        description={
          mode === "create"
            ? "Add a new e-service for citizens"
            : "Update the e-service details"
        }
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        submitLabel={mode === "create" ? "Create e-Service" : "Save Changes"}
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g., Business Permit Application"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category *</Label>
            <Select
              value={formData.category}
              onValueChange={(value: EServiceCategory) =>
                setFormData({ ...formData, category: value })
              }
            >
              <SelectTrigger id="category">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="new_business_application">New Business Application</SelectItem>
                <SelectItem value="renewal">Renewal</SelectItem>
                <SelectItem value="civil_registry">Civil Registry</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description || ""}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe the e-service requirements and process..."
              rows={4}
              className="resize-none"
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
