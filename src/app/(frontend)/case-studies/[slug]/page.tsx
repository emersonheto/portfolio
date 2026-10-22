import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  CaseStudyDetail,
  CASE_STUDY_VISUAL_SIZE,
  type CaseStudyDetailData,
  type CaseStudyDetailLabels,
} from "@/components/site/case-study-detail";
import { CaseStudyJsonLd } from "@/components/site/seo-jsonld";
import enMessages from "@/i18n/locales/en.json";
import { SITE_NAME, SITE_URL } from "@/lib/constants";

export const dynamic = "force-dynamic";
export const revalidate = 3600;

type PageProps = { params: Promise<{ slug: string }> };

type CaseStudyTranslations = {
  labels: CaseStudyDetailLabels;
  items: CaseStudyDetailData[];
};

const data = enMessages.caseStudies as CaseStudyTranslations;

function getCaseStudy(slug: string) {
  return data.items.find((item) => item.slug === slug);
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = getCaseStudy(slug);

  if (!item) {
    return { title: SITE_NAME };
  }

  const image = item.visual
    ? { url: item.visual.src, ...CASE_STUDY_VISUAL_SIZE }
    : { url: "/images/og-emerson-herrera.jpg", width: 1200, height: 630 };

  const url = `${SITE_URL.replace(/\/$/, "")}/case-studies/${slug}`;
  return {
    metadataBase: new URL(SITE_URL),
    title: `${item.title} — ${SITE_NAME}`,
    description: item.summary,
    alternates: {
      canonical: url,
      languages: {
        en: url,
        "x-default": url,
        es: `${SITE_URL.replace(/\/$/, "")}/es/case-studies/${slug}`,
        pt: `${SITE_URL.replace(/\/$/, "")}/pt/case-studies/${slug}`,
      },
    },
    openGraph: {
      title: item.title,
      description: item.summary,
      url,
      type: "article",
      siteName: SITE_NAME,
      images: [{ ...image, alt: item.visual?.alt || item.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: item.title,
      description: item.summary,
      images: [image.url],
    },
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const item = getCaseStudy(slug);

  if (!item) {
    notFound();
  }

  return (
    <>
      <CaseStudyJsonLd locale="en" siteUrl={SITE_URL} item={item} />
      <CaseStudyDetail item={item} labels={data.labels} backHref="/#case-studies" />
    </>
  );
}
