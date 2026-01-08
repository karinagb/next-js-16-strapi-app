import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { getStrapiImageUrl } from '@/lib/strapi';
import type { HeroSectionData } from '@/lib/interfaces';
import { ArrowRight } from 'lucide-react';

type HeroSectionProps = {
  data: HeroSectionData;
};

export function HeroSection({ data }: HeroSectionProps) {
  const { heading, subHeading, imageDescription, link, image } = data;

  const imageUrl = image?.url;
  const fullImageUrl = getStrapiImageUrl(imageUrl);
  const alt = image?.alternativeText ?? heading;

  return (
    <section 
      className="relative min-h-[600px] md:min-h-[700px] lg:min-h-[800px] overflow-hidden bg-gradient-to-b from-slate-950 via-blue-950 to-slate-950"
      style={fullImageUrl ? {
        backgroundImage: `url(${fullImageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center bottom',
        backgroundRepeat: 'no-repeat',
      } : {}}
    >
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-slate-950/10 via-slate-900/5 via-blue-950/5 to-slate-950/15" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-slate-950/8 via-transparent to-blue-950/8" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mx-auto max-w-4xl pt-12 sm:pt-16 lg:pt-20 pb-24 sm:pb-32 lg:pb-40">
          <div className="space-y-8 text-center">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl lg:text-5xl">
              <span className="bg-gradient-to-r from-cyan-300 via-blue-300 to-blue-400 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(0,0,0,0.8),0_2px_10px_rgba(0,0,0,0.9)]">
                {heading}
              </span>
            </h2>

            {subHeading && (
              <p className="text-base leading-7 text-slate-100 sm:text-lg md:text-xl max-w-3xl mx-auto drop-shadow-[0_2px_12px_rgba(0,0,0,0.9),0_0_8px_rgba(0,0,0,0.8)]">
                {subHeading}
              </p>
            )}

            {link && link.href && (
              <div className="pt-6">
                <Button
                  asChild
                  size="lg"
                  className="group bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white border-0 shadow-2xl shadow-blue-500/40 transition-all duration-300 hover:scale-110 hover:shadow-cyan-500/50 text-lg px-8 py-6"
                >
                  <Link
                    href={link.href}
                    target={link.isExternal ? '_blank' : undefined}
                    rel={link.isExternal ? 'noopener noreferrer' : undefined}
                    className="inline-flex items-center gap-2"
                  >
                    {link.label || 'Learn More'}
                    <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {imageDescription && fullImageUrl && (
        <div className="absolute bottom-0 left-0 right-0 z-10 pb-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-base sm:text-lg text-white italic text-right drop-shadow-[0_2px_8px_rgba(0,0,0,0.8),0_0_4px_rgba(0,0,0,0.9)]">
              {imageDescription}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
