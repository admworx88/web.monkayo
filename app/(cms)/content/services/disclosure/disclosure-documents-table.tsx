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
import { deleteDisclosure } from "@/lib/actions/services";
import { DisclosureDocumentDialog } from "./disclosure-document-dialog";
import type { Database } from "@/types/supabase";

type Disclosure = Database["public"]["Tables"]["disclosure_documents"]["Row"];

interface DisclosureDocumentsTableProps {
  disclosures: Disclosure[];
}

const categoryLabels: Record<string, string> = {
  annual_budget: "Annual Budget",
  procurement_bid: "Procurement/Bid",
};

export function DisclosureDocumentsTable({ disclosures }: DisclosureDocumentsTableProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedDisclosure, setSelectedDisclosure] = useState<Disclosure | null>(null);

  const handleDelete = async () => {
    if (!selectedDisclosure) return;

    const result = await deleteDisclosure(selectedDisclosure.id);
    if (result.success) {
      toast.success("Disclosure document deleted successfully");
    } else {
      toast.error(result.error || "Failed to delete disclosure document");
    }
  };

  const columns: ColumnDef<Disclosure>[] = [
    {
      accessorKey: "title",
      header: "Title",
      cell: ({ row }) => (
        <div className="flex items-start gap-3 min-w-0">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 flex-shrink-0">
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
      accessorKey: "fiscal_year",
      header: "Fiscal Year",
      cell: ({ row }) => (
        <div className="flex items-center gap-1.5 text-sm text-stone-600">
          {row.original.fiscal_year || "N/A"}
        </div>
      ),
    },
    {
      accessorKey: "download_count",
      header: "Downloads",
      cell: ({ row }) => (
        <div className="flex items-center gap-1.5 text-sm text-stone-600">
          {row.original.download_count || 0}
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
          <DisclosureDocumentDialog mode="edit" initialData={row.original}>
            <Button variant="ghost" size="sm">
              <Pencil className="h-4 w-4" />
            </Button>
          </DisclosureDocumentDialog>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DisclosureDocumentDialog mode="edit" initialData={row.original}>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  <Pencil className="h-4 w-4 mr-2" />
                  Edit
                </DropdownMenuItem>
              </DisclosureDocumentDialog>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-red-600"
                onSelect={() => {
                  setSelectedDisclosure(row.original);
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

  if (disclosures.length === 0) {
    return (
      <EmptyState
        icon={FileText}
        title="No disclosure documents yet"
        description="Add your first disclosure document for transparency and accountability"
      />
    );
  }

  return (
    <>
      <DataTable columns={columns} data={disclosures} searchKey="title" />
      <DeleteDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDelete}
        title="Delete Disclosure Document"
        description={`Are you sure you want to delete "${selectedDisclosure?.title}"? This action cannot be undone.`}
      />
    </>
  );
}
