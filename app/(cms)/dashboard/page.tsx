import {
  Newspaper,
  FileText,
  Users,
  Building2,
  MapPin,
  Image,
  HelpCircle,
  Briefcase,
  TrendingUp,
  Clock,
  Activity,
} from "lucide-react";
import Link from "next/link";
import { getDashboardStats, getContentCounts } from "@/lib/actions/admin";
import { PageHeader } from "@/components/cms/page-header";
import { ContentCard } from "@/components/cms/content-card";
import { cn } from "@/lib/utils";

export const metadata = {
  title: "Dashboard | LGU Monkayo CMS",
  description: "Content management dashboard for LGU Monkayo",
};

export default async function DashboardPage() {
  const [stats, contentCounts] = await Promise.all([
    getDashboardStats(),
    getContentCounts(),
  ]);

  return (
    <div className="flex flex-col min-h-screen">
      <PageHeader
        title="Dashboard"
        description="Overview of your content management system"
        breadcrumbs={[{ label: "Dashboard" }]}
      />

      <main className="flex-1 p-6 lg:p-8 space-y-8">
        {/* Main Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="News Articles"
            value={stats.totalNews}
            icon={Newspaper}
            href="/content/news/press-releases"
            trend="+12%"
            color="amber"
          />
          <StatCard
            title="Documents"
            value={stats.totalDocuments}
            icon={FileText}
            href="/content/documents/executive-orders"
            color="emerald"
          />
          <StatCard
            title="Departments"
            value={stats.totalDepartments}
            icon={Building2}
            href="/content/directory/departments"
            color="violet"
          />
          <StatCard
            title="Barangays"
            value={stats.totalBarangays}
            icon={MapPin}
            href="/content/directory/barangays"
            color="amber"
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Homepage Content */}
          <ContentCard
            title="Homepage Content"
            description="Quick stats for homepage sections"
            className="lg:col-span-2"
          >
            <div className="grid gap-4 sm:grid-cols-3">
              <QuickStatCard
                title="Hero Slides"
                value={contentCounts.homepage.heroSlides}
                icon={Image}
                href="/content/homepage/hero"
              />
              <QuickStatCard
                title="FAQs"
                value={contentCounts.homepage.faqs}
                icon={HelpCircle}
                href="/content/homepage/faqs"
              />
              <QuickStatCard
                title="News Feed"
                value={contentCounts.homepage.newsFeed}
                icon={Newspaper}
                href="/content/homepage/news-feed"
              />
            </div>

            <div className="mt-6 pt-6 border-t border-stone-100/30">
              <h4 className="text-sm font-medium text-stone-700 mb-4">
                Documents by Category
              </h4>
              <div className="grid gap-3 sm:grid-cols-2">
                <DocumentStat
                  label="Executive Orders"
                  count={contentCounts.documents.executiveOrders}
                  href="/content/documents/executive-orders"
                />
                <DocumentStat
                  label="Memorandum Orders"
                  count={contentCounts.documents.memorandumOrders}
                  href="/content/documents/memorandum-orders"
                />
                <DocumentStat
                  label="Municipal Ordinances"
                  count={contentCounts.documents.ordinances}
                  href="/content/documents/ordinances"
                />
                <DocumentStat
                  label="Other Forms"
                  count={contentCounts.documents.otherForms}
                  href="/content/documents/other-forms"
                />
              </div>
            </div>
          </ContentCard>

          {/* Recent Activity */}
          <ContentCard
            title="Recent Activity"
            description="Latest changes in the CMS"
          >
            <div className="space-y-4">
              {stats.recentActivity.length > 0 ? (
                stats.recentActivity
                  .slice(0, 6)
                  .map((activity) => (
                    <ActivityItem key={activity.id} activity={activity} />
                  ))
              ) : (
                <div className="text-center py-8 text-stone-500">
                  <Activity className="h-8 w-8 mx-auto mb-2 text-stone-300" />
                  <p className="text-sm">No recent activity</p>
                </div>
              )}
            </div>
          </ContentCard>
        </div>

        {/* Quick Actions */}
        <ContentCard
          title="Quick Actions"
          description="Common tasks and shortcuts"
        >
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <QuickAction
              title="Add Hero Slide"
              description="Create homepage carousel"
              href="/content/homepage/hero"
              icon={Image}
            />
            <QuickAction
              title="Post News"
              description="Add press release"
              href="/content/news/press-releases"
              icon={Newspaper}
            />
            <QuickAction
              title="Upload Document"
              description="Add new document"
              href="/content/documents/executive-orders"
              icon={FileText}
            />
            <QuickAction
              title="Post Job"
              description="Add job vacancy"
              href="/content/opportunities/jobs"
              icon={Briefcase}
            />
          </div>
        </ContentCard>
      </main>
    </div>
  );
}

// Stat Card Component
function StatCard({
  title,
  value,
  icon: Icon,
  href,
  trend,
  color = "amber",
}: {
  title: string;
  value: number;
  icon: typeof Newspaper;
  href: string;
  trend?: string;
  color?: "amber" | "emerald" | "violet";
}) {
  const colorClasses = {
    amber:
      "bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-500",
    emerald:
      "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-500",
    violet:
      "bg-violet-50 dark:bg-violet-900/20 text-violet-600 dark:text-violet-500",
  };

  return (
    <Link href={href}>
      <div className="group bg-white dark:bg-stone-900 rounded-xl border border-stone-200/80 dark:border-stone-800/80 p-5 hover:shadow-md hover:border-stone-300/80 dark:hover:border-stone-700/80 transition-all duration-200">
        <div className="flex items-start justify-between">
          <div
            className={cn(
              "flex h-11 w-11 items-center justify-center rounded-lg",
              colorClasses[color]
            )}
          >
            <Icon className="h-5 w-5" />
          </div>
          {trend && (
            <div className="flex items-center gap-1 text-xs font-medium text-emerald-600 dark:text-emerald-500">
              <TrendingUp className="h-3 w-3" />
              {trend}
            </div>
          )}
        </div>
        <div className="mt-4">
          <p className="text-3xl font-bold text-stone-900 dark:text-stone-100 tabular-nums">
            {value}
          </p>
          <p className="text-sm text-stone-500 dark:text-stone-400 mt-1 group-hover:text-stone-700 dark:group-hover:text-stone-300 transition-colors">
            {title}
          </p>
        </div>
      </div>
    </Link>
  );
}

// Quick Stat Card Component
function QuickStatCard({
  title,
  value,
  icon: Icon,
  href,
}: {
  title: string;
  value: number;
  icon: typeof Image;
  href: string;
}) {
  return (
    <Link href={href}>
      <div className="flex items-center gap-3 p-3 rounded-lg bg-stone-50/80 dark:bg-stone-800/80 hover:bg-stone-100 dark:hover:bg-stone-700 transition-colors">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white dark:bg-stone-900 ring-1 ring-stone-200/50 dark:ring-stone-700/50">
          <Icon className="h-5 w-5 text-stone-600 dark:text-stone-400" />
        </div>
        <div>
          <p className="text-2xl font-bold text-stone-900 dark:text-stone-100 tabular-nums">
            {value}
          </p>
          <p className="text-xs text-stone-500 dark:text-stone-400">{title}</p>
        </div>
      </div>
    </Link>
  );
}

// Document Stat Component
function DocumentStat({
  label,
  count,
  href,
}: {
  label: string;
  count: number;
  href: string;
}) {
  return (
    <Link href={href}>
      <div className="flex items-center justify-between p-3 rounded-lg hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors">
        <span className="text-sm text-stone-600 dark:text-stone-400">
          {label}
        </span>
        <span className="text-sm font-semibold text-stone-900 dark:text-stone-100 tabular-nums">
          {count}
        </span>
      </div>
    </Link>
  );
}

// Activity Item Component
function ActivityItem({
  activity,
}: {
  activity: {
    id: string;
    action: string;
    table_name: string;
    user_email: string | null;
    created_at: string | null;
  };
}) {
  const actionColors: Record<string, string> = {
    INSERT:
      "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400",
    UPDATE:
      "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400",
    DELETE: "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400",
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="flex items-start gap-3">
      <div
        className={cn(
          "flex-shrink-0 px-2 py-0.5 rounded text-[10px] font-medium uppercase",
          actionColors[activity.action] ||
            "bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300"
        )}
      >
        {activity.action}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm text-stone-700 dark:text-stone-300 truncate">
          {activity.table_name.replace(/_/g, " ")}
        </p>
        <div className="flex items-center gap-2 mt-0.5">
          <Clock className="h-3 w-3 text-stone-400 dark:text-stone-500" />
          <span className="text-xs text-stone-500 dark:text-stone-400">
            {activity.created_at ? formatDate(activity.created_at) : "N/A"}
          </span>
        </div>
      </div>
    </div>
  );
}

// Quick Action Component
function QuickAction({
  title,
  description,
  href,
  icon: Icon,
}: {
  title: string;
  description: string;
  href: string;
  icon: typeof Image;
}) {
  return (
    <Link href={href}>
      <div className="flex items-center gap-3 p-4 rounded-lg border border-stone-200 dark:border-stone-800 hover:border-amber-600/30 dark:hover:border-amber-500/30 hover:bg-amber-50/30 dark:hover:bg-amber-900/10 transition-all duration-200 group">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-stone-100 dark:bg-stone-800 group-hover:bg-amber-600 dark:group-hover:bg-amber-600 transition-colors">
          <Icon className="h-5 w-5 text-stone-600 dark:text-stone-400 group-hover:text-white transition-colors" />
        </div>
        <div className="min-w-0">
          <p className="font-medium text-stone-900 dark:text-stone-100 text-sm">
            {title}
          </p>
          <p className="text-xs text-stone-500 dark:text-stone-400">
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
}
