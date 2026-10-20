import { revalidateAfterChange, revalidateAfterDelete } from "./hooks/revalidate";
import { CollectionConfig } from "payload";

const Skills: CollectionConfig = {
  slug: "skills",
  hooks: {
    afterChange: [revalidateAfterChange],
    afterDelete: [revalidateAfterDelete],
  },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "category", "level"],
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: "name",
      type: "text",
      localized: true,
      required: true,
    },
    {
      name: "category",
      type: "select",
      required: true,
      options: [
        { label: "AI & Machine Learning", value: "ai" },
        { label: "Frontend", value: "frontend" },
        { label: "Data", value: "data" },
        { label: "Backend", value: "backend" },
        { label: "DevOps", value: "devops" },
        { label: "Design", value: "design" },
        { label: "Tools", value: "tools" },
        { label: "Soft Skills", value: "soft" },
      ],
    },
    {
      name: "level",
      type: "number",
      required: true,
      min: 1,
      max: 100,
    },
  ],
};

export default Skills;
