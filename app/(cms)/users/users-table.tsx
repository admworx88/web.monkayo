"use client";

import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Pencil, User, Calendar, Shield } from "lucide-react";
import { toast } from "sonner";

import { DataTable } from "@/components/cms/data-table";
import { EmptyState } from "@/components/cms/empty-state";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toggleUserStatus } from "@/lib/actions/system";
import { UserDialog } from "./user-dialog";
import type { Database } from "@/types/supabase";

type User = Database["public"]["Tables"]["users"]["Row"];

interface UsersTableProps {
  users: User[];
}

export function UsersTable({ users }: UsersTableProps) {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleToggleStatus = async (userId: string, currentStatus: boolean) => {
    const result = await toggleUserStatus(userId, !currentStatus);
    if (result.success) {
      toast.success(
        `User ${!currentStatus ? "activated" : "deactivated"} successfully`
      );
    } else {
      toast.error(result.error || "Failed to update user status");
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "admin":
        return "default";
      case "staff":
        return "secondary";
      case "client":
        return "outline";
      default:
        return "outline";
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case "admin":
        return "Admin";
      case "staff":
        return "Staff";
      case "client":
        return "Client";
      default:
        return role;
    }
  };

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "email",
      header: "User",
      cell: ({ row }) => {
        const initials =
          `${row.original.first_name[0]}${row.original.last_name[0]}`.toUpperCase();
        return (
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={row.original.avatar_url || undefined} />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <p className="font-medium dark:text-stone-200 text-slate-800 truncate">
                {row.original.first_name} {row.original.last_name}
              </p>
              <p className="text-sm text-slate-500 truncate">
                {row.original.email}
              </p>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Shield className="h-4 w-4 text-slate-400" />
          <Badge variant={getRoleBadgeColor(row.original.role)}>
            {getRoleLabel(row.original.role)}
          </Badge>
        </div>
      ),
    },
    {
      accessorKey: "is_active",
      header: "Status",
      cell: ({ row }) => (
        <Badge variant={row.original.is_active ? "default" : "secondary"}>
          {row.original.is_active ? "Active" : "Inactive"}
        </Badge>
      ),
    },
    {
      accessorKey: "last_login_at",
      header: "Last Login",
      cell: ({ row }) => {
        const lastLogin = row.original.last_login_at;
        if (!lastLogin)
          return <span className="text-sm text-slate-400">Never</span>;

        return (
          <div className="flex items-center gap-1.5 text-sm text-slate-500">
            <Calendar className="h-3.5 w-3.5" />
            {new Date(lastLogin).toLocaleDateString()}
          </div>
        );
      },
    },
    {
      accessorKey: "created_at",
      header: "Created",
      cell: ({ row }) => (
        <div className="flex items-center gap-1.5 text-sm text-slate-500">
          <Calendar className="h-3.5 w-3.5" />
          {new Date(row.original.created_at).toLocaleDateString()}
        </div>
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <div className="flex items-center justify-end gap-2">
          <UserDialog mode="edit" initialData={row.original}>
            <Button variant="ghost" size="sm">
              <Pencil className="h-4 w-4" />
            </Button>
          </UserDialog>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <UserDialog mode="edit" initialData={row.original}>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  <Pencil className="h-4 w-4 mr-2" />
                  Edit
                </DropdownMenuItem>
              </UserDialog>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className={
                  row.original.is_active ? "text-orange-600" : "text-green-600"
                }
                onSelect={() =>
                  handleToggleStatus(
                    row.original.id,
                    row.original.is_active || false
                  )
                }
              >
                <User className="h-4 w-4 mr-2" />
                {row.original.is_active ? "Deactivate" : "Activate"}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
    },
  ];

  if (users.length === 0) {
    return (
      <EmptyState
        icon={User}
        title="No users yet"
        description="Invite users to access the CMS"
      />
    );
  }

  return <DataTable columns={columns} data={users} searchKey="email" />;
}
