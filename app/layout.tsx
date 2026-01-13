import './globals.css';
import { Header } from '@/components/ui/header';
import { fetchGlobalData } from '@/lib/strapi';
import type {  HeaderLink } from '@/lib/interfaces';


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let title = 'Website';
  let links: HeaderLink[] = [];

  try {
    const globalResponse = await fetchGlobalData();
    const global = globalResponse?.data;
    const header = global?.header?.[0];

    if (header) {
      title = header.title ?? title;
      const { link1 = [], link2 = [] } = header;
      links = [...link1, ...link2].filter(
        (link): link is HeaderLink => typeof link?.href === 'string' && link.href.length > 0
      );
    }
  } catch {
  }

  return (
    <html lang="en">
      <body>
        <Header title={title} links={links} />

        {children}
      </body>
    </html>
  );
}
