"use client";

import { useState } from "react";
import Image from "next/image";
import { ColumnDef } from "@tanstack/react-table";
import {
  MoreHorizontal,
  Pencil,
  Trash2,
  Award,
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
import { deletePartnerLogo } from "@/lib/actions/homepage";
import { LogoDialog } from "./logo-dialog";
import type { Database } from "@/types/supabase";

type LogoSection = Database["public"]["Tables"]["logo_section"]["Row"];

interface LogosTableProps {
  logos: LogoSection[];
}

export function LogosTable({ logos }: LogosTableProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedLogo, setSelectedLogo] = useState<LogoSection | null>(null);

  const handleDelete = async () => {
    if (!selectedLogo) return;

    const result = await deletePartnerLogo(selectedLogo.id);
    if (result.success) {
      toast.success("Logo deleted successfully");
    } else {
      toast.error(result.error || "Failed to delete logo");
    }
  };

  const columns: ColumnDef<LogoSection>[] = [
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
      accessorKey: "image_url",
      header: "Logo",
      cell: ({ row }) => (
        <div className="relative h-12 w-24 rounded-lg overflow-hidden bg-stone-100 ring-1 ring-stone-200/50 flex items-center justify-center">
          {row.original.image_url ? (
            <Image
              src={row.original.image_url}
              alt={row.original.name || "Logo"}
              fill
              className="object-contain p-1"
              unoptimized
            />
          ) : (
            <Award className="h-6 w-6 text-stone-400" />
          )}
        </div>
      ),
      size: 100,
    },
    {
      accessorKey: "name",
      header: "Partner",
      cell: ({ row }) => (
        <div className="min-w-0">
          <p className="font-medium text-stone-900 truncate">
            {row.original.name}
          </p>
          {row.original.link_url && (
            <a
              href={row.original.link_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs text-[amber-600] hover:underline mt-0.5"
            >
              <ExternalLink className="h-3 w-3" />
              Visit Website
            </a>
          )}
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
            <LogoDialog mode="edit" logo={row.original}>
              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                <Pencil className="h-4 w-4 mr-2" />
                Edit
              </DropdownMenuItem>
            </LogoDialog>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-red-600 focus:text-red-600"
              onSelect={() => {
                setSelectedLogo(row.original);
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

  if (logos.length === 0) {
    return (
      <EmptyState
        icon={Award}
        title="No partner logos yet"
        description="Add partner and government agency logos to display on the homepage."
      />
    );
  }

  return (
    <>
      <div className="p-1">
        <DataTable
          columns={columns}
          data={logos}
          searchKey="name"
          searchPlaceholder="Search logos..."
        />
      </div>

      <DeleteDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDelete}
        title="Delete Logo"
        itemName={selectedLogo?.name}
      />
    </>
  );
}
