import { howItWorksSteps } from '@/lib/constants';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export function HowItWorks() {
  return (
    <section className="py-20 md:py-32 bg-muted/50" id="how-it-works">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            How it works?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get started with our product in 3 simple steps
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {howItWorksSteps.map((step) => (
            <Card key={step.step} className="relative">
              <CardHeader>
                <Badge className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold mb-4">
                  {step.step}
                </Badge>
                <CardTitle>{step.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{step.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
