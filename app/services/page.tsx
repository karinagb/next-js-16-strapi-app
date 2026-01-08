import Image from 'next/image';
import type { ServicesSection } from '@/lib/interfaces';
import { fetchServicesPage, getStrapiImageUrl } from '@/lib/strapi';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign } from 'lucide-react';

export default async function ServicesPage() {
  const response = await fetchServicesPage();
  const page = response.data;

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-blue-950 to-slate-950">
      <section className="relative overflow-hidden border-b border-blue-900/30 bg-gradient-to-br from-blue-950/80 via-slate-900 to-blue-950/80 py-16 sm:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_70%)]" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-blue-500 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(96,165,250,0.5)]">
                {page.title}
              </span>
            </h1>
            {page.description && (
              <p className="mt-6 text-lg leading-8 text-slate-300 sm:text-xl">
                {page.description}
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          {page.sections?.map((section, i) => {
            if (section.__component !== 'layout.services-section') return null;

            const servicesSection = section as ServicesSection;

            return (
              <div key={i} className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:items-stretch">
                {servicesSection.services?.map((service, j) => {
                  const imageUrl = service.image?.url;
                  const fullImageUrl = getStrapiImageUrl(imageUrl);
                  const alt =
                    service.image?.alternativeText ?? service.title;

                  return (
                    <Card
                      key={j}
                      className="group relative flex h-full flex-col overflow-hidden border-2 border-blue-800/50 bg-gradient-to-br from-blue-950/80 to-slate-900/80 backdrop-blur-sm transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/30 hover:-translate-y-2 hover:border-cyan-500/70"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-blue-500/0 to-blue-600/0 transition-all duration-500 group-hover:from-cyan-500/20 group-hover:via-blue-500/20 group-hover:to-blue-600/20" />
                      
                      {fullImageUrl && (
                        <div className="relative w-full h-48 overflow-hidden">
                          <Image
                            src={fullImageUrl}
                            alt={alt}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                            unoptimized
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-blue-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </div>
                      )}

                      <CardHeader className="relative">
                        <CardTitle className="text-2xl text-cyan-100">{service.title}</CardTitle>
                        {service.description && (
                          <CardDescription className="text-slate-400">
                            {service.description}
                          </CardDescription>
                        )}
                      </CardHeader>

                      <CardContent className="relative mt-auto flex flex-1 flex-col justify-end">
                        {typeof service.price === 'number' && (
                          <div className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600/30 to-cyan-600/30 border border-cyan-500/50 px-4 py-3 shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-all duration-300">
                            <DollarSign className="h-5 w-5 text-cyan-300" />
                            <span className="text-2xl font-bold bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
                              {service.price}
                            </span>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}