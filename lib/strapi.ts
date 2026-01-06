import qs from 'qs';
import {
  StrapiResponse,
  StrapiHeroSection,
  StrapiGlobalData,
  StrapiSingleResponse,
  ServicesPageData
} from '@/lib/interfaces';

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

export const QUERY_GLOBAL = {
  populate: {
  header: {
    populate: {
      link1: true,
      link2: true,
    },
  },
}

};

export async function fetchHomePageData() {
  'use cache';
  const query = qs.stringify(QUERY_HOME_PAGE);
  const response = await fetchStrapiData<StrapiHeroSection>(`/api/home-page?${query}`);
  return response;
}

export async function fetchGlobalData() {
  'use cache';
  const query = qs.stringify(
    {
      populate: {
  header: {
    populate: {
      link1: true,
      link2: true,
    },
  },
}

    },
    { encodeValuesOnly: true }
  );

return fetchStrapiSingle<StrapiGlobalData>(`/api/global?${query}`);

}

export async function fetchStrapiData<T>(url: string): Promise<StrapiResponse<T>> {
  const fullUrl = `${BASE_URL}${url}`;
  const response = await fetch(fullUrl);

  if (!response.ok) {
    throw new Error(`Error fetching ${fullUrl}: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

export async function fetchStrapiSingle<T>(url: string): Promise<StrapiSingleResponse<T>> {
  const fullUrl = `${BASE_URL}${url}`;
  const response = await fetch(fullUrl);

  if (!response.ok) {
    throw new Error(`Error fetching ${fullUrl}`);
  }

  return response.json();
}

export async function fetchContactPageData() {
  'use cache';
  return fetchStrapiData(`/api/contact-page`);
}




export async function fetchServicesPage() {
    'use cache';
  const query = qs.stringify(
    {
      populate: {
        sections: {
          on: {
            'layout.services-section': {
              populate: {
                services: {
                  populate: {
                    image: true,
                  },
                },
              },
            },
          },
        },
      },
    },
    { encodeValuesOnly: true }
  );

  return fetchStrapiSingle<ServicesPageData>(
    `/api/services-page?${query}`
  );
}