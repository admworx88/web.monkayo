"use client";

import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import {
  MoreHorizontal,
  Pencil,
  Trash2,
  GripVertical,
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
import { deleteFlagshipProgram } from "@/lib/actions/homepage";
import { FlagshipDialog } from "./flagship-dialog";
import type { Database } from "@/types/supabase";

type FlagshipProgram = Database["public"]["Tables"]["flagship_programs"]["Row"];

interface FlagshipTableProps {
  programs: FlagshipProgram[];
}

export function FlagshipTable({ programs }: FlagshipTableProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<FlagshipProgram | null>(null);

  const handleDelete = async () => {
    if (!selectedProgram) return;

    const result = await deleteFlagshipProgram(selectedProgram.id);
    if (result.success) {
      toast.success("Program deleted successfully");
    } else {
      toast.error(result.error || "Failed to delete program");
    }
  };

  const columns: ColumnDef<FlagshipProgram>[] = [
    {
      accessorKey: "sort_order",
      header: () => <span className="sr-only">Order</span>,
      cell: ({ row }) => (
        <div className="flex items-center justify-center w-8">
          <GripVertical className="h-4 w-4 text-stone-300" />
        </div>
      ),
      size: 40,
    },
    {
      accessorKey: "image_url",
      header: "Image",
      cell: ({ row }) => (
        <div className="relative h-20 w-20 rounded-lg overflow-hidden bg-stone-100 dark:bg-stone-900 ring-1 ring-stone-200/50 dark:ring-stone-800">
          {row.original.image_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={row.original.image_url}
              alt={row.original.title || "Program"}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-stone-400 dark:text-stone-500 text-xs">
              No image
            </div>
          )}
        </div>
      ),
      size: 120,
    },
    {
      accessorKey: "title",
      header: "Title & Description",
      cell: ({ row }) => (
        <div className="min-w-0">
          <p className="font-medium dark:text-stone-200 text-stone-800 truncate">
            {row.original.title || "Untitled"}
          </p>
          {row.original.description && (
            <p className="text-sm text-stone-500 truncate mt-0.5">
              {row.original.description}
            </p>
          )}
        </div>
      ),
    },
    {
      accessorKey: "link_url",
      header: "Link",
      cell: ({ row }) =>
        row.original.link_url ? (
          <a
            href={row.original.link_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm text-amber-600 hover:underline"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            <span className="max-w-[120px] truncate">
              {row.original.link_url}
            </span>
          </a>
        ) : (
          <span className="text-stone-400 text-sm">No link</span>
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
            <FlagshipDialog mode="edit" program={row.original}>
              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                <Pencil className="h-4 w-4 mr-2" />
                Edit
              </DropdownMenuItem>
            </FlagshipDialog>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-red-600 focus:text-red-600"
              onSelect={() => {
                setSelectedProgram(row.original);
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

  if (programs.length === 0) {
    return (
      <EmptyState
        title="No flagship programs yet"
        description="Add your first program to showcase government initiatives on the homepage."
        action={{
          label: "Add Program",
          onClick: () => {},
        }}
      />
    );
  }

  return (
    <>
      <div className="p-1">
        <DataTable
          columns={columns}
          data={programs}
          searchKey="title"
          searchPlaceholder="Search programs..."
        />
      </div>

      <DeleteDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDelete}
        title="Delete Program"
        itemName={selectedProgram?.title || "this program"}
      />
    </>
  );
}
