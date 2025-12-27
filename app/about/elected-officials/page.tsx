import { getAllElectedOfficials } from "@/lib/actions/about";
import { PublicLayout } from "@/components/layout/public-layout";
import { ElectedOfficialsOrgChart } from "@/components/public/elected-officials";

export const metadata = {
  title: "Elected Officials | LGU Monkayo",
  description: "Meet our elected municipal officials serving the people of Monkayo, Davao de Oro"
};

export default async function ElectedOfficialsPage() {
  // Fetch officials data
  const officials = await getAllElectedOfficials();

  // Filter active officials only
  const activeOfficials = officials.filter(o => o.is_active);

  return (
    <PublicLayout>
      <ElectedOfficialsOrgChart officials={activeOfficials} />
    </PublicLayout>
  );
}
