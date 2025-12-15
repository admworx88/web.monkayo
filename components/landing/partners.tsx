import { partners } from '@/lib/constants';

export function Partners() {
  return (
    <section className="border-y bg-muted/50 py-12">
      <div className="container mx-auto px-4">
        <p className="text-center text-sm text-muted-foreground mb-8">
          Trusted by companies at
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8 items-center justify-items-center">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="flex items-center justify-center grayscale hover:grayscale-0 transition-all opacity-60 hover:opacity-100"
            >
              <div className="w-24 h-12 flex items-center justify-center">
                <span className="text-xl font-bold">{partner.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
