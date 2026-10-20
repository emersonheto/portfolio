import Image from "next/image";
import { FileDown, Github, Languages, Linkedin, Mail } from "lucide-react";
import type { Profile } from "@/payload-types";
import { SideNav } from "./side-nav";

type Labels = {
  downloadCV: string;
  languageSelect: string;
};

type LanguageOption = {
  code: string;
  href: string;
  label: string;
  current?: boolean;
};

const ICONS: Record<string, typeof Github> = { github: Github, linkedin: Linkedin, email: Mail };

export function Sidebar({
  profile,
  navItems,
  labels,
  languages,
}: {
  profile: Profile;
  navItems: { id: string; label: string }[];
  labels: Labels;
  languages: LanguageOption[];
}) {
  return (
    <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-[46%] lg:flex-col lg:justify-between lg:py-24">
      <div>
        <div className="flex items-center gap-5">
          <Image
            src={profile.photo}
            alt={profile.name}
            width={88}
            height={88}
            sizes="88px"
            quality={80}
            priority
            className="h-20 w-20 rounded-full border border-mint-400/30 object-cover sm:h-[88px] sm:w-[88px]"
          />
          <nav
            aria-label={labels.languageSelect}
            className="inline-flex items-center gap-1 rounded-full border border-haze-500/40 p-1 text-xs font-semibold text-haze-300"
          >
            <Languages className="mx-1 h-3.5 w-3.5" aria-hidden />
            {languages.map((language) => (
              <a
                key={language.code}
                href={language.href}
                hrefLang={language.code}
                aria-current={language.current ? "page" : undefined}
                className={`rounded-full px-2 py-1 transition hover:bg-mint-400/20 hover:text-mint-300 ${language.current ? "bg-mint-400 text-ink-950" : ""}`}
              >
                {language.label}
              </a>
            ))}
          </nav>
        </div>
        <h1 className="mt-6 text-4xl font-bold tracking-tight text-haze-100 sm:text-5xl">
          {profile.name}
        </h1>
        <h2 className="mt-3 text-lg font-medium tracking-tight text-haze-100 sm:text-xl">
          {profile.professionalTitle}
        </h2>
        <p className="mt-4 max-w-sm leading-normal text-haze-400">{profile.shortDescription}</p>
        <SideNav items={navItems} />
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-5 lg:mt-0">
        {profile.cv && (
          <a
            href={profile.cv}
            download
            className="inline-flex items-center gap-2 rounded-md bg-mint-400 px-4 py-2 text-sm font-semibold text-ink-950 transition hover:bg-mint-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mint-300"
          >
            <FileDown className="h-4 w-4" aria-hidden />
            {labels.downloadCV}
          </a>
        )}
        <ul className="flex items-center gap-5" aria-label="Social media">
          {(profile.socialNetworks || []).map((network) => {
            const Icon = ICONS[network.platform.toLowerCase()] ?? Mail;
            return (
              <li key={network.url}>
                <a
                  href={network.url}
                  target={network.url.startsWith("mailto:") ? undefined : "_blank"}
                  rel="noreferrer noopener"
                  aria-label={network.platform}
                  title={network.platform}
                  className="block text-haze-400 transition hover:text-mint-300"
                >
                  <Icon className="h-6 w-6" aria-hidden />
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </header>
  );
}
