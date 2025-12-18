"use client";

import { useState } from "react";
import { Trash2, Eye, Download, Image as ImageIcon, FileText, Film } from "lucide-react";
import { toast } from "sonner";

import { DeleteDialog } from "@/components/cms/delete-dialog";
import { EmptyState } from "@/components/cms/empty-state";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteMedia } from "@/lib/actions/system";
import type { Database } from "@/types/supabase";

type Media = Database["public"]["Tables"]["media"]["Row"];

interface MediaLibraryGridProps {
  media: Media[];
}

export function MediaLibraryGrid({ media }: MediaLibraryGridProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<Media | null>(null);

  const handleDelete = async () => {
    if (!selectedMedia) return;

    const result = await deleteMedia(selectedMedia.id);
    if (result.success) {
      toast.success("Media deleted successfully");
    } else {
      toast.error(result.error || "Failed to delete media");
    }
  };

  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith("image/")) return ImageIcon;
    if (fileType.startsWith("video/")) return Film;
    return FileText;
  };

  const formatFileSize = (bytes: number | null) => {
    if (!bytes) return "Unknown size";
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  if (media.length === 0) {
    return (
      <EmptyState
        icon={ImageIcon}
        title="No media files yet"
        description="Upload images, videos, or documents to your media library"
      />
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {media.map((item) => {
          const Icon = getFileIcon(item.file_type);
          const isImage = item.file_type.startsWith("image/");

          return (
            <Card key={item.id} className="overflow-hidden group">
              <div className="aspect-square bg-slate-100 relative">
                {isImage ? (
                  <img
                    src={item.file_url}
                    alt={item.alt_text || item.file_name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Icon className="h-16 w-16 text-slate-400" />
                  </div>
                )}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => window.open(item.file_url, "_blank")}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => {
                      const link = document.createElement("a");
                      link.href = item.file_url;
                      link.download = item.file_name;
                      link.click();
                    }}
                  >
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </Button>
                </div>
              </div>
              <div className="p-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-sm text-slate-900 truncate" title={item.file_name}>
                      {item.file_name}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {formatFileSize(item.file_size)}
                    </p>
                    {item.folder && (
                      <Badge variant="outline" className="mt-1 text-xs">
                        {item.folder}
                      </Badge>
                    )}
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <span className="text-lg">⋮</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => window.open(item.file_url, "_blank")}>
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          const link = document.createElement("a");
                          link.href = item.file_url;
                          link.download = item.file_name;
                          link.click();
                        }}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-red-600"
                        onClick={() => {
                          setSelectedMedia(item);
                          setDeleteDialogOpen(true);
                        }}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                {item.alt_text && (
                  <p className="text-xs text-slate-500 mt-2 line-clamp-2">
                    {item.alt_text}
                  </p>
                )}
              </div>
            </Card>
          );
        })}
      </div>
      <DeleteDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDelete}
        title="Delete Media"
        description={`Are you sure you want to delete "${selectedMedia?.file_name}"? This action cannot be undone.`}
      />
    </>
  );
}
