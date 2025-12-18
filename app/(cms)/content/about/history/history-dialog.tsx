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
import { createHistory, updateHistory } from "@/lib/actions/about";
import type { Database } from "@/types/supabase";

type History = Database["public"]["Tables"]["history"]["Row"];

interface HistoryDialogProps {
  children: React.ReactNode;
  mode: "create" | "edit";
  initialData?: History;
}

export function HistoryDialog({ children, mode, initialData }: HistoryDialogProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    narrative: initialData?.narrative || "",
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
        const result = await createHistory(formData);
        if (result.success) {
          toast.success("History entry created successfully");
          setOpen(false);
          setFormData({
            title: "",
            narrative: "",
            sort_order: 0,
            status: "draft",
          });
          router.refresh();
        } else {
          toast.error(result.error || "Failed to create history entry");
        }
      } else if (initialData) {
        const result = await updateHistory(initialData.id, formData);
        if (result.success) {
          toast.success("History entry updated successfully");
          setOpen(false);
          router.refresh();
        } else {
          toast.error(result.error || "Failed to update history entry");
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
        title={mode === "create" ? "Add History Entry" : "Edit History Entry"}
        description={
          mode === "create"
            ? "Add a new historical entry for Monkayo"
            : "Update the history entry details"
        }
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        submitLabel={mode === "create" ? "Create Entry" : "Save Changes"}
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g., Foundation of Monkayo"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="narrative">Narrative</Label>
            <Textarea
              id="narrative"
              value={formData.narrative || ""}
              onChange={(e) => setFormData({ ...formData, narrative: e.target.value })}
              placeholder="Write the historical narrative..."
              rows={6}
              className="resize-none"
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
