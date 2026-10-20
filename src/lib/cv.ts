import type { Locale } from "@/i18n/routing";

export type CvVariant = "genai" | "fullstack" | "academic";

const CV_FILE_NAMES: Record<CvVariant, string> = {
  genai: "GenAI",
  fullstack: "FullStack",
  academic: "Academico",
};

export function getCvHref(variant: CvVariant, locale: Locale) {
  return `/cv/Emerson_Herrera_Tolentino_CV_${CV_FILE_NAMES[variant]}_${locale.toUpperCase()}.pdf`;
}
