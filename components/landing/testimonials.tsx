import { testimonials } from '@/lib/constants';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Star } from 'lucide-react';

export function Testimonials() {
  return (
    <section className="py-20 md:py-32 bg-muted/50" id="testimonials">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            Loved by people worldwide
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Showcase pricing to help with conversions. People feel related to see other people happy with their purchase.
            The more testimonials, the better.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.map((testimonial) => {
            const initials = testimonial.name
              .split(' ')
              .map((n) => n[0])
              .join('');
            return (
              <Card key={testimonial.name} className="relative">
                <CardContent className="pt-6 space-y-4">
                  <div className="flex items-center space-x-1">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-primary text-primary"
                      />
                    ))}
                  </div>
                  <p className="text-sm italic">"{testimonial.quote}"</p>
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-sm">{testimonial.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {testimonial.role} at {testimonial.company}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
