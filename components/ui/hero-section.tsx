
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { getStrapiImageUrl } from '@/lib/strapi';

export type StrapiImage = {
  id: number;
  documentId?: string;
  url: string;
  alternativeText?: string;
  width?: number;
  height?: number;
};

export type HeroSectionData = {
  heading: string;
  subHeading?: string;
  species?: string;
  link?: {
    label?: string;
    href: string;
    isExternal?: boolean;
  };
  image?: StrapiImage;
};

type HeroSectionProps = {
  data: HeroSectionData;
};

export function HeroSection({ data }: HeroSectionProps) {
  const { heading, subHeading, species, link, image } = data;

  const imageUrl = image?.url;
  const fullImageUrl = getStrapiImageUrl(imageUrl);
  const alt = image?.alternativeText ?? heading;

  return (
    <section className="py-20">
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
      
        <div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {heading}
          </h1>

          {subHeading && (
            <p className="text-lg text-muted-foreground mb-8">
              {subHeading}
            </p>
          )}

          {link && link.href && (
            <Button asChild>
              <Link
                href={link.href}
                target={link.isExternal ? '_blank' : undefined}
                rel={link.isExternal ? 'noopener noreferrer' : undefined}
              >
                {link.label || 'Learn More'}
              </Link>
            </Button>
          )}
        </div>

    
        {fullImageUrl && (
          <div>
            <div className="relative w-full h-[320px] md:h-[420px] rounded-xl overflow-hidden">
              <Image
                src={fullImageUrl}
                alt={alt}
                fill
                className="object-cover"
                priority
                unoptimized
              />
            </div>
            {species && (
              <p className="text-sm text-muted-foreground italic mt-2 text-center">
                {species}
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
