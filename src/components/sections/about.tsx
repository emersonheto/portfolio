"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import type { Profile, Skill } from "@/payload-types";

interface AboutProps {
  profile: Profile;
  skills: Skill[];
}

export function About({ profile, skills }: AboutProps) {
  const t = useTranslations();

  // Group skills by category
  const skillsByCategory = skills.reduce(
    (acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = [];
      }
      acc[skill.category].push(skill);
      return acc;
    },
    {} as Record<string, Skill[]>
  );

  return (
    <section className="container mx-auto px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="space-y-12"
      >
        <div>
          <h2 className="mb-6 text-3xl font-bold tracking-tight">{t("about.title")}</h2>
          <p className="prose max-w-none text-gray-600 dark:text-gray-400">
            {profile.longDescription}
          </p>
          <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            {profile.yearsOfExperience} {t("about.yearsOfExperience")}
          </p>
        </div>

        <div>
          <h3 className="mb-6 text-2xl font-semibold">Skills</h3>
          <div className="space-y-6">
            {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h4 className="mb-3 text-sm font-medium uppercase text-gray-600 dark:text-gray-400">
                  {category}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {categorySkills.map((skill) => (
                    <Badge key={skill.id} variant="secondary">
                      {skill.name} ({skill.level}%)
                    </Badge>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
