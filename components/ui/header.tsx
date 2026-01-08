'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import type { HeaderLink } from '@/lib/interfaces';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { useState } from 'react';

type HeaderProps = {
  title: string;
  links: HeaderLink[];
};

export function Header({ title, links }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-blue-900/20 bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 backdrop-blur-xl supports-[backdrop-filter]:bg-slate-900/90 shadow-lg shadow-blue-950/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-6">
          <Link
            href="/"
            className="flex items-center space-x-2 transition-all duration-300 hover:scale-105"
          >
            <h3 className="text-xl font-bold tracking-tight sm:text-2xl">
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-blue-500 bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(96,165,250,0.5)]">
                {title}
              </span>
            </h3>
          </Link>

          <nav className="hidden md:flex items-center gap-2">
            {links.map((link, index) => (
              <Button
                key={index}
                asChild
                variant="ghost"
                className="text-slate-200 transition-all duration-300 hover:bg-blue-900/40 hover:text-cyan-300 hover:shadow-lg hover:shadow-cyan-500/20 rounded-lg"
              >
                <Link
                  href={link.href}
                  target={link.isExternal ? '_blank' : undefined}
                  rel={link.isExternal ? 'noopener noreferrer' : undefined}
                  className="text-sm font-medium"
                >
                  {link.label}
                </Link>
              </Button>
            ))}
          </nav>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 border-l border-blue-900/30">
              <SheetHeader>
                <SheetTitle className="text-left">
                  <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-blue-500 bg-clip-text text-transparent">
                    {title}
                  </span>
                </SheetTitle>
              </SheetHeader>
              <nav className="mt-8 flex flex-col gap-2">
                {links.map((link, index) => (
                  <Button
                    key={index}
                    asChild
                    variant="ghost"
                    className="w-full justify-start text-slate-200 transition-all duration-300 hover:bg-blue-900/40 hover:text-cyan-300 hover:shadow-lg hover:shadow-cyan-500/20 rounded-lg"
                    onClick={() => setIsOpen(false)}
                  >
                    <Link
                      href={link.href}
                      target={link.isExternal ? '_blank' : undefined}
                      rel={link.isExternal ? 'noopener noreferrer' : undefined}
                      className="text-base font-medium"
                    >
                      {link.label}
                    </Link>
                  </Button>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
