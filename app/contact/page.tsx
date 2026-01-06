import { fetchContactPageData } from '@/lib/strapi';
import Link from 'next/link';

export default async function ContactPage() {
  const response = await fetchContactPageData();
  const { title, description, email, phone } = response.data;

  const whatsappNumber = phone?.replace(/[^\d]/g, '');

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">{title}</h1>
      <p className="mb-6">{description}</p>

      <div className="space-y-2">
        {email && (
          <p>
            <strong>Email:</strong>{' '}
            <Link
              href={`mailto:${email}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              {email}
            </Link>
          </p>
        )}

        {phone && (
          <p>
            <strong>WhatsApp:</strong>{' '}
            <Link
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-600 underline"
            >
              {phone}
            </Link>
          </p>
        )}
      </div>
    </main>
  );
}