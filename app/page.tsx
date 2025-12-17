import { HeroSection } from '@/components/ui/hero-section';
import { fetchHomePageData } from '@/lib/strapi';

export async function generateMetadata() {
  const strapiData = await fetchHomePageData();
  return {
    title: strapiData.data.title,
    description: strapiData.data.description,
  };
};

export default async function Home() {
  const strapiData = await fetchHomePageData();

  const { title, description, slogan } = strapiData.data;
  const heroSection = strapiData.data?.sections?.find(
    (section) => section.__component === 'layout.hero-section'
  );

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">{title}</h1>
      {slogan && (
        <p className="text-3xl text-muted-foreground mb-4">{slogan}</p>
      )}
      <p className="text-lg mb-6">{description}</p>
      {heroSection && <HeroSection data={heroSection} />}
    </main>
  );
}
