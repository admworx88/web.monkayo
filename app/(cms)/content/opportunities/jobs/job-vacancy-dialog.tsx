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
import { createJobVacancy, updateJobVacancy } from "@/lib/actions/opportunities";
import type { Database } from "@/types/supabase";

type JobVacancy = Database["public"]["Tables"]["job_vacancies"]["Row"];

interface JobVacancyDialogProps {
  children: React.ReactNode;
  mode: "create" | "edit";
  initialData?: JobVacancy;
}

export function JobVacancyDialog({ children, mode, initialData }: JobVacancyDialogProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    description: initialData?.description || "",
    employment_type: initialData?.employment_type || "",
    salary_grade: initialData?.salary_grade || "",
    deadline: initialData?.deadline ? new Date(initialData.deadline).toISOString().split('T')[0] : "",
    facebook_link: initialData?.facebook_link || "",
    file_url: initialData?.file_url || "",
    file_name: initialData?.file_name || "",
    file_size: initialData?.file_size || null,
    sort_order: initialData?.sort_order || 0,
    status: initialData?.status || ("draft" as "draft" | "published" | "archived"),
    is_open: initialData?.is_open ?? true,
  });

  const handleSubmit = async () => {
    if (!formData.title.trim()) {
      toast.error("Job title is required");
      return;
    }

    setIsSubmitting(true);
    try {
      if (mode === "create") {
        const result = await createJobVacancy(formData);
        if (result.success) {
          toast.success("Job vacancy created successfully");
          setOpen(false);
          setFormData({
            title: "",
            description: "",
            employment_type: "",
            salary_grade: "",
            deadline: "",
            facebook_link: "",
            file_url: "",
            file_name: "",
            file_size: null,
            sort_order: 0,
            status: "draft",
            is_open: true,
          });
          router.refresh();
        } else {
          toast.error(result.error || "Failed to create job vacancy");
        }
      } else if (initialData) {
        const result = await updateJobVacancy(initialData.id, formData);
        if (result.success) {
          toast.success("Job vacancy updated successfully");
          setOpen(false);
          router.refresh();
        } else {
          toast.error(result.error || "Failed to update job vacancy");
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
        title={mode === "create" ? "Add Job Vacancy" : "Edit Job Vacancy"}
        description={
          mode === "create"
            ? "Add a new job vacancy posting"
            : "Update the job vacancy details"
        }
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        submitLabel={mode === "create" ? "Create Vacancy" : "Save Changes"}
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Job Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g., Administrative Aide III"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description || ""}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Job description and qualifications..."
              rows={6}
              className="resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="employment_type">Employment Type</Label>
              <Input
                id="employment_type"
                value={formData.employment_type || ""}
                onChange={(e) => setFormData({ ...formData, employment_type: e.target.value })}
                placeholder="e.g., Full-time, Contract"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="salary_grade">Salary Grade</Label>
              <Input
                id="salary_grade"
                value={formData.salary_grade || ""}
                onChange={(e) => setFormData({ ...formData, salary_grade: e.target.value })}
                placeholder="e.g., 15"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="deadline">Application Deadline</Label>
            <Input
              id="deadline"
              type="date"
              value={formData.deadline || ""}
              onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
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
            <Label htmlFor="file_url">Attachment URL</Label>
            <Input
              id="file_url"
              type="url"
              value={formData.file_url || ""}
              onChange={(e) => setFormData({ ...formData, file_url: e.target.value })}
              placeholder="URL to job description document"
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

          <div className="flex items-center justify-between pt-2">
            <Label htmlFor="is_open" className="cursor-pointer">
              Position Open
            </Label>
            <Switch
              id="is_open"
              checked={formData.is_open}
              onCheckedChange={(checked) =>
                setFormData({ ...formData, is_open: checked })
              }
            />
          </div>
        </div>
      </FormDialog>
    </>
  );
}
