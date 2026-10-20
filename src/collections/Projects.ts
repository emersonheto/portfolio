import { revalidateAfterChange, revalidateAfterDelete } from "./hooks/revalidate";
import { CollectionConfig } from "payload";

const Projects: CollectionConfig = {
  slug: "projects",
  hooks: {
    afterChange: [revalidateAfterChange],
    afterDelete: [revalidateAfterDelete],
  },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "featured", "createdAt"],
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
      name: "description",
      type: "textarea",
      localized: true,
      required: true,
    },
    {
      name: "featured",
      type: "checkbox",
      defaultValue: false,
    },
    {
      name: "image",
      type: "text",
      required: true,
    },
    {
      name: "technologies",
      type: "array",
      fields: [
        {
          name: "technology",
          type: "text",
          required: true,
        },
      ],
    },
    {
      name: "demoUrl",
      type: "text",
    },
    {
      name: "githubUrl",
      type: "text",
    },
  ],
};

export default Projects;
