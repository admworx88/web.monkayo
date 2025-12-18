"use client";

import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Pencil, Trash2, MapPin, Calendar } from "lucide-react";
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
import { deletePlace } from "@/lib/actions/tourism";
import { TourismPlaceDialog } from "./tourism-place-dialog";
import type { Database } from "@/types/supabase";

type Tourism = Database["public"]["Tables"]["tourism"]["Row"];

interface TourismPlacesTableProps {
  places: Tourism[];
}

export function TourismPlacesTable({ places }: TourismPlacesTableProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState<Tourism | null>(null);

  const handleDelete = async () => {
    if (!selectedPlace) return;

    const result = await deletePlace(selectedPlace.id);
    if (result.success) {
      toast.success("Place deleted successfully");
    } else {
      toast.error(result.error || "Failed to delete place");
    }
  };

  const columns: ColumnDef<Tourism>[] = [
    {
      accessorKey: "title",
      header: "Title",
      cell: ({ row }) => (
        <div className="flex items-start gap-3 min-w-0">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 flex-shrink-0">
            <MapPin className="h-5 w-5" />
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
        <div className="max-w-[200px] truncate">
          {row.original.facebook_link ? (
            <a
              href={row.original.facebook_link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline text-sm"
            >
              View Post
            </a>
          ) : (
            <span className="text-stone-400 text-sm">No link</span>
          )}
        </div>
      ),
    },
    {
      accessorKey: "sort_order",
      header: "Order",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded bg-stone-100 text-stone-700 font-medium text-sm">
            {row.original.sort_order || 0}
          </div>
        </div>
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
          <TourismPlaceDialog mode="edit" initialData={row.original}>
            <Button variant="ghost" size="sm">
              <Pencil className="h-4 w-4" />
            </Button>
          </TourismPlaceDialog>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <TourismPlaceDialog mode="edit" initialData={row.original}>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  <Pencil className="h-4 w-4 mr-2" />
                  Edit
                </DropdownMenuItem>
              </TourismPlaceDialog>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-red-600"
                onSelect={() => {
                  setSelectedPlace(row.original);
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

  if (places.length === 0) {
    return (
      <EmptyState
        icon={MapPin}
        title="No places added yet"
        description="Add your first tourist destination to showcase Monkayo's attractions"
      />
    );
  }

  return (
    <>
      <DataTable columns={columns} data={places} searchKey="title" />
      <DeleteDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDelete}
        title="Delete Place"
        description={`Are you sure you want to delete "${selectedPlace?.title}"? This action cannot be undone.`}
      />
    </>
  );
}
