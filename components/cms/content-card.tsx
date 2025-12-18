import { cn } from "@/lib/utils";

interface ContentCardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  description?: string;
  actions?: React.ReactNode;
  noPadding?: boolean;
}

export function ContentCard({
  children,
  className,
  title,
  description,
  actions,
  noPadding = false,
}: ContentCardProps) {
  return (
    <div
      className={cn(
        "bg-white dark:bg-stone-900 rounded-xl border border-stone-200/80 dark:border-stone-800/80 shadow-sm dark:shadow-stone-950/50",
        className
      )}
    >
      {(title || description || actions) && (
        <div className="flex items-center justify-between gap-4 px-6 py-4 border-b border-stone-100 dark:border-stone-800">
          <div className="min-w-0">
            {title && (
              <h3 className="font-semibold text-stone-900 dark:text-stone-100">{title}</h3>
            )}
            {description && (
              <p className="text-sm text-stone-500 dark:text-stone-400 mt-0.5">{description}</p>
            )}
          </div>
          {actions && (
            <div className="flex items-center gap-2 flex-shrink-0">{actions}</div>
          )}
        </div>
      )}
      <div className={cn(!noPadding && "p-6")}>{children}</div>
    </div>
  );
}
