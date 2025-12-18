"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { FormDialog } from "@/components/cms/form-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { createOrgStructure, updateOrgStructure } from "@/lib/actions/about";
import type { Database } from "@/types/supabase";

type OrgStructure = Database["public"]["Tables"]["organizational_structure"]["Row"];

interface OrgStructureDialogProps {
  children: React.ReactNode;
  mode: "create" | "edit";
  initialData?: OrgStructure;
}

export function OrgStructureDialog({ children, mode, initialData }: OrgStructureDialogProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    title: initialData?.title || "",
    department: initialData?.department || "",
    picture_url: initialData?.picture_url || "",
    parent_id: initialData?.parent_id || "",
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
        const result = await createOrgStructure({
          name: formData.name,
          title: formData.title,
          department: formData.department || null,
          picture_url: formData.picture_url || null,
          parent_id: formData.parent_id || null,
          sort_order: formData.sort_order,
          is_active: formData.is_active,
        });
        if (result.success) {
          toast.success("Organization entry created successfully");
          setOpen(false);
          setFormData({
            name: "",
            title: "",
            department: "",
            picture_url: "",
            parent_id: "",
            sort_order: 0,
            is_active: true,
          });
          router.refresh();
        } else {
          toast.error(result.error || "Failed to create organization entry");
        }
      } else if (initialData) {
        const result = await updateOrgStructure(initialData.id, {
          name: formData.name,
          title: formData.title,
          department: formData.department || null,
          picture_url: formData.picture_url || null,
          parent_id: formData.parent_id || null,
          sort_order: formData.sort_order,
          is_active: formData.is_active,
        });
        if (result.success) {
          toast.success("Organization entry updated successfully");
          setOpen(false);
          router.refresh();
        } else {
          toast.error(result.error || "Failed to update organization entry");
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
        title={mode === "create" ? "Add Organization Entry" : "Edit Organization Entry"}
        description={
          mode === "create"
            ? "Add a new organizational structure entry"
            : "Update the organizational structure entry details"
        }
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        submitLabel={mode === "create" ? "Create Entry" : "Save Changes"}
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., Juan dela Cruz"
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
            <Label htmlFor="department">Department</Label>
            <Input
              id="department"
              value={formData.department || ""}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              placeholder="e.g., Office of the Mayor"
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

          <div className="space-y-2">
            <Label htmlFor="parent_id">Parent ID (for hierarchy)</Label>
            <Input
              id="parent_id"
              value={formData.parent_id || ""}
              onChange={(e) => setFormData({ ...formData, parent_id: e.target.value })}
              placeholder="UUID of parent position"
            />
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
