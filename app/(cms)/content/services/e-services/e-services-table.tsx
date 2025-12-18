"use client";

import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Pencil, Trash2, FileText, Calendar } from "lucide-react";
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
import { Badge } from "@/components/ui/badge";
import { deleteEService } from "@/lib/actions/services";
import { EServiceDialog } from "./e-service-dialog";
import type { Database } from "@/types/supabase";

type EService = Database["public"]["Tables"]["eservices"]["Row"];

interface EServicesTableProps {
  eservices: EService[];
}

const categoryLabels: Record<string, string> = {
  new_business_application: "New Business",
  renewal: "Renewal",
  civil_registry: "Civil Registry",
};

export function EServicesTable({ eservices }: EServicesTableProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<EService | null>(null);

  const handleDelete = async () => {
    if (!selectedService) return;

    const result = await deleteEService(selectedService.id);
    if (result.success) {
      toast.success("e-Service deleted successfully");
    } else {
      toast.error(result.error || "Failed to delete e-service");
    }
  };

  const columns: ColumnDef<EService>[] = [
    {
      accessorKey: "title",
      header: "Title",
      cell: ({ row }) => (
        <div className="flex items-start gap-3 min-w-0">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50 text-blue-600 flex-shrink-0">
            <FileText className="h-5 w-5" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-medium text-stone-900 truncate">
              {row.original.title}
            </p>
            {row.original.description && (
              <p className="text-sm text-stone-500 line-clamp-2 mt-0.5">
                {row.original.description.substring(0, 100)}...
              </p>
            )}
          </div>
        </div>
      ),
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => (
        <Badge variant="outline" className="font-normal">
          {categoryLabels[row.original.category] || row.original.category}
        </Badge>
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
          <EServiceDialog mode="edit" initialData={row.original}>
            <Button variant="ghost" size="sm">
              <Pencil className="h-4 w-4" />
            </Button>
          </EServiceDialog>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <EServiceDialog mode="edit" initialData={row.original}>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  <Pencil className="h-4 w-4 mr-2" />
                  Edit
                </DropdownMenuItem>
              </EServiceDialog>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-red-600"
                onSelect={() => {
                  setSelectedService(row.original);
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

  if (eservices.length === 0) {
    return (
      <EmptyState
        icon={FileText}
        title="No e-services yet"
        description="Add your first e-service to help citizens access online services"
      />
    );
  }

  return (
    <>
      <DataTable columns={columns} data={eservices} searchKey="title" />
      <DeleteDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDelete}
        title="Delete e-Service"
        description={`Are you sure you want to delete "${selectedService?.title}"? This action cannot be undone.`}
      />
    </>
  );
}
