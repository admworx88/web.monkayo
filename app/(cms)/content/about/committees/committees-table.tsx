"use client";

import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Pencil, Trash2, Users2, Calendar } from "lucide-react";
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
import { deleteCommittee } from "@/lib/actions/about";
import { CommitteeDialog } from "./committee-dialog";
import type { Database } from "@/types/supabase";

type Committee = Database["public"]["Tables"]["committees"]["Row"];

interface CommitteesTableProps {
  committees: Committee[];
}

export function CommitteesTable({ committees }: CommitteesTableProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedCommittee, setSelectedCommittee] = useState<Committee | null>(null);

  const handleDelete = async () => {
    if (!selectedCommittee) return;

    const result = await deleteCommittee(selectedCommittee.id);
    if (result.success) {
      toast.success("Committee deleted successfully");
    } else {
      toast.error(result.error || "Failed to delete committee");
    }
  };

  const columns: ColumnDef<Committee>[] = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => (
        <div className="flex items-start gap-3 min-w-0">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-50 text-purple-600 flex-shrink-0">
            <Users2 className="h-5 w-5" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-medium text-stone-900 truncate">
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
      accessorKey: "chairman",
      header: "Chairman",
      cell: ({ row }) => (
        <div className="text-sm text-stone-600">
          {row.original.chairman || "—"}
        </div>
      ),
    },
    {
      accessorKey: "members",
      header: "Members",
      cell: ({ row }) => (
        <div className="text-sm text-stone-600">
          {row.original.members && row.original.members.length > 0
            ? `${row.original.members.length} members`
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
          <CommitteeDialog mode="edit" initialData={row.original}>
            <Button variant="ghost" size="sm">
              <Pencil className="h-4 w-4" />
            </Button>
          </CommitteeDialog>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <CommitteeDialog mode="edit" initialData={row.original}>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  <Pencil className="h-4 w-4 mr-2" />
                  Edit
                </DropdownMenuItem>
              </CommitteeDialog>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-red-600"
                onSelect={() => {
                  setSelectedCommittee(row.original);
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

  if (committees.length === 0) {
    return (
      <EmptyState
        icon={Users2}
        title="No committees yet"
        description="Add your first committee to showcase municipal committees"
      />
    );
  }

  return (
    <>
      <DataTable columns={columns} data={committees} searchKey="name" />
      <DeleteDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDelete}
        title="Delete Committee"
        description={`Are you sure you want to delete "${selectedCommittee?.name}"? This action cannot be undone.`}
      />
    </>
  );
}
