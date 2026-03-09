"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import type { Experience as ExperienceType } from "@/payload-types";

interface ExperienceProps {
  experiences: ExperienceType[];
}

export function Experience({ experiences }: ExperienceProps) {
  const t = useTranslations();

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  return (
    <section id="experience" className="container mx-auto scroll-mt-24 px-4 py-20">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12 text-3xl font-bold tracking-tight"
      >
        {t("experience.title")}
      </motion.h2>

      <div className="space-y-8">
        {experiences.map((experience, index) => (
          <motion.div
            key={experience.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-xl font-semibold">{experience.position}</h3>
                <p className="text-lg text-gray-600 dark:text-gray-400">{experience.company}</p>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {formatDate(experience.startDate)} -{" "}
                {experience.current
                  ? t("experience.present")
                  : experience.endDate && formatDate(experience.endDate)}
              </div>
            </div>

            <p className="mt-4 text-gray-600 dark:text-gray-400">{experience.description}</p>

            {experience.technologies && experience.technologies.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {experience.technologies.map((tech, techIndex) => (
                  <Badge key={techIndex} variant="primary">
                    {typeof tech === "string" ? tech : tech.technology}
                  </Badge>
                ))}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
