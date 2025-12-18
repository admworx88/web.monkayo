"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Upload, X } from "lucide-react";

import { FormDialog } from "@/components/cms/form-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createMedia } from "@/lib/actions/system";

interface MediaUploadDialogProps {
  children: React.ReactNode;
}

export function MediaUploadDialog({ children }: MediaUploadDialogProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    alt_text: "",
    folder: "",
  });

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast.error("File size must be less than 10MB");
        return;
      }
      setSelectedFile(file);
    }
  };

  const handleSubmit = async () => {
    if (!selectedFile) {
      toast.error("Please select a file to upload");
      return;
    }

    setIsSubmitting(true);
    try {
      // TODO: Implement actual file upload to Supabase Storage
      // For now, we'll create a placeholder media entry
      // In production, you would:
      // 1. Upload file to Supabase Storage
      // 2. Get the public URL
      // 3. Create media record with the URL

      const result = await createMedia({
        file_name: selectedFile.name,
        original_name: selectedFile.name,
        file_url: URL.createObjectURL(selectedFile), // Temporary - replace with actual upload
        file_type: selectedFile.type,
        file_size: selectedFile.size,
        mime_type: selectedFile.type,
        alt_text: formData.alt_text || null,
        folder: formData.folder || null,
      });

      if (result.success) {
        toast.success("Media uploaded successfully");
        setOpen(false);
        setSelectedFile(null);
        setFormData({ alt_text: "", folder: "" });
        router.refresh();
      } else {
        toast.error(result.error || "Failed to upload media");
      }
    } catch (error) {
      toast.error("An error occurred while uploading");
      console.error(error);
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
        title="Upload Media"
        description="Upload images, videos, or documents to your media library"
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        submitLabel="Upload"
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="file">File *</Label>
            <div className="flex items-center gap-2">
              <Input
                id="file"
                type="file"
                onChange={handleFileSelect}
                accept="image/*,video/*,application/pdf,.doc,.docx,.xls,.xlsx"
              />
            </div>
            <p className="text-xs text-slate-500">
              Maximum file size: 10MB. Supported: Images, Videos, PDF, Documents
            </p>
          </div>

          {selectedFile && (
            <div className="rounded-lg border border-slate-200 p-3 bg-slate-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 min-w-0">
                  <Upload className="h-4 w-4 text-slate-500 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-slate-900 truncate">
                      {selectedFile.name}
                    </p>
                    <p className="text-xs text-slate-500">
                      {(selectedFile.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedFile(null)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="alt_text">Alt Text (for images)</Label>
            <Textarea
              id="alt_text"
              value={formData.alt_text}
              onChange={(e) => setFormData({ ...formData, alt_text: e.target.value })}
              placeholder="Describe the image for accessibility..."
              rows={3}
              className="resize-none"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="folder">Folder (optional)</Label>
            <Input
              id="folder"
              value={formData.folder}
              onChange={(e) => setFormData({ ...formData, folder: e.target.value })}
              placeholder="e.g., officials, tourism, documents"
            />
          </div>
        </div>
      </FormDialog>
    </>
  );
}
