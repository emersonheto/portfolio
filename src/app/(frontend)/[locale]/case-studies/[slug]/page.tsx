import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import {
  CaseStudyDetail,
  type CaseStudyDetailData,
  type CaseStudyDetailLabels,
} from "@/components/site/case-study-detail";
import { CaseStudyJsonLd } from "@/components/site/seo-jsonld";
import { routing, type Locale } from "@/i18n/routing";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import enMessages from "@/i18n/locales/en.json";
import esMessages from "@/i18n/locales/es.json";
import ptMessages from "@/i18n/locales/pt.json";

export const dynamic = "force-dynamic";
export const revalidate = 3600;

type PageProps = { params: Promise<{ locale: string; slug: string }> };

type CaseStudyTranslations = {
  title: string;
  labels: CaseStudyDetailLabels;
  items: CaseStudyDetailData[];
};

function toLocale(value: string): Locale {
  return routing.locales.includes(value as Locale) ? (value as Locale) : routing.defaultLocale;
}

function getCaseStudyUrl(locale: Locale, slug: string) {
  const prefix = locale === "en" ? "" : `/${locale}`;
  return `${SITE_URL.replace(/\/$/, "")}${prefix}/case-studies/${slug}`;
}

function getLocalizedHomeUrl(locale: Locale) {
  return locale === "en" ? "/#case-studies" : `/${locale}#case-studies`;
}

const LOCALE_MESSAGES = {
  en: enMessages,
  es: esMessages,
  pt: ptMessages,
} as const;

function getCaseStudy(locale: Locale, slug: string) {
  const data = LOCALE_MESSAGES[locale].caseStudies as CaseStudyTranslations;
  const item = data.items.find((candidate) => candidate.slug === slug);
  return { data, item };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const locale = toLocale(rawLocale);
  setRequestLocale(locale);
  const { item } = getCaseStudy(locale, slug);

  if (!item) {
    return { title: SITE_NAME };
  }

  const languages = Object.fromEntries(
    routing.locales.map((candidate) => [candidate, getCaseStudyUrl(candidate, slug)])
  );
  const url = getCaseStudyUrl(locale, slug);

  return {
    metadataBase: new URL(SITE_URL),
    title: `${item.title} — ${SITE_NAME}`,
    description: item.summary,
    alternates: { canonical: url, languages },
    openGraph: {
      title: item.title,
      description: item.summary,
      url,
      type: "article",
      siteName: SITE_NAME,
    },
    twitter: { card: "summary", title: item.title, description: item.summary },
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { locale: rawLocale, slug } = await params;
  const locale = toLocale(rawLocale);
  setRequestLocale(locale);
  const { data, item } = getCaseStudy(locale, slug);

  if (!item) {
    notFound();
  }

  return (
    <>
      <CaseStudyJsonLd locale={locale} siteUrl={SITE_URL} item={item} />
      <CaseStudyDetail item={item} labels={data.labels} backHref={getLocalizedHomeUrl(locale)} />
    </>
  );
}
