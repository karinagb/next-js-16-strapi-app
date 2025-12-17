import { HeroSection } from '@/components/ui/hero-section';
import { fetchHomePageData } from '@/lib/strapi';


export default async function Home() {
  const strapiData = await fetchHomePageData();
  console.log('Strapi Data:', strapiData);
  const { title, description } = strapiData.data;
  const heroSection = strapiData.data?.sections?.find(
    (section) => section.__component === 'layout.hero-section'
  );

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">{title}</h1>
      <p className="text-lg mb-6">{description}</p>
      {heroSection && <HeroSection data={heroSection} />}
    </main>
  );
}
