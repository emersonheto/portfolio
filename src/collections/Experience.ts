import { anyone, authenticated } from "./access";
import { revalidateAfterChange, revalidateAfterDelete } from "./hooks/revalidate";
import { CollectionConfig } from "payload";

const Experience: CollectionConfig = {
  slug: "experience",
  hooks: {
    afterChange: [revalidateAfterChange],
    afterDelete: [revalidateAfterDelete],
  },
  admin: {
    useAsTitle: "position",
    defaultColumns: ["position", "company", "startDate", "endDate"],
  },
  access: {
    read: anyone,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    {
      name: "company",
      type: "text",
      localized: true,
      required: true,
    },
    {
      name: "position",
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
      name: "startDate",
      type: "date",
      required: true,
    },
    {
      name: "endDate",
      type: "date",
    },
    {
      name: "current",
      type: "checkbox",
      defaultValue: false,
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
  ],
};

export default Experience;
