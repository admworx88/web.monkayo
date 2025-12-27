import {
  getHeroSlides,
  getVisionMission,
  getHomepageNews,
  getFAQs,
  getPartnerLogos,
  getFlagshipPrograms,
} from "@/lib/actions/homepage";

import { PublicLayout } from "@/components/layout/public-layout";
import { MinimalHero } from "@/components/homepage/minimal-hero";
import { FlagshipProgramsSection } from "@/components/homepage/flagship-programs-section";
import { QuickServices } from "@/components/homepage/quick-services";
import { ModernNewsSection } from "@/components/homepage/modern-news-section";
import { MinimalVisionMission } from "@/components/homepage/minimal-vision-mission";
import { MinimalFAQ } from "@/components/homepage/minimal-faq";
import { MinimalPartners } from "@/components/homepage/minimal-partners";
import { MinimalStats } from "@/components/homepage/minimal-stats";

export default async function HomePage() {
  // Fetch all homepage data in parallel
  const [heroSlides, visionMission, news, faqs, logos, flagshipPrograms] = await Promise.all([
    getHeroSlides(),
    getVisionMission(),
    getHomepageNews(),
    getFAQs(),
    getPartnerLogos(),
    getFlagshipPrograms(),
  ]);

  return (
    <PublicLayout>
      <MinimalHero slides={heroSlides} />
      <FlagshipProgramsSection programs={flagshipPrograms} />
      <ModernNewsSection items={news} />
      <MinimalVisionMission data={visionMission} />
      <MinimalPartners logos={logos} />
      <QuickServices />
      <MinimalStats />
      <MinimalFAQ items={faqs} />
    </PublicLayout>
  );
}
