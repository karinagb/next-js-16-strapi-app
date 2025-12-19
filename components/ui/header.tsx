import Link from 'next/link';
import { Button } from '@/components/ui/button';
import type { HeaderLink } from '@/lib/interfaces';

type HeaderProps = {
  title: string;
  links: HeaderLink[];
};

export function Header({ title, links }: HeaderProps) {
  return (
    <header className="border-b bg-white">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-6">
        <h3 className="text-xl font-bold uppercase tracking-wider text-blue-600">
          <Link href="/">{title}</Link>
        </h3>

        <nav className="flex gap-2">
          {links.map((link, index) => (
            <Button key={index} asChild variant="ghost">
              <Link
                href={link.href}
                target={link.isExternal ? '_blank' : undefined}
                rel={link.isExternal ? 'noopener noreferrer' : undefined}
              >
                {link.label}
              </Link>
            </Button>
          ))}
        </nav>
      </div>
    </header>
  );
}
