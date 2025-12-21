"use client";

import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import {
  MoreHorizontal,
  Pencil,
  Trash2,
  Rss,
  ExternalLink,
} from "lucide-react";
import { toast } from "sonner";

import { DataTable } from "@/components/cms/data-table";
import { StatusBadge } from "@/components/cms/status-badge";
import { DeleteDialog } from "@/components/cms/delete-dialog";
import { EmptyState } from "@/components/cms/empty-state";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteHomepageNews } from "@/lib/actions/homepage";
import { NewsFeedDialog } from "./news-feed-dialog";
import type { Database } from "@/types/supabase";

type HomepageNews = Database["public"]["Tables"]["homepage_news"]["Row"];

interface NewsFeedTableProps {
  news: HomepageNews[];
}

export function NewsFeedTable({ news }: NewsFeedTableProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedNews, setSelectedNews] = useState<HomepageNews | null>(null);

  const handleDelete = async () => {
    if (!selectedNews) return;

    const result = await deleteHomepageNews(selectedNews.id);
    if (result.success) {
      toast.success("News item deleted successfully");
    } else {
      toast.error(result.error || "Failed to delete news item");
    }
  };

  const columns: ColumnDef<HomepageNews>[] = [
    {
      accessorKey: "sort_order",
      header: "#",
      cell: ({ row }) => (
        <span className="text-stone-500 font-mono text-sm">
          {row.original.sort_order ?? 0}
        </span>
      ),
      size: 50,
    },
    {
      accessorKey: "title",
      header: "News Item",
      cell: ({ row }) => (
        <div className="flex items-start gap-3 min-w-0">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50 text-[amber-600] shrink-0">
            <Rss className="h-5 w-5" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-medium dark:text-stone-200 text-stone-800 truncate">
              {row.original.title}
            </p>
            {row.original.facebook_embed_url && (
              <a
                href={row.original.facebook_embed_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs text-[amber-600] hover:underline mt-0.5"
              >
                <ExternalLink className="h-3 w-3" />
                View on Facebook
              </a>
            )}
          </div>
        </div>
      ),
    },
    {
      accessorKey: "is_active",
      header: "Status",
      cell: ({ row }) => (
        <StatusBadge status={row.original.is_active ?? false} />
      ),
      size: 100,
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Actions</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <NewsFeedDialog mode="edit" news={row.original}>
              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                <Pencil className="h-4 w-4 mr-2" />
                Edit
              </DropdownMenuItem>
            </NewsFeedDialog>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-red-600 focus:text-red-600"
              onSelect={() => {
                setSelectedNews(row.original);
                setDeleteDialogOpen(true);
              }}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
      size: 50,
    },
  ];

  if (news.length === 0) {
    return (
      <EmptyState
        icon={Rss}
        title="No news items yet"
        description="Add Facebook post embeds to display on the homepage."
      />
    );
  }

  return (
    <>
      <div className="p-1">
        <DataTable
          columns={columns}
          data={news}
          searchKey="title"
          searchPlaceholder="Search news..."
        />
      </div>

      <DeleteDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDelete}
        title="Delete News Item"
        itemName={selectedNews?.title}
      />
    </>
  );
}
