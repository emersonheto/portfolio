import type { Metadata } from "next";
import {
  PortfolioPage,
  generatePortfolioMetadata,
  type PortfolioPageProps,
} from "@/components/site/portfolio-page";

// Avoid prerender DB access during image build; data is cached in service layer.
export const revalidate = 3600;

// No pages at build time (the build has no database); each locale is rendered on its
// first request and then served from the cache until content changes.
export function generateStaticParams() {
  return [];
}

export function generateMetadata(props: PortfolioPageProps): Promise<Metadata> {
  return generatePortfolioMetadata(props, "academic");
}

export default function AcademicPage(props: PortfolioPageProps) {
  return <PortfolioPage {...props} variant="academic" />;
}
