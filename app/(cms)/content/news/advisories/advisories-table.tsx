"use client";

import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Pencil, Trash2, AlertCircle, Calendar } from "lucide-react";
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
import { deleteAdvisory } from "@/lib/actions/news";
import { AdvisoryDialog } from "./advisory-dialog";
import type { Database } from "@/types/supabase";

type News = Database["public"]["Tables"]["news"]["Row"];

interface AdvisoriesTableProps {
  advisories: News[];
}

export function AdvisoriesTable({ advisories }: AdvisoriesTableProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedAdvisory, setSelectedAdvisory] = useState<News | null>(null);

  const handleDelete = async () => {
    if (!selectedAdvisory) return;

    const result = await deleteAdvisory(selectedAdvisory.id);
    if (result.success) {
      toast.success("Advisory deleted successfully");
    } else {
      toast.error(result.error || "Failed to delete advisory");
    }
  };

  const columns: ColumnDef<News>[] = [
    {
      accessorKey: "title",
      header: "Title",
      cell: ({ row }) => (
        <div className="flex items-start gap-3 min-w-0">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50 text-[amber-600] flex-shrink-0">
            <AlertCircle className="h-5 w-5" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-medium text-stone-900 truncate">
              {row.original.title}
            </p>
            {row.original.narrative && (
              <p className="text-sm text-stone-500 line-clamp-2 mt-0.5">
                {row.original.narrative.substring(0, 100)}...
              </p>
            )}
          </div>
        </div>
      ),
    },
    {
      accessorKey: "facebook_link",
      header: "Facebook Link",
      cell: ({ row }) => (
        row.original.facebook_link ? (
          <a
            href={row.original.facebook_link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-[amber-600] hover:underline truncate block max-w-[200px]"
          >
            View on Facebook
          </a>
        ) : (
          <span className="text-sm text-stone-400">No link</span>
        )
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <StatusBadge status={row.original.status || "draft"} />
      ),
    },
    {
      accessorKey: "updated_at",
      header: "Last Updated",
      cell: ({ row }) => (
        <div className="flex items-center gap-1.5 text-sm text-stone-500">
          <Calendar className="h-3.5 w-3.5" />
          {new Date(row.original.updated_at!).toLocaleDateString()}
        </div>
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <div className="flex items-center justify-end gap-2">
          <AdvisoryDialog mode="edit" initialData={row.original}>
            <Button variant="ghost" size="sm">
              <Pencil className="h-4 w-4" />
            </Button>
          </AdvisoryDialog>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <AdvisoryDialog mode="edit" initialData={row.original}>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  <Pencil className="h-4 w-4 mr-2" />
                  Edit
                </DropdownMenuItem>
              </AdvisoryDialog>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-red-600"
                onSelect={() => {
                  setSelectedAdvisory(row.original);
                  setDeleteDialogOpen(true);
                }}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
    },
  ];

  if (advisories.length === 0) {
    return (
      <EmptyState
        icon={AlertCircle}
        title="No advisories yet"
        description="Add your first advisory to keep citizens informed"
      />
    );
  }

  return (
    <>
      <DataTable columns={columns} data={advisories} searchKey="title" />
      <DeleteDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDelete}
        title="Delete Advisory"
        description={`Are you sure you want to delete "${selectedAdvisory?.title}"? This action cannot be undone.`}
      />
    </>
  );
}
