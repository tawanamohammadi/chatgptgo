import { LucideIcon } from 'lucide-react';

export type Language = 'fa' | 'en';
export type Theme = 'light' | 'dark';

export interface NavItem {
  key: string;
  href: string;
}

export interface FeatureItem {
  icon: LucideIcon;
  titleKey: string;
  descKey: string;
}

export interface StepItem {
  id: number;
  icon: LucideIcon;
  titleKey: string;
  descKey: string;
}

export interface FAQItem {
  questionKey: string;
  answerKey: string;
}

export interface Content {
  nav: Record<string, string>;
  hero: {
    badge: string;
    title: React.ReactNode;
    subtitle: React.ReactNode;
    ctaPrimary: string;
    ctaSecondary: string;
    trust: string[];
    pricing: {
      title: string;
      period: string;
      special: string;
      price: string;
      unit: string;
      note: string;
      features: string[];
      button: string;
    }
  };
  seller: {
    title: string;
    name: string;
    role: string;
    bio: string;
    channelTitle: string;
    channelId: string;
    cta: string;
  };
  features: {
    title: string;
    subtitle: string;
    items: Record<string, { title: string; desc: string }>;
  };
  steps: {
    title: string;
    subtitle: string;
    supportStatus: string;
    items: Record<string, { title: string; desc: string }>;
    securityTitle: string;
    securityDesc: string;
  };
  faq: {
    title: string;
    items: Record<string, { q: string; a: string }>;
  };
  trust: {
    title: string;
    items: string[];
    cta: string;
  };
  cta: {
    title: string;
    subtitle: string;
    button: string;
  };
  footer: {
    rights: string;
    slogan: string;
    links: {
      terms: string;
      privacy: string;
      contact: string;
    }
  };
}