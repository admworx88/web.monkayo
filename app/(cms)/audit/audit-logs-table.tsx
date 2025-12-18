"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Calendar, FileText, User, Activity } from "lucide-react";

import { DataTable } from "@/components/cms/data-table";
import { EmptyState } from "@/components/cms/empty-state";
import { Badge } from "@/components/ui/badge";
import type { Database } from "@/types/supabase";

type AuditLog = Database["public"]["Tables"]["audit_logs"]["Row"];

interface AuditLogsTableProps {
  logs: AuditLog[];
}

export function AuditLogsTable({ logs }: AuditLogsTableProps) {
  const getActionBadgeColor = (action: string) => {
    switch (action.toLowerCase()) {
      case "create":
      case "insert":
        return "default";
      case "update":
        return "secondary";
      case "delete":
        return "destructive";
      default:
        return "outline";
    }
  };

  const getActionLabel = (action: string) => {
    return action.toUpperCase();
  };

  const columns: ColumnDef<AuditLog>[] = [
    {
      accessorKey: "created_at",
      header: "Timestamp",
      cell: ({ row }) => {
        const date = new Date(row.original.created_at!);
        return (
          <div className="min-w-[120px]">
            <div className="flex items-center gap-1.5 text-sm text-slate-900 font-medium">
              <Calendar className="h-3.5 w-3.5" />
              {date.toLocaleDateString()}
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {date.toLocaleTimeString()}
            </p>
          </div>
        );
      },
    },
    {
      accessorKey: "user_email",
      header: "User",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-600 flex-shrink-0">
            <User className="h-4 w-4" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-slate-900 truncate">
              {row.original.user_email || "System"}
            </p>
            {row.original.ip_address && (
              <p className="text-xs text-slate-500">
                {row.original.ip_address}
              </p>
            )}
          </div>
        </div>
      ),
    },
    {
      accessorKey: "action",
      header: "Action",
      cell: ({ row }) => (
        <Badge variant={getActionBadgeColor(row.original.action)}>
          {getActionLabel(row.original.action)}
        </Badge>
      ),
    },
    {
      accessorKey: "table_name",
      header: "Table",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-slate-400" />
          <code className="text-sm font-mono bg-slate-100 px-2 py-0.5 rounded">
            {row.original.table_name}
          </code>
        </div>
      ),
    },
    {
      accessorKey: "record_id",
      header: "Record ID",
      cell: ({ row }) => {
        if (!row.original.record_id) {
          return <span className="text-sm text-slate-400">—</span>;
        }
        return (
          <code className="text-xs font-mono bg-slate-100 px-2 py-0.5 rounded text-slate-600">
            {row.original.record_id.substring(0, 8)}...
          </code>
        );
      },
    },
    {
      id: "changes",
      header: "Changes",
      cell: ({ row }) => {
        const hasOldData = row.original.old_data;
        const hasNewData = row.original.new_data;

        if (!hasOldData && !hasNewData) {
          return <span className="text-sm text-slate-400">—</span>;
        }

        return (
          <div className="flex items-center gap-2">
            <Activity className="h-3.5 w-3.5 text-slate-400" />
            <span className="text-xs text-slate-600">
              {hasOldData && hasNewData ? "Updated" : hasNewData ? "Created" : "Deleted"}
            </span>
          </div>
        );
      },
    },
  ];

  if (logs.length === 0) {
    return (
      <EmptyState
        icon={Activity}
        title="No audit logs yet"
        description="Activity logs will appear here as users make changes"
      />
    );
  }

  return (
    <DataTable
      columns={columns}
      data={logs}
      searchKey="table_name"
      searchPlaceholder="Filter by table name..."
    />
  );
}
