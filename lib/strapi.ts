import qs from 'qs';
import { HeroSectionData } from '@/components/ui/hero-section';

const BASE_URL = process.env.STRAPI_BASE_URL ?? 'http://localhost:1337';

export function getStrapiImageUrl(url: string | undefined): string | undefined {
  if (!url) return undefined;

  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }

  const strapiBaseUrl = 
    process.env.NEXT_PUBLIC_STRAPI_BASE_URL || 
    process.env.NEXT_PUBLIC_STRAPI_API_URL || 
    'http://localhost:1337';
  
  return `${strapiBaseUrl}${url}`;
}

export type StrapiResponse<T> = {
  data: {
    id: number;
    title: string;
    description: string;
    sections?: T[];
  };
};

export type StrapiHeroSection = HeroSectionData & {
  __component: 'layout.hero-section';
};


const QUERY_HOME_PAGE = {
  populate: {
    sections: {
      on: {
        'layout.hero-section': {
          populate: {
            image: {
              fields: ['url', 'alternativeText', 'width', 'height'],
            },
            link: {
              populate: true,
            },
          },
        },
      },
    },
  },
};

export async function fetchHomePageData() {
    const query = qs.stringify(QUERY_HOME_PAGE)
    const response = await fetchStrapiData<StrapiHeroSection>(`/api/home-page?${query}`); 
    return response;
}


export async function fetchStrapiData<T>(url: string): Promise<StrapiResponse<T>> {
  const fullUrl = `${BASE_URL}${url}`;
  const response = await fetch(fullUrl);

  if (!response.ok) {
    throw new Error(`Error fetching ${fullUrl}: ${response.status} ${response.statusText}`);
  }

  return response.json();
}
