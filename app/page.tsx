import { Button } from '@/components/ui/button';
import { fetchStrapiData } from '@/lib/strapi';


export default async function Home() {
  const strapiData = await fetchStrapiData('/api/home-page');
  const { title, description } = strapiData.data;

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">{title}</h1>
      <p className="text-lg mb-6">{description}</p>
      <Button>Click me</Button>
    </main>
  );
}
