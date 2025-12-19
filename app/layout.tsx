import './globals.css';
import { Header } from '@/components/ui/header';
import { fetchGlobalData } from '@/lib/strapi';
import type {  HeaderLink } from '@/lib/interfaces';


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const globalResponse = await fetchGlobalData();

  if (!globalResponse?.data) {
    throw new Error('Global data missing');
  }

  const global = globalResponse.data;

const header = global.header?.[0];

if (!header) {
  throw new Error('Global header component is missing');
}

const { title, link1 = [], link2 = [] } = header;

const links = [...link1, ...link2].filter(
  (link): link is HeaderLink =>
    typeof link?.href === 'string' && link.href.length > 0
);

  return (
    <html lang="en">
      <body>
   <Header title={title} links={links} />

        {children}
      </body>
    </html>
  );
}
