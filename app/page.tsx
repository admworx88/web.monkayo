import {
  getHeroSlides,
  getVisionMission,
  getHomepageNews,
  getFAQs,
  getPartnerLogos,
} from '@/lib/actions/homepage';

import { HeroCarousel } from '@/components/homepage/hero-carousel';
import { VisionMissionSection } from '@/components/homepage/vision-mission-section';
import { NewsSection } from '@/components/homepage/news-section';
import { FAQSection } from '@/components/homepage/faq-section';
import { PartnersSection } from '@/components/homepage/partners-section';

export default async function HomePage() {
  // Fetch all homepage data in parallel
  const [heroSlides, visionMission, news, faqs, logos] = await Promise.all([
    getHeroSlides(),
    getVisionMission(),
    getHomepageNews(),
    getFAQs(),
    getPartnerLogos(),
  ]);

  return (
    <>
      <HeroCarousel slides={heroSlides} />
      <VisionMissionSection data={visionMission} />
      <NewsSection items={news} />
      <FAQSection items={faqs} />
      <PartnersSection logos={logos} />
    </>
  );
}
