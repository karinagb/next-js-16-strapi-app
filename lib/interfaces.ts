export type StrapiImage = {
  id: number;
  documentId?: string;
  url: string;
  alternativeText?: string;
  width?: number;
  height?: number;
};

export type HeroSectionData = {
  heading: string;
  subHeading?: string;
  imageDescription?: string;
  link?: {
    label?: string;
    href: string;
    isExternal?: boolean;
  };
  image?: StrapiImage;
};

export type StrapiResponse<T> = {
  data: {
    id: number;
    title: string;
    description: string;
    slogan?: string;
    sections?: T[];
  };
};

export type StrapiHeroSection = HeroSectionData & {
  __component: 'layout.hero-section';
};
export type StrapiSingleResponse<T> = {
  data: T;
};

export type HeaderLink = {
  label?: string;
  href: string;
  isExternal?: boolean | null;
};

export type HeaderComponent = {
  id: number;
  title: string;
  link1?: HeaderLink[];
  link2?: HeaderLink[];
};

export type StrapiGlobalData = {
  id: number;
  header?: HeaderComponent[];
};
