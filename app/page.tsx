import { HeroSection } from '@/components/ui/hero-section';
import { fetchHomePageData } from '@/lib/strapi';
import type { HeroSectionData } from '@/lib/interfaces';

export async function generateMetadata() {
  try {
    const strapiData = await fetchHomePageData();
    return {
      title: strapiData.data.title,
      description: strapiData.data.description,
    };
  } catch {
    return {
      title: 'Home',
      description: '',
    };
  }
};

export default async function Home() {
  let title = '';
  let description = '';
  let slogan: string | undefined;
  let heroSection: HeroSectionData | undefined;

  try {
    const strapiData = await fetchHomePageData();
    title = strapiData.data.title ?? '';
    description = strapiData.data.description ?? '';
    slogan = strapiData.data.slogan;
    heroSection = strapiData.data?.sections?.find(
      (section): section is HeroSectionData =>
        typeof section === 'object' &&
        section !== null &&
        '__component' in section &&
        (section as { __component?: unknown }).__component === 'layout.hero-section'
    );
  } catch {
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-blue-950 to-slate-950">
      <section className="relative overflow-hidden border-b border-blue-900/30 bg-gradient-to-br from-blue-950/80 via-slate-900 to-blue-950/80 py-16 sm:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_70%)]" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-blue-500 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(96,165,250,0.5)]">
                {title || 'Welcome'}
              </span>
            </h1>
            {slogan && (
              <p className="mt-4 text-2xl font-semibold text-slate-300 sm:text-3xl">
                {slogan}
              </p>
            )}
            {description && (
              <p className="mt-6 text-lg leading-8 text-slate-300 sm:text-xl">
                {description}
              </p>
            )}
          </div>
        </div>
      </section>

      {heroSection && <HeroSection data={heroSection} />}
    </main>
  );
}
