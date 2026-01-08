import { fetchContactPageData } from '@/lib/strapi';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, MessageCircle, MapPin } from 'lucide-react';

export default async function ContactPage() {
  const response = await fetchContactPageData();
  const { title, description, email, phone } = response.data;

  const whatsappNumber = phone?.replace(/[^\d]/g, '');

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-blue-950 to-slate-950">
      <section className="relative overflow-hidden border-b border-blue-900/30 bg-gradient-to-br from-blue-950/80 via-slate-900 to-blue-950/80 py-16 sm:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_70%)]" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-blue-500 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(96,165,250,0.5)]">
                {title}
              </span>
            </h1>
            {description && (
              <p className="mt-6 text-lg leading-8 text-slate-300 sm:text-xl">
                {description}
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-4xl">
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 md:items-stretch">
            {email && (
              <Card className="group relative flex h-full flex-col overflow-hidden border-2 border-blue-800/50 bg-gradient-to-br from-blue-950/80 to-slate-900/80 backdrop-blur-sm transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/30 hover:-translate-y-2 hover:border-cyan-500/70">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-blue-500/0 to-blue-600/0 transition-all duration-500 group-hover:from-cyan-500/20 group-hover:via-blue-500/20 group-hover:to-blue-600/20" />
                <CardHeader className="relative">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600/30 to-cyan-500/30 border border-blue-500/50 text-cyan-300 shadow-lg shadow-blue-500/30 transition-all duration-300 group-hover:scale-110 group-hover:shadow-cyan-500/50 group-hover:border-cyan-400/70">
                    <Mail className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-2xl text-cyan-100">Email Us</CardTitle>
                  <CardDescription className="text-slate-400">
                    Send us an email and we&apos;ll get back to you as soon as possible
                  </CardDescription>
                </CardHeader>
                <CardContent className="relative flex flex-1 flex-col justify-between space-y-4">
                  <p className="text-sm font-medium text-slate-300">{email}</p>
                  <Button
                    asChild
                    variant="default"
                    className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white border-0 shadow-lg shadow-blue-500/40 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/50"
                  >
                    <Link
                      href={`mailto:${email}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2"
                    >
                      <Mail className="h-4 w-4" />
                      Send Email
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )}

            {phone && (
              <Card className="group relative flex h-full flex-col overflow-hidden border-2 border-teal-800/50 bg-gradient-to-br from-teal-950/80 to-slate-900/80 backdrop-blur-sm transition-all duration-500 hover:shadow-2xl hover:shadow-teal-500/30 hover:-translate-y-2 hover:border-teal-400/70">
                <div className="absolute inset-0 bg-gradient-to-br from-teal-500/0 via-cyan-500/0 to-teal-600/0 transition-all duration-500 group-hover:from-teal-500/20 group-hover:via-cyan-500/20 group-hover:to-teal-600/20" />
                <CardHeader className="relative">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-teal-600/30 to-cyan-500/30 border border-teal-500/50 text-cyan-300 shadow-lg shadow-teal-500/30 transition-all duration-300 group-hover:scale-110 group-hover:shadow-cyan-500/50 group-hover:border-cyan-400/70">
                    <MessageCircle className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-2xl text-cyan-100">WhatsApp</CardTitle>
                  <CardDescription className="text-slate-400">
                    Chat with us on WhatsApp for quick responses
                  </CardDescription>
                </CardHeader>
                <CardContent className="relative flex flex-1 flex-col justify-between space-y-4">
                  <p className="text-sm font-medium text-slate-300">{phone}</p>
                  <Button
                    asChild
                    variant="default"
                    className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white border-0 shadow-lg shadow-teal-500/40 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/50"
                  >
                    <Link
                      href={`https://wa.me/${whatsappNumber}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2"
                    >
                      <MessageCircle className="h-4 w-4" />
                      Open WhatsApp
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="mt-12 text-center">
            <Card className="border-2 border-blue-800/50 border-dashed bg-gradient-to-br from-blue-950/50 to-slate-900/50 backdrop-blur-sm">
              <CardContent className="py-8">
                <div className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-cyan-600/30 to-blue-600/30 border border-cyan-500/50 text-cyan-300 shadow-lg shadow-cyan-500/30">
                  <MapPin className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-cyan-100">Get in Touch</h3>
                <p className="text-sm text-slate-400">
                  We&apos;re here to help and answer any questions you might have. 
                  We look forward to hearing from you.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
}