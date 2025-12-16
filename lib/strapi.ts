const BASE_URL = process.env.STRAPI_BASE_URL ?? 'http://localhost:1337';

export type StrapiResponse<T> = {
  data: {
    id: number;
    title: string;
    description: string;
  };
};

export async function fetchStrapiData<T>(url: string): Promise<StrapiResponse<T>> {
  const fullUrl = `${BASE_URL}${url}`;
  const response = await fetch(fullUrl);

  if (!response.ok) {
    throw new Error(`Error fetching ${fullUrl}: ${response.status} ${response.statusText}`);
  }

  return response.json();
}
