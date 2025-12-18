"use client";

import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Pencil, Trash2, Briefcase, Calendar, Clock } from "lucide-react";
import { toast } from "sonner";

import { DataTable } from "@/components/cms/data-table";
import { StatusBadge } from "@/components/cms/status-badge";
import { DeleteDialog } from "@/components/cms/delete-dialog";
import { EmptyState } from "@/components/cms/empty-state";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteJobVacancy } from "@/lib/actions/opportunities";
import { JobVacancyDialog } from "./job-vacancy-dialog";
import type { Database } from "@/types/supabase";

type JobVacancy = Database["public"]["Tables"]["job_vacancies"]["Row"];

interface JobVacanciesTableProps {
  vacancies: JobVacancy[];
}

export function JobVacanciesTable({ vacancies }: JobVacanciesTableProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedVacancy, setSelectedVacancy] = useState<JobVacancy | null>(null);

  const handleDelete = async () => {
    if (!selectedVacancy) return;

    const result = await deleteJobVacancy(selectedVacancy.id);
    if (result.success) {
      toast.success("Job vacancy deleted successfully");
    } else {
      toast.error(result.error || "Failed to delete job vacancy");
    }
  };

  const columns: ColumnDef<JobVacancy>[] = [
    {
      accessorKey: "title",
      header: "Job Title",
      cell: ({ row }) => (
        <div className="flex items-start gap-3 min-w-0">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50 text-blue-600 flex-shrink-0">
            <Briefcase className="h-5 w-5" />
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
            <div className="flex items-center gap-2 mt-1">
              {row.original.employment_type && (
                <Badge variant="outline" className="text-xs">
                  {row.original.employment_type}
                </Badge>
              )}
              {row.original.salary_grade && (
                <Badge variant="outline" className="text-xs">
                  SG {row.original.salary_grade}
                </Badge>
              )}
            </div>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "deadline",
      header: "Deadline",
      cell: ({ row }) => {
        const deadline = row.original.deadline;
        if (!deadline) return <span className="text-sm text-stone-400">No deadline</span>;

        const deadlineDate = new Date(deadline);
        const today = new Date();
        const isExpired = deadlineDate < today;

        return (
          <div className={`flex items-center gap-1.5 text-sm ${isExpired ? 'text-red-600' : 'text-stone-700'}`}>
            <Clock className="h-3.5 w-3.5" />
            {deadlineDate.toLocaleDateString()}
            {isExpired && (
              <Badge variant="destructive" className="text-xs ml-1">Expired</Badge>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "is_open",
      header: "Open",
      cell: ({ row }) => (
        <Badge variant={row.original.is_open ? "default" : "secondary"}>
          {row.original.is_open ? "Open" : "Closed"}
        </Badge>
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
          <JobVacancyDialog mode="edit" initialData={row.original}>
            <Button variant="ghost" size="sm">
              <Pencil className="h-4 w-4" />
            </Button>
          </JobVacancyDialog>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <JobVacancyDialog mode="edit" initialData={row.original}>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  <Pencil className="h-4 w-4 mr-2" />
                  Edit
                </DropdownMenuItem>
              </JobVacancyDialog>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-red-600"
                onSelect={() => {
                  setSelectedVacancy(row.original);
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

  if (vacancies.length === 0) {
    return (
      <EmptyState
        icon={Briefcase}
        title="No job vacancies yet"
        description="Add your first job vacancy to attract qualified applicants"
      />
    );
  }

  return (
    <>
      <DataTable columns={columns} data={vacancies} searchKey="title" />
      <DeleteDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDelete}
        title="Delete Job Vacancy"
        description={`Are you sure you want to delete "${selectedVacancy?.title}"? This action cannot be undone.`}
      />
    </>
  );
}
