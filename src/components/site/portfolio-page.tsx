import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Sidebar } from "@/components/site/sidebar";
import {
  About,
  AiWork,
  CertificationList,
  Contact,
  EducationList,
  ExperienceList,
  ProjectList,
  Research,
  Section,
  Skills,
} from "@/components/site/sections";
import {
  getProfile,
  getProjects,
  getExperience,
  getEducation,
  getCertifications,
  getSkills,
} from "@/services/payload";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import { routing, type Locale } from "@/i18n/routing";
import { CaseStudies, CaseStudy, CaseStudyLabels } from "@/components/site/case-studies";
import { SeoJsonLd } from "@/components/site/seo-jsonld";
import { getCvHref, type CvVariant } from "@/lib/cv";
import type {
  Profile,
  Project,
  Experience as ExperienceType,
  Education as EducationType,
  Certification,
  Skill,
} from "@/payload-types";

// The home page shows recruiter CVs; the academic page is shared by link and offers the academic CV.
export type PortfolioVariant = "home" | "academic";

export type PortfolioPageProps = { params: Promise<{ locale: string }> };

const VARIANT_PATHS: Record<PortfolioVariant, string> = { home: "", academic: "/academic" };
const VARIANT_CVS: Record<PortfolioVariant, CvVariant[]> = {
  home: ["genai", "fullstack"],
  academic: ["academic"],
};

function toLocale(value: string): Locale {
  return routing.locales.includes(value as Locale) ? (value as Locale) : routing.defaultLocale;
}

const OG_LOCALES: Record<Locale, string> = { en: "en_US", es: "es_PE", pt: "pt_BR" };

function getLocalePath(locale: Locale, variant: PortfolioVariant) {
  const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
  return `${prefix}${VARIANT_PATHS[variant]}` || "/";
}

function getLocaleUrl(locale: Locale, variant: PortfolioVariant) {
  return `${SITE_URL.replace(/\/$/, "")}${getLocalePath(locale, variant)}`.replace(/\/$/, "");
}

function getLanguageAlternates(variant: PortfolioVariant) {
  return Object.fromEntries(
    routing.locales.map((locale) => [locale, getLocaleUrl(locale, variant)])
  );
}

export async function generatePortfolioMetadata(
  { params }: PortfolioPageProps,
  variant: PortfolioVariant
): Promise<Metadata> {
  const locale = toLocale((await params).locale);
  setRequestLocale(locale);
  const t = await getTranslations("hero");
  const site = await getTranslations("site");

  try {
    const profileData = await getProfile(locale);
    const profile = profileData.docs?.[0] as Profile | undefined;

    const pageUrl = getLocaleUrl(locale, variant);
    const description = profile?.shortDescription || t("hi");
    const subtitle = variant === "academic" ? site("academicTitle") : profile?.professionalTitle;
    const title = profile ? `${profile.name} — ${subtitle}` : SITE_NAME;
    const alternates = getLanguageAlternates(variant);

    return {
      metadataBase: new URL(SITE_URL),
      title,
      description,
      // The academic page repeats the home content, so it is shared by link and kept out of search.
      robots: variant === "academic" ? { index: false, follow: true } : undefined,
      alternates: { canonical: pageUrl, languages: alternates },
      openGraph: {
        title,
        description,
        url: pageUrl,
        locale: OG_LOCALES[locale],
        alternateLocale: routing.locales
          .filter((item) => item !== locale)
          .map((item) => OG_LOCALES[item]),
        images: profile?.photo
          ? [{ url: profile.photo, width: 1200, height: 630, alt: profile.name }]
          : undefined,
        type: "website",
        siteName: SITE_NAME,
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: profile?.photo ? [profile.photo] : undefined,
      },
    };
  } catch {
    return {
      title: SITE_NAME,
      description: t("hi"),
    };
  }
}

export async function PortfolioPage({
  params,
  variant,
}: PortfolioPageProps & { variant: PortfolioVariant }) {
  const locale = toLocale((await params).locale);
  setRequestLocale(locale);
  try {
    const [
      profileData,
      projectsData,
      experienceData,
      educationData,
      certificationsData,
      skillsData,
    ] = await Promise.all([
      getProfile(locale),
      getProjects(locale),
      getExperience(locale),
      getEducation(locale),
      getCertifications(locale),
      getSkills(locale),
    ]);

    const profile = profileData.docs?.[0] as Profile | undefined;
    const projects = (projectsData.docs || []) as Project[];
    const experiences = (experienceData.docs || []) as ExperienceType[];
    const education = (educationData.docs || []) as EducationType[];
    const certifications = (certificationsData.docs || []) as Certification[];
    const skills = (skillsData.docs || []) as Skill[];

    if (!profile) {
      notFound();
    }

    const t = await getTranslations("site");
    const nav = await getTranslations("nav");
    const root = await getTranslations();
    const highlights = root.raw("highlights") as { value: string; label: string }[];
    const research = root.raw("research") as {
      title: string;
      venue: string;
      authors: string;
      summary: string;
      code: string;
    };
    const skillLabels = root.raw("skillCategories") as Record<string, string>;
    const aiWork = root.raw("aiWork") as {
      intro: string;
      items: { title: string; text: string }[];
    };
    const caseStudies = root.raw("caseStudies") as {
      title: string;
      labels: CaseStudyLabels;
      items: CaseStudy[];
    };
    const sections = [
      "about",
      "experience",
      "ai",
      "research",
      "caseStudies",
      "projects",
      "skills",
      "education",
      "certifications",
    ];
    const navItems = sections.map((id) => ({
      id: id === "caseStudies" ? "case-studies" : id,
      label: nav(id),
    }));
    const languages = routing.locales.map((code) => ({
      code,
      href: getLocalePath(code, variant),
      label: code.toUpperCase(),
      current: locale === code,
    }));
    const cvLinks = VARIANT_CVS[variant].map((cv) => ({
      href: getCvHref(cv, locale),
      label: t(`cv.${cv}`),
    }));
    const caseStudyBasePath = locale === "en" ? "/case-studies" : `/${locale}/case-studies`;

    return (
      <div className="mx-auto min-h-screen max-w-screen-xl px-6 py-12 font-sans md:px-12 md:py-16 lg:py-0">
        <SeoJsonLd locale={locale} siteUrl={SITE_URL} profile={profile} projects={projects} />
        <a
          href="#content"
          className="absolute left-0 top-0 block -translate-x-full rounded bg-mint-400 px-4 py-3 text-sm font-bold text-ink-950 focus-visible:translate-x-0"
        >
          {t("skip")}
        </a>
        <div className="lg:flex lg:justify-between lg:gap-8">
          <Sidebar
            profile={profile}
            navItems={navItems}
            languages={languages}
            cvLinks={cvLinks}
            labels={{ downloadCV: t("downloadCV"), languageSelect: t("languageSelect") }}
          />
          <main id="content" className="pt-24 lg:w-[54%] lg:py-24">
            <Section id="about" title={nav("about")}>
              <About profile={profile} highlights={highlights} />
            </Section>
            <Section id="experience" title={nav("experience")}>
              <ExperienceList items={experiences} locale={locale} present={t("present")} />
            </Section>
            <Section id="ai" title={nav("ai")}>
              <AiWork text={aiWork} />
            </Section>
            <Section id="research" title={nav("research")}>
              <Research
                text={research}
                href="https://github.com/emersonheto/damage_dataset_fewshot_vlms"
              />
            </Section>
            <Section id="case-studies" title={caseStudies.title}>
              <CaseStudies
                items={caseStudies.items}
                labels={caseStudies.labels}
                detailBasePath={caseStudyBasePath}
              />
            </Section>
            <Section id="projects" title={nav("projects")}>
              <ProjectList
                items={projects}
                labels={{ featured: t("featured"), viewCode: t("viewCode") }}
              />
            </Section>
            <Section id="skills" title={nav("skills")}>
              <Skills items={skills} labels={skillLabels} />
            </Section>
            <Section id="education" title={nav("education")}>
              <EducationList items={education} locale={locale} present={t("present")} />
            </Section>
            <Section id="certifications" title={nav("certifications")}>
              <CertificationList
                items={certifications}
                locale={locale}
                labels={{ verify: t("verify"), view: t("view") }}
              />
            </Section>
            <Section id="contact" title={t("contactTitle")}>
              <Contact
                profile={profile}
                text={{ title: t("contactTitle"), body: t("contactText") }}
              />
            </Section>
            <footer className="pb-16 text-sm text-haze-500 sm:pb-0">
              <p>{t("footer")}</p>
            </footer>
          </main>
        </div>
      </div>
    );
  } catch (error) {
    console.error(`Error loading ${variant} page:`, error);
    notFound();
  }
}
