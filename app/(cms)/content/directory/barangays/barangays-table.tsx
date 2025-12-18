"use client";

import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Pencil, Trash2, MapPin, Mail, Phone, Facebook, User } from "lucide-react";
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
import { deleteBarangay } from "@/lib/actions/directory";
import { BarangayDialog } from "./barangay-dialog";
import type { Database } from "@/types/supabase";

type Barangay = Database["public"]["Tables"]["barangays"]["Row"];

interface BarangaysTableProps {
  barangays: Barangay[];
}

export function BarangaysTable({ barangays }: BarangaysTableProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedBarangay, setSelectedBarangay] = useState<Barangay | null>(null);

  const handleDelete = async () => {
    if (!selectedBarangay) return;

    const result = await deleteBarangay(selectedBarangay.id);
    if (result.success) {
      toast.success("Barangay deleted successfully");
    } else {
      toast.error(result.error || "Failed to delete barangay");
    }
  };

  const columns: ColumnDef<Barangay>[] = [
    {
      accessorKey: "name",
      header: "Barangay",
      cell: ({ row }) => (
        <div className="flex items-start gap-3 min-w-0">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50 text-amber-600 flex-shrink-0">
            <MapPin className="h-5 w-5" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-medium text-stone-900 truncate">
              {row.original.name}
            </p>
            {row.original.captain_name && (
              <div className="flex items-center gap-1.5 text-sm text-stone-500 mt-0.5">
                <User className="h-3.5 w-3.5" />
                <span className="truncate">Kap. {row.original.captain_name}</span>
              </div>
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
              <span className="truncate max-w-[180px]">{row.original.email}</span>
            </div>
          )}
          {row.original.contact_numbers && row.original.contact_numbers.length > 0 && (
            <div className="flex items-center gap-1.5 text-sm text-stone-600">
              <Phone className="h-3.5 w-3.5" />
              <span>{row.original.contact_numbers[0]}</span>
            </div>
          )}
        </div>
      ),
    },
    {
      accessorKey: "population",
      header: "Population",
      cell: ({ row }) =>
        row.original.population ? (
          <span className="text-stone-700 font-medium tabular-nums">
            {row.original.population.toLocaleString()}
          </span>
        ) : (
          <span className="text-stone-400">-</span>
        ),
      size: 100,
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
            <BarangayDialog mode="edit" barangay={row.original}>
              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                <Pencil className="h-4 w-4 mr-2" />
                Edit
              </DropdownMenuItem>
            </BarangayDialog>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-red-600 focus:text-red-600"
              onSelect={() => {
                setSelectedBarangay(row.original);
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

  if (barangays.length === 0) {
    return (
      <EmptyState
        icon={MapPin}
        title="No barangays yet"
        description="Add barangays to create a directory for citizens."
      />
    );
  }

  return (
    <>
      <div className="p-1">
        <DataTable
          columns={columns}
          data={barangays}
          searchKey="name"
          searchPlaceholder="Search barangays..."
        />
      </div>

      <DeleteDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDelete}
        title="Delete Barangay"
        itemName={selectedBarangay?.name}
      />
    </>
  );
}
