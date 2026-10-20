/** Logos of organizations, matched by a keyword contained in the company or institution name. */
const ORGANIZATION_LOGOS: [string, string][] = [
  ["canvia", "/logos/canvia.jpg"],
  ["certilab", "/logos/certilab.png"],
  ["way tech", "/logos/waytech.jpg"],
  ["indra", "/logos/indra.jpg"],
  ["multilab", "/logos/multilab.jpg"],
  ["rio grande do sul", "/logos/ufrgs.jpg"],
  ["ufrgs", "/logos/ufrgs.jpg"],
  ["data science research", "/logos/dsrp.jpg"],
  ["tecnológica del perú", "/logos/utp.jpg"],
  ["utp", "/logos/utp.jpg"],
  ["senati", "/logos/senati.jpg"],
  ["nacional de ingeniería", "/logos/uni.jpg"],
  ["sise", "/logos/sise.jpg"],
  ["tecylab", "/logos/tecylab.jpg"],
];

export function organizationLogo(name: string): string | null {
  const lower = name.toLowerCase();
  return ORGANIZATION_LOGOS.find(([keyword]) => lower.includes(keyword))?.[1] ?? null;
}

export function initials(name: string): string {
  return name
    .replace(/\(.*?\)|—.*$/g, "")
    .split(/\s+/)
    .filter((word) => /^[A-ZÁÉÍÓÚ]/.test(word))
    .slice(0, 2)
    .map((word) => word[0])
    .join("");
}

/** Tools shown in the "How I work" section. */
export const AI_TOOLS = [
  { name: "Gentle Shell", logo: "/logos/gentle-shell.png", fill: true },
  { name: "Gentle AI", logo: "/logos/gentle-ai.png", fill: true },
  { name: "Engram", logo: "/logos/engram.png", fill: true },
  { name: "Claude Code", logo: "/logos/claude.svg" },
  { name: "Codex", logo: "/logos/openai.svg" },
  { name: "LangChain", logo: "/logos/langchain.svg" },
  { name: "Python", logo: "/logos/python.svg" },
  { name: "FastAPI", logo: "/logos/fastapi.svg" },
];
