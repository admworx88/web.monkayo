"use client";

import { useState } from "react";
import Image from "next/image";
import { ColumnDef } from "@tanstack/react-table";
import {
  MoreHorizontal,
  Pencil,
  Trash2,
  Users,
  Calendar,
  ImageIcon,
} from "lucide-react";
import { toast } from "sonner";

import { DataTable } from "@/components/cms/data-table";
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
import { deleteElectedOfficial } from "@/lib/actions/about";
import { OfficialDialog } from "./official-dialog";
import { BackgroundsDialog } from "./backgrounds-dialog";
import type { Database } from "@/types/supabase";

type ElectedOfficial = Database["public"]["Tables"]["elected_officials"]["Row"];

interface OfficialsTableProps {
  officials: ElectedOfficial[];
}

export function OfficialsTable({ officials }: OfficialsTableProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedOfficial, setSelectedOfficial] =
    useState<ElectedOfficial | null>(null);

  const handleDelete = async () => {
    if (!selectedOfficial) return;

    const result = await deleteElectedOfficial(selectedOfficial.id);
    if (result.success) {
      toast.success("Official deleted successfully");
    } else {
      toast.error(result.error || "Failed to delete official");
    }
  };

  const columns: ColumnDef<ElectedOfficial>[] = [
    {
      accessorKey: "name",
      header: "Name & Title",
      cell: ({ row }) => (
        <div className="flex items-start gap-3 min-w-0">
          <div className="relative h-10 w-10 rounded-lg overflow-hidden shrink-0 bg-indigo-50">
            {row.original.picture_url ? (
              <Image
                src={row.original.picture_url}
                alt={row.original.name}
                fill
                className="object-cover"
                sizes="40px"
                unoptimized
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-indigo-600">
                <Users className="h-5 w-5" />
              </div>
            )}
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-medium dark:text-stone-200 text-stone-800 truncate">
              {row.original.name}
            </p>
            {row.original.title && (
              <p className="text-sm text-stone-500 line-clamp-2 mt-0.5">
                {row.original.title}
              </p>
            )}
          </div>
        </div>
      ),
    },
    {
      accessorKey: "term",
      header: "Term",
      cell: ({ row }) => (
        <div className="text-sm text-stone-600">
          {row.original.term_start && row.original.term_end
            ? `${new Date(row.original.term_start).getFullYear()} - ${new Date(
                row.original.term_end
              ).getFullYear()}`
            : "—"}
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
      accessorKey: "is_active",
      header: "Status",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <div
            className={`h-2 w-2 rounded-full ${
              row.original.is_active ? "bg-green-500" : "bg-stone-300"
            }`}
          />
          <span className="text-sm text-stone-600">
            {row.original.is_active ? "Active" : "Inactive"}
          </span>
        </div>
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
          <OfficialDialog mode="edit" initialData={row.original}>
            <Button variant="ghost" size="sm">
              <Pencil className="h-4 w-4" />
            </Button>
          </OfficialDialog>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <OfficialDialog mode="edit" initialData={row.original}>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  <Pencil className="h-4 w-4 mr-2" />
                  Edit
                </DropdownMenuItem>
              </OfficialDialog>

              <BackgroundsDialog
                officialId={row.original.id}
                officialName={row.original.name}
              >
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  <ImageIcon className="h-4 w-4 mr-2" />
                  Manage Backgrounds
                </DropdownMenuItem>
              </BackgroundsDialog>

              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-red-600"
                onSelect={() => {
                  setSelectedOfficial(row.original);
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

  if (officials.length === 0) {
    return (
      <EmptyState
        icon={Users}
        title="No elected officials yet"
        description="Add your first elected official to showcase government leadership"
      />
    );
  }

  return (
    <>
      <DataTable columns={columns} data={officials} searchKey="name" />
      <DeleteDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDelete}
        title="Delete Elected Official"
        description={`Are you sure you want to delete "${selectedOfficial?.name}"? This action cannot be undone.`}
      />
    </>
  );
}
