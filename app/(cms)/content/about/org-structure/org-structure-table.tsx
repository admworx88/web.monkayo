"use client";

import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Pencil, Trash2, Network, Calendar } from "lucide-react";
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
import { deleteOrgStructure } from "@/lib/actions/about";
import { OrgStructureDialog } from "./org-structure-dialog";
import type { Database } from "@/types/supabase";

type OrgStructure = Database["public"]["Tables"]["organizational_structure"]["Row"];

interface OrgStructureTableProps {
  orgStructure: OrgStructure[];
}

export function OrgStructureTable({ orgStructure }: OrgStructureTableProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedOrgStructure, setSelectedOrgStructure] = useState<OrgStructure | null>(null);

  const handleDelete = async () => {
    if (!selectedOrgStructure) return;

    const result = await deleteOrgStructure(selectedOrgStructure.id);
    if (result.success) {
      toast.success("Organization entry deleted successfully");
    } else {
      toast.error(result.error || "Failed to delete organization entry");
    }
  };

  const columns: ColumnDef<OrgStructure>[] = [
    {
      accessorKey: "name",
      header: "Name & Title",
      cell: ({ row }) => (
        <div className="flex items-start gap-3 min-w-0">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50 text-blue-600 flex-shrink-0">
            <Network className="h-5 w-5" />
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
      accessorKey: "department",
      header: "Department",
      cell: ({ row }) => (
        <div className="text-sm text-stone-600">
          {row.original.department || "—"}
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
          <OrgStructureDialog mode="edit" initialData={row.original}>
            <Button variant="ghost" size="sm">
              <Pencil className="h-4 w-4" />
            </Button>
          </OrgStructureDialog>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <OrgStructureDialog mode="edit" initialData={row.original}>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  <Pencil className="h-4 w-4 mr-2" />
                  Edit
                </DropdownMenuItem>
              </OrgStructureDialog>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-red-600"
                onSelect={() => {
                  setSelectedOrgStructure(row.original);
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

  if (orgStructure.length === 0) {
    return (
      <EmptyState
        icon={Network}
        title="No organizational structure entries yet"
        description="Add your first organizational entry to showcase the government structure"
      />
    );
  }

  return (
    <>
      <DataTable columns={columns} data={orgStructure} searchKey="name" />
      <DeleteDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDelete}
        title="Delete Organization Entry"
        description={`Are you sure you want to delete "${selectedOrgStructure?.name}"? This action cannot be undone.`}
      />
    </>
  );
}
