export const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || "Portfolio";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const LOCALES = ["en", "es", "pt"] as const;
export const DEFAULT_LOCALE = "en" as const;

export const REVALIDATE_SECONDS = 3600;

export const CONTACT_FORM_RATE_LIMIT = 5; // requests per hour per IP
