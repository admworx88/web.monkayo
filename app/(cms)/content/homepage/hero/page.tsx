import { Suspense } from "react";
import { Plus } from "lucide-react";
import { getAllHeroSlides } from "@/lib/actions/homepage";
import { PageHeader } from "@/components/cms/page-header";
import { ContentCard } from "@/components/cms/content-card";
import { LoadingState } from "@/components/cms/loading-state";
import { Button } from "@/components/ui/button";
import { HeroSlidesTable } from "./hero-slides-table";
import { HeroSlideDialog } from "./hero-slide-dialog";

export const metadata = {
  title: "Hero Slides | LGU Monkayo CMS",
  description: "Manage homepage hero carousel slides",
};

export default async function HeroSlidesPage() {
  const slides = await getAllHeroSlides();

  return (
    <div className="flex flex-col min-h-screen">
      <PageHeader
        title="Hero Slides"
        description="Manage the homepage carousel images and content"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Homepage", href: "/content/homepage/hero" },
          { label: "Hero Slides" },
        ]}
        actions={
          <HeroSlideDialog mode="create">
            <Button size="sm" className="bg-amber-600 hover:bg-amber-700 text-white dark:bg-amber-600 dark:hover:bg-amber-700">
              <Plus className="h-4 w-4 mr-1.5" />
              Add Slide
            </Button>
          </HeroSlideDialog>
        }
      />

      <main className="flex-1 p-4 lg:p-6">
        <ContentCard noPadding>
          <Suspense fallback={<LoadingState rows={5} className="p-6" />}>
            <HeroSlidesTable slides={slides} />
          </Suspense>
        </ContentCard>
      </main>
    </div>
  );
}
