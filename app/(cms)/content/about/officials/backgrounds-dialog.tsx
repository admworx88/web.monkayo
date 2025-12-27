"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { ImageUpload } from "@/components/cms/image-upload";
import { toast } from "sonner";
import {
  getOfficialBackgrounds,
  createOfficialBackground,
  updateOfficialBackground,
  deleteOfficialBackground,
  uploadOfficialBackgroundImage,
  type ElectedOfficialBg,
} from "@/lib/actions/about";
import { Trash2, Star, StarOff, Plus } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface BackgroundsDialogProps {
  officialId: string;
  officialName: string;
  children: React.ReactNode;
}

export function BackgroundsDialog({
  officialId,
  officialName,
  children,
}: BackgroundsDialogProps) {
  const [open, setOpen] = useState(false);
  const [backgrounds, setBackgrounds] = useState<ElectedOfficialBg[]>([]);
  const [loading, setLoading] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const router = useRouter();

  // Form state for new background
  const [formData, setFormData] = useState({
    title: "",
    image_url: "",
    link_url: "",
    caption: "",
    is_featured: false,
  });

  // Load backgrounds when dialog opens
  useEffect(() => {
    if (open) {
      loadBackgrounds();
    }
  }, [open]);

  const loadBackgrounds = async () => {
    setLoading(true);
    const result = await getOfficialBackgrounds(officialId);
    if (result.success && result.data) {
      setBackgrounds(result.data);
    }
    setLoading(false);
  };

  const handleImageUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("officialId", officialId);

    const result = await uploadOfficialBackgroundImage(formData);
    return result;
  };

  const handleImageDelete = async (url: string) => {
    // Image deletion is handled in deleteOfficialBackground
    return { success: true };
  };

  const handleAddBackground = async () => {
    if (!formData.title || !formData.image_url) {
      toast.error("Title and image are required");
      return;
    }

    setLoading(true);

    const result = await createOfficialBackground({
      official_id: officialId,
      title: formData.title,
      image_url: formData.image_url,
      link_url: formData.link_url || null,
      caption: formData.caption || null,
      is_featured: formData.is_featured,
      sort_order: backgrounds.length,
    });

    if (result.success) {
      toast.success("Background history added successfully");
      setFormData({
        title: "",
        image_url: "",
        link_url: "",
        caption: "",
        is_featured: false,
      });
      setShowAddForm(false);
      await loadBackgrounds();
      router.refresh();
    } else {
      toast.error(result.error || "Failed to add background history");
    }

    setLoading(false);
  };

  const handleToggleFeatured = async (bg: ElectedOfficialBg) => {
    setLoading(true);

    const result = await updateOfficialBackground(bg.id, {
      is_featured: !bg.is_featured,
    });

    if (result.success) {
      toast.success(
        bg.is_featured
          ? "Removed as primary background history"
          : "Set as primary background history"
      );
      await loadBackgrounds();
      router.refresh();
    } else {
      toast.error(result.error || "Failed to update background history");
    }

    setLoading(false);
  };

  const handleDelete = async (bg: ElectedOfficialBg) => {
    if (
      !confirm("Are you sure you want to delete this background history item?")
    ) {
      return;
    }

    setLoading(true);

    const result = await deleteOfficialBackground(bg.id);

    if (result.success) {
      toast.success("Background history deleted successfully");
      await loadBackgrounds();
      router.refresh();
    } else {
      toast.error(result.error || "Failed to delete background history");
    }

    setLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Background History - {officialName}</DialogTitle>
          <DialogDescription>
            Manage background history (education, career, achievements) for this
            official
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[calc(90vh-200px)]">
          {/* Existing Background History Items */}
          {backgrounds.length > 0 && (
            <div className="space-y-4 mb-6">
              <h3 className="text-sm font-medium">Background History Items</h3>
              <div className="grid grid-cols-2 gap-4">
                {backgrounds.map((bg) => (
                  <div
                    key={bg.id}
                    className="border rounded-lg p-4 space-y-2 relative"
                  >
                    {bg.is_featured && (
                      <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded text-xs font-medium">
                        Featured
                      </div>
                    )}
                    <div className="aspect-video relative rounded-md overflow-hidden bg-gray-100">
                      <img
                        src={bg.image_url}
                        alt={bg.title}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">{bg.title}</h4>
                      {bg.caption && (
                        <p className="text-xs text-muted-foreground mt-1">
                          {bg.caption}
                        </p>
                      )}
                      {bg.link_url && (
                        <a
                          href={bg.link_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-blue-600 hover:underline mt-1 block"
                        >
                          View Link →
                        </a>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleToggleFeatured(bg)}
                        disabled={loading}
                      >
                        {bg.is_featured ? (
                          <>
                            <StarOff className="h-4 w-4 mr-1" />
                            Unfeature
                          </>
                        ) : (
                          <>
                            <Star className="h-4 w-4 mr-1" />
                            Feature
                          </>
                        )}
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(bg)}
                        disabled={loading}
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Add New Background History Form */}
          {!showAddForm && (
            <Button
              variant="outline"
              onClick={() => setShowAddForm(true)}
              className="w-full"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Background History
            </Button>
          )}

          {showAddForm && (
            <div className="border rounded-lg p-4 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium">
                  Add Background History Item
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowAddForm(false)}
                >
                  Cancel
                </Button>
              </div>

              <div className="space-y-6">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    placeholder="e.g., Educational Background, Career History, Awards"
                  />
                  <p className="text-xs text-muted-foreground">
                    The title of this background history item
                  </p>
                </div>

                <div className="flex flex-col gap-2">
                  <Label>Background History Image *</Label>
                  <ImageUpload
                    value={formData.image_url}
                    onChange={(url) =>
                      setFormData({ ...formData, image_url: url })
                    }
                    onUpload={handleImageUpload}
                    onDelete={handleImageDelete}
                    aspectRatio="video"
                    maxSizeMB={5}
                    allowUrl={true}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Upload designed image/infographic containing background
                    information
                  </p>
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="link_url">Reference Link (Optional)</Label>
                  <Input
                    id="link_url"
                    type="url"
                    value={formData.link_url}
                    onChange={(e) =>
                      setFormData({ ...formData, link_url: e.target.value })
                    }
                    placeholder="https://example.com"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Optional link to source or more details
                  </p>
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="caption">Description (Optional)</Label>
                  <Textarea
                    id="caption"
                    value={formData.caption}
                    onChange={(e) =>
                      setFormData({ ...formData, caption: e.target.value })
                    }
                    placeholder="Brief description of this background history item"
                    rows={2}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="is_featured"
                    checked={formData.is_featured}
                    onCheckedChange={(checked) =>
                      setFormData({
                        ...formData,
                        is_featured: checked as boolean,
                      })
                    }
                  />
                  <Label htmlFor="is_featured" className="cursor-pointer">
                    Set as primary background history
                  </Label>
                </div>

                <Button
                  onClick={handleAddBackground}
                  disabled={loading}
                  className="w-full"
                >
                  {loading ? "Adding..." : "Add Background History"}
                </Button>
              </div>
            </div>
          )}
        </ScrollArea>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
