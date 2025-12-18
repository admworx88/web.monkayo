"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { FormDialog } from "@/components/cms/form-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { createCommittee, updateCommittee } from "@/lib/actions/about";
import type { Database } from "@/types/supabase";

type Committee = Database["public"]["Tables"]["committees"]["Row"];

interface CommitteeDialogProps {
  children: React.ReactNode;
  mode: "create" | "edit";
  initialData?: Committee;
}

export function CommitteeDialog({ children, mode, initialData }: CommitteeDialogProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    title: initialData?.title || "",
    chairman: initialData?.chairman || "",
    picture_url: initialData?.picture_url || "",
    members: initialData?.members?.join(", ") || "",
    sort_order: initialData?.sort_order || 0,
    is_active: initialData?.is_active ?? true,
  });

  const handleSubmit = async () => {
    if (!formData.name.trim()) {
      toast.error("Committee name is required");
      return;
    }

    setIsSubmitting(true);
    try {
      const membersArray = formData.members
        .split(",")
        .map((m) => m.trim())
        .filter((m) => m.length > 0);

      if (mode === "create") {
        const result = await createCommittee({
          name: formData.name,
          title: formData.title || null,
          chairman: formData.chairman || null,
          picture_url: formData.picture_url || null,
          members: membersArray.length > 0 ? membersArray : null,
          sort_order: formData.sort_order,
          is_active: formData.is_active,
        });
        if (result.success) {
          toast.success("Committee created successfully");
          setOpen(false);
          setFormData({
            name: "",
            title: "",
            chairman: "",
            picture_url: "",
            members: "",
            sort_order: 0,
            is_active: true,
          });
          router.refresh();
        } else {
          toast.error(result.error || "Failed to create committee");
        }
      } else if (initialData) {
        const result = await updateCommittee(initialData.id, {
          name: formData.name,
          title: formData.title || null,
          chairman: formData.chairman || null,
          picture_url: formData.picture_url || null,
          members: membersArray.length > 0 ? membersArray : null,
          sort_order: formData.sort_order,
          is_active: formData.is_active,
        });
        if (result.success) {
          toast.success("Committee updated successfully");
          setOpen(false);
          router.refresh();
        } else {
          toast.error(result.error || "Failed to update committee");
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
        title={mode === "create" ? "Add Committee" : "Edit Committee"}
        description={
          mode === "create"
            ? "Add a new committee"
            : "Update the committee details"
        }
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        submitLabel={mode === "create" ? "Create Committee" : "Save Changes"}
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Committee Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., Committee on Finance"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Title/Description</Label>
            <Input
              id="title"
              value={formData.title || ""}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g., Budget and Appropriation Committee"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="chairman">Chairman</Label>
            <Input
              id="chairman"
              value={formData.chairman || ""}
              onChange={(e) => setFormData({ ...formData, chairman: e.target.value })}
              placeholder="e.g., Hon. Juan dela Cruz"
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
            <Label htmlFor="members">Members (comma-separated)</Label>
            <Textarea
              id="members"
              value={formData.members || ""}
              onChange={(e) => setFormData({ ...formData, members: e.target.value })}
              placeholder="Hon. Jane Doe, Hon. John Smith, Hon. Maria Garcia"
              rows={4}
              className="resize-none"
            />
            <p className="text-xs text-stone-500">
              Separate member names with commas
            </p>
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
