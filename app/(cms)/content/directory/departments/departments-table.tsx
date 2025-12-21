"use client";

import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import {
  MoreHorizontal,
  Pencil,
  Trash2,
  Building2,
  Mail,
  Phone,
  Facebook,
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
import { deleteDepartment } from "@/lib/actions/directory";
import { DepartmentDialog } from "./department-dialog";
import type { Database } from "@/types/supabase";

type Department = Database["public"]["Tables"]["departments"]["Row"];

interface DepartmentsTableProps {
  departments: Department[];
}

export function DepartmentsTable({ departments }: DepartmentsTableProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] =
    useState<Department | null>(null);

  const handleDelete = async () => {
    if (!selectedDepartment) return;

    const result = await deleteDepartment(selectedDepartment.id);
    if (result.success) {
      toast.success("Department deleted successfully");
    } else {
      toast.error(result.error || "Failed to delete department");
    }
  };

  const columns: ColumnDef<Department>[] = [
    {
      accessorKey: "name",
      header: "Department",
      cell: ({ row }) => (
        <div className="flex items-start gap-3 min-w-0">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-stone-100 text-stone-600 flex-shrink-0">
            <Building2 className="h-5 w-5" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-medium dark:text-stone-200 text-stone-800 truncate">
              {row.original.name}
            </p>
            {row.original.head_name && (
              <p className="text-sm text-stone-500 truncate mt-0.5">
                Head: {row.original.head_name}
              </p>
            )}
          </div>
        </div>
      ),
    },
    {
      accessorKey: "email",
      header: "Contact",
      cell: ({ row }) => (
        <div className="space-y-1">
          {row.original.email && (
            <div className="flex items-center gap-1.5 text-sm text-stone-600">
              <Mail className="h-3.5 w-3.5" />
              <span className="truncate max-w-[180px]">
                {row.original.email}
              </span>
            </div>
          )}
          {row.original.contact_numbers &&
            row.original.contact_numbers.length > 0 && (
              <div className="flex items-center gap-1.5 text-sm text-stone-600">
                <Phone className="h-3.5 w-3.5" />
                <span>{row.original.contact_numbers[0]}</span>
              </div>
            )}
        </div>
      ),
    },
    {
      accessorKey: "facebook_link",
      header: "Social",
      cell: ({ row }) =>
        row.original.facebook_link ? (
          <a
            href={row.original.facebook_link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-[amber-600] hover:underline"
          >
            <Facebook className="h-3.5 w-3.5" />
            <span>Facebook</span>
          </a>
        ) : (
          <span className="text-stone-400 text-sm">-</span>
        ),
      size: 100,
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
            <DepartmentDialog mode="edit" department={row.original}>
              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                <Pencil className="h-4 w-4 mr-2" />
                Edit
              </DropdownMenuItem>
            </DepartmentDialog>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-red-600 focus:text-red-600"
              onSelect={() => {
                setSelectedDepartment(row.original);
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

  if (departments.length === 0) {
    return (
      <EmptyState
        icon={Building2}
        title="No departments yet"
        description="Add municipal departments to create a directory for citizens."
      />
    );
  }

  return (
    <>
      <div className="p-1">
        <DataTable
          columns={columns}
          data={departments}
          searchKey="name"
          searchPlaceholder="Search departments..."
        />
      </div>

      <DeleteDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDelete}
        title="Delete Department"
        itemName={selectedDepartment?.name}
      />
    </>
  );
}
