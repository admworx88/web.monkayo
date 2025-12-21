import Image from "next/image";

interface Partner {
  id: string;
  name: string;
  image_url: string;
  link_url: string | null;
  sort_order: number | null;
}

interface PartnersSectionProps {
  logos: Partner[];
}

export function PartnersSection({ logos }: PartnersSectionProps) {
  if (!logos || logos.length === 0) {
    return null;
  }

  return (
    <section className="py-16 md:py-20 bg-white border-t border-gray-200 ">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Our Partners & Affiliates
          </h2>
          <p className="text-gray-600">
            Working together to serve the people of Monkayo
          </p>
        </div>

        {/* Logos Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center">
          {logos.map((partner) => {
            const logoContent = (
              <div className="relative h-20 w-full grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100">
                <Image
                  src={partner.image_url}
                  alt={partner.name}
                  fill
                  className="object-contain"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 200px"
                  unoptimized
                />
              </div>
            );

            return partner.link_url ? (
              <a
                key={partner.id}
                href={partner.link_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center p-4 rounded-lg hover:bg-gray-50 transition-colors"
                title={partner.name}
              >
                {logoContent}
              </a>
            ) : (
              <div
                key={partner.id}
                className="flex items-center justify-center p-4"
                title={partner.name}
              >
                {logoContent}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
