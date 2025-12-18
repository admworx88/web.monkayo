"use client";

import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Pencil, Trash2, HelpCircle } from "lucide-react";
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
import { deleteFAQ } from "@/lib/actions/homepage";
import { FAQDialog } from "./faq-dialog";
import type { Database } from "@/types/supabase";

type FAQ = Database["public"]["Tables"]["faqs"]["Row"];

interface FAQsTableProps {
  faqs: FAQ[];
}

export function FAQsTable({ faqs }: FAQsTableProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedFAQ, setSelectedFAQ] = useState<FAQ | null>(null);

  const handleDelete = async () => {
    if (!selectedFAQ) return;

    const result = await deleteFAQ(selectedFAQ.id);
    if (result.success) {
      toast.success("FAQ deleted successfully");
    } else {
      toast.error(result.error || "Failed to delete FAQ");
    }
  };

  const columns: ColumnDef<FAQ>[] = [
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
      accessorKey: "question",
      header: "Question",
      cell: ({ row }) => (
        <div className="flex items-start gap-3 min-w-0">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50 text-[amber-600] flex-shrink-0">
            <HelpCircle className="h-4 w-4" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-medium text-stone-900 truncate">
              {row.original.question}
            </p>
            <p className="text-sm text-stone-500 line-clamp-1 mt-0.5">
              {row.original.answer}
            </p>
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
            <FAQDialog mode="edit" faq={row.original}>
              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                <Pencil className="h-4 w-4 mr-2" />
                Edit
              </DropdownMenuItem>
            </FAQDialog>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-red-600 focus:text-red-600"
              onSelect={() => {
                setSelectedFAQ(row.original);
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

  if (faqs.length === 0) {
    return (
      <EmptyState
        icon={HelpCircle}
        title="No FAQs yet"
        description="Add frequently asked questions to help citizens find answers quickly."
      />
    );
  }

  return (
    <>
      <div className="p-1">
        <DataTable
          columns={columns}
          data={faqs}
          searchKey="question"
          searchPlaceholder="Search FAQs..."
        />
      </div>

      <DeleteDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDelete}
        title="Delete FAQ"
        itemName={selectedFAQ?.question}
      />
    </>
  );
}
