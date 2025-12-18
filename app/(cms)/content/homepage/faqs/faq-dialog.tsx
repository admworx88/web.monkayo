"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { FormDialog } from "@/components/cms/form-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { createFAQ, updateFAQ } from "@/lib/actions/homepage";
import type { Database } from "@/types/supabase";

type FAQ = Database["public"]["Tables"]["faqs"]["Row"];

interface FAQDialogProps {
  children: React.ReactNode;
  mode: "create" | "edit";
  faq?: FAQ;
}

export function FAQDialog({ children, mode, faq }: FAQDialogProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    question: faq?.question || "",
    answer: faq?.answer || "",
    sort_order: faq?.sort_order || 0,
    is_active: faq?.is_active ?? true,
  });

  const handleSubmit = async () => {
    if (!formData.question.trim()) {
      toast.error("Question is required");
      return;
    }
    if (!formData.answer.trim()) {
      toast.error("Answer is required");
      return;
    }

    setIsSubmitting(true);
    try {
      if (mode === "create") {
        const result = await createFAQ(formData);
        if (result.success) {
          toast.success("FAQ created successfully");
          setOpen(false);
          setFormData({
            question: "",
            answer: "",
            sort_order: 0,
            is_active: true,
          });
          router.refresh();
        } else {
          toast.error(result.error || "Failed to create FAQ");
        }
      } else if (faq) {
        const result = await updateFAQ(faq.id, formData);
        if (result.success) {
          toast.success("FAQ updated successfully");
          setOpen(false);
          router.refresh();
        } else {
          toast.error(result.error || "Failed to update FAQ");
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
        title={mode === "create" ? "Add New FAQ" : "Edit FAQ"}
        description={
          mode === "create"
            ? "Create a new frequently asked question."
            : "Update the FAQ details."
        }
        onSubmit={handleSubmit}
        submitLabel={mode === "create" ? "Create FAQ" : "Save Changes"}
        isSubmitting={isSubmitting}
        size="md"
      >
        <div className="space-y-5">
          {/* Question */}
          <div>
            <Label htmlFor="question" className="text-stone-700">
              Question <span className="text-red-500">*</span>
            </Label>
            <Input
              id="question"
              placeholder="Enter the question"
              value={formData.question}
              onChange={(e) =>
                setFormData({ ...formData, question: e.target.value })
              }
              className="mt-1.5"
            />
          </div>

          {/* Answer */}
          <div>
            <Label htmlFor="answer" className="text-stone-700">
              Answer <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="answer"
              placeholder="Enter the answer"
              value={formData.answer}
              onChange={(e) =>
                setFormData({ ...formData, answer: e.target.value })
              }
              rows={4}
              className="mt-1.5 resize-none"
            />
          </div>

          {/* Sort Order and Status */}
          <div className="flex items-center gap-6">
            <div className="w-32">
              <Label htmlFor="sort_order" className="text-stone-700">
                Sort Order
              </Label>
              <Input
                id="sort_order"
                type="number"
                min={0}
                value={formData.sort_order}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    sort_order: parseInt(e.target.value) || 0,
                  })
                }
                className="mt-1.5"
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-stone-700">Active Status</Label>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Show this FAQ on the homepage
                  </p>
                </div>
                <Switch
                  checked={formData.is_active}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, is_active: checked })
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </FormDialog>
    </>
  );
}
