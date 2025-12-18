import { cn } from "@/lib/utils";
import { CheckCircle, XCircle, Clock, Archive } from "lucide-react";

type Status = "active" | "inactive" | "draft" | "published" | "archived" | boolean;

interface StatusBadgeProps {
  status: Status;
  className?: string;
}

const statusConfig: Record<
  string,
  { label: string; icon: typeof CheckCircle; className: string }
> = {
  active: {
    label: "Active",
    icon: CheckCircle,
    className: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  inactive: {
    label: "Inactive",
    icon: XCircle,
    className: "bg-stone-50 text-stone-600 border-stone-200",
  },
  draft: {
    label: "Draft",
    icon: Clock,
    className: "bg-amber-50 text-amber-700 border-amber-200",
  },
  published: {
    label: "Published",
    icon: CheckCircle,
    className: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  archived: {
    label: "Archived",
    icon: Archive,
    className: "bg-stone-50 text-stone-600 border-stone-200",
  },
  true: {
    label: "Active",
    icon: CheckCircle,
    className: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  false: {
    label: "Inactive",
    icon: XCircle,
    className: "bg-stone-50 text-stone-600 border-stone-200",
  },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[String(status)] || statusConfig.inactive;
  const Icon = config.icon;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border",
        config.className,
        className
      )}
    >
      <Icon className="h-3 w-3" />
      {config.label}
    </span>
  );
}
