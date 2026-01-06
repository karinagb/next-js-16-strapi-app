import { fetchContactPageData } from '@/lib/strapi';

export default async function ContactPage() {
  const response = await fetchContactPageData();
  const { title, description, email, phone } = response.data;

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">{title}</h1>

      <p className="mb-6">{description}</p>

      <div className="space-y-2">
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Phone:</strong> {phone}</p>
      </div>
    </main>
  );
}