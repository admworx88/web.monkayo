import { Suspense } from "react";
import { Plus } from "lucide-react";
import { getAllHomepageNews } from "@/lib/actions/homepage";
import { PageHeader } from "@/components/cms/page-header";
import { ContentCard } from "@/components/cms/content-card";
import { LoadingState } from "@/components/cms/loading-state";
import { Button } from "@/components/ui/button";
import { NewsFeedTable } from "./news-feed-table";
import { NewsFeedDialog } from "./news-feed-dialog";

export const metadata = {
  title: "News Feed | LGU Monkayo CMS",
  description: "Manage homepage Facebook news embeds",
};

export default async function NewsFeedPage() {
  const news = await getAllHomepageNews();

  return (
    <div className="flex flex-col min-h-screen">
      <PageHeader
        title="News Feed"
        description="Manage Facebook post embeds displayed on the homepage"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Homepage", href: "/content/homepage/hero" },
          { label: "News Feed" },
        ]}
        actions={
          <NewsFeedDialog mode="create">
            <Button size="sm" className="bg-amber-600 hover:bg-amber-700 text-white dark:bg-amber-600 dark:hover:bg-amber-700">
              <Plus className="h-4 w-4 mr-1.5" />
              Add News
            </Button>
          </NewsFeedDialog>
        }
      />

      <main className="flex-1 p-4 lg:p-6">
        <ContentCard noPadding>
          <Suspense fallback={<LoadingState rows={5} className="p-6" />}>
            <NewsFeedTable news={news} />
          </Suspense>
        </ContentCard>
      </main>
    </div>
  );
}
