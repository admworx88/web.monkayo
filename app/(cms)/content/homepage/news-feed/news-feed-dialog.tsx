"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { FormDialog } from "@/components/cms/form-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { createHomepageNews, updateHomepageNews } from "@/lib/actions/homepage";
import type { Database } from "@/types/supabase";

type HomepageNews = Database["public"]["Tables"]["homepage_news"]["Row"];

interface NewsFeedDialogProps {
  children: React.ReactNode;
  mode: "create" | "edit";
  news?: HomepageNews;
}

export function NewsFeedDialog({ children, mode, news }: NewsFeedDialogProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: news?.title || "",
    facebook_embed_url: news?.facebook_embed_url || "",
    sort_order: news?.sort_order || 0,
    is_active: news?.is_active ?? true,
  });

  const handleSubmit = async () => {
    if (!formData.title.trim()) {
      toast.error("Title is required");
      return;
    }

    setIsSubmitting(true);
    try {
      if (mode === "create") {
        const result = await createHomepageNews(formData);
        if (result.success) {
          toast.success("News item created successfully");
          setOpen(false);
          setFormData({
            title: "",
            facebook_embed_url: "",
            sort_order: 0,
            is_active: true,
          });
          router.refresh();
        } else {
          toast.error(result.error || "Failed to create news item");
        }
      } else if (news) {
        const result = await updateHomepageNews(news.id, formData);
        if (result.success) {
          toast.success("News item updated successfully");
          setOpen(false);
          router.refresh();
        } else {
          toast.error(result.error || "Failed to update news item");
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
        title={mode === "create" ? "Add News Item" : "Edit News Item"}
        description={
          mode === "create"
            ? "Add a Facebook post embed to the homepage."
            : "Update the news item details."
        }
        onSubmit={handleSubmit}
        submitLabel={mode === "create" ? "Add News" : "Save Changes"}
        isSubmitting={isSubmitting}
        size="md"
      >
        <div className="space-y-5">
          {/* Title */}
          <div>
            <Label htmlFor="title" className="text-stone-700">
              Title <span className="text-red-500">*</span>
            </Label>
            <Input
              id="title"
              placeholder="Enter news title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="mt-1.5"
            />
          </div>

          {/* Facebook Embed URL */}
          <div>
            <Label htmlFor="facebook_embed_url" className="text-stone-700">
              Facebook Post URL
            </Label>
            <Input
              id="facebook_embed_url"
              placeholder="https://www.facebook.com/..."
              value={formData.facebook_embed_url}
              onChange={(e) =>
                setFormData({ ...formData, facebook_embed_url: e.target.value })
              }
              className="mt-1.5"
            />
            <p className="text-xs text-stone-500 mt-1">
              Paste the Facebook post URL to embed on the homepage
            </p>
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
                    Show on the homepage
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
