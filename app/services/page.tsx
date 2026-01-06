import type { ServicesSection, Service } from '@/lib/interfaces';
import { fetchServicesPage } from '@/lib/strapi';

export default async function ServicesPage() {
  const response = await fetchServicesPage();
  const page = response.data;

  return (
    <main className='container mx-auto px-4'>
      <h1 className='text-4xl font-bold'>{page.title}</h1>
      <p className='mt-4 text-gray-600'>{page.description}</p>

      {page.sections?.map((section, i) => {
        if (section.__component !== 'layout.services-section') return null;

        const servicesSection = section as ServicesSection;

        return (
          <section key={i}>
            {servicesSection.services?.map((service, j) => (
              <div key={j}>
                <h3>{service.title}</h3>
              </div>
            ))}
          </section>
        );
      })}
    </main>
  );
}
