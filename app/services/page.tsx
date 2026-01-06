import Image from 'next/image';
import type { ServicesSection } from '@/lib/interfaces';
import { fetchServicesPage, getStrapiImageUrl } from '@/lib/strapi';

export default async function ServicesPage() {
  const response = await fetchServicesPage();
  const page = response.data;

  return (
    <main className="container mx-auto px-4">
      <h1 className="text-4xl font-bold">{page.title}</h1>
      <p className="mt-4 text-gray-600">{page.description}</p>

      {page.sections?.map((section, i) => {
        if (section.__component !== 'layout.services-section') return null;

        const servicesSection = section as ServicesSection;

        return (
          <section key={i} className="mt-12 grid gap-6 md:grid-cols-3">
            {servicesSection.services?.map((service, j) => {
              const imageUrl = service.image?.url;
              const fullImageUrl = getStrapiImageUrl(imageUrl);
              const alt =
                service.image?.alternativeText ?? service.title;

              return (
                <div
                  key={j}
                  className="border rounded-lg p-4 shadow-sm"
                >
                  {fullImageUrl && (
                    <div className="relative w-full h-48 mb-4 overflow-hidden rounded">
                      <Image
                        src={fullImageUrl}
                        alt={alt}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                  )}

                  <h3 className="text-xl font-semibold">
                    {service.title}
                  </h3>

                  {service.description && (
                    <p className="text-gray-600 mt-2">
                      {service.description}
                    </p>
                  )}

                  {typeof service.price === 'number' && (
                    <p className="mt-3 font-bold text-blue-600">
                      ${service.price}
                    </p>
                  )}
                </div>
              );
            })}
          </section>
        );
      })}
    </main>
  );
}