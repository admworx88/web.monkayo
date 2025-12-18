"use client";

import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Pencil, Trash2, FileCheck, Calendar } from "lucide-react";
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
import { deleteOtherForm } from "@/lib/actions/documents";
import { OtherFormDialog } from "./other-form-dialog";
import type { Database } from "@/types/supabase";

type Document = Database["public"]["Tables"]["documents"]["Row"];

interface OtherFormsTableProps {
  otherForms: Document[];
}

export function OtherFormsTable({ otherForms }: OtherFormsTableProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);

  const handleDelete = async () => {
    if (!selectedDocument) return;

    const result = await deleteOtherForm(selectedDocument.id);
    if (result.success) {
      toast.success("Form deleted successfully");
    } else {
      toast.error(result.error || "Failed to delete form");
    }
  };

  const columns: ColumnDef<Document>[] = [
    {
      accessorKey: "title",
      header: "Title",
      cell: ({ row }) => (
        <div className="flex items-start gap-3 min-w-0">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-50 text-orange-600 flex-shrink-0">
            <FileCheck className="h-5 w-5" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-medium text-stone-900 truncate">
              {row.original.title}
            </p>
            {row.original.document_number && (
              <p className="text-sm text-stone-500 mt-0.5">
                {row.original.document_number}
              </p>
            )}
          </div>
        </div>
      ),
    },
    {
      accessorKey: "file_name",
      header: "File",
      cell: ({ row }) => (
        <div className="text-sm text-stone-600">
          {row.original.file_name || "No file"}
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
          <OtherFormDialog mode="edit" initialData={row.original}>
            <Button variant="ghost" size="sm">
              <Pencil className="h-4 w-4" />
            </Button>
          </OtherFormDialog>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <OtherFormDialog mode="edit" initialData={row.original}>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  <Pencil className="h-4 w-4 mr-2" />
                  Edit
                </DropdownMenuItem>
              </OtherFormDialog>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-red-600"
                onSelect={() => {
                  setSelectedDocument(row.original);
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

  if (otherForms.length === 0) {
    return (
      <EmptyState
        icon={FileCheck}
        title="No forms yet"
        description="Add your first form or document"
      />
    );
  }

  return (
    <>
      <DataTable columns={columns} data={otherForms} searchKey="title" />
      <DeleteDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDelete}
        title="Delete Form"
        description={`Are you sure you want to delete "${selectedDocument?.title}"? This action cannot be undone.`}
      />
    </>
  );
}
