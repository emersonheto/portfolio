import { revalidateAfterChange, revalidateAfterDelete } from "./hooks/revalidate";
import { CollectionConfig } from "payload";

const Education: CollectionConfig = {
  slug: "education",
  hooks: {
    afterChange: [revalidateAfterChange],
    afterDelete: [revalidateAfterDelete],
  },
  admin: {
    useAsTitle: "degree",
    defaultColumns: ["degree", "institution", "startDate", "endDate"],
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: "institution",
      type: "text",
      localized: true,
      required: true,
    },
    {
      name: "degree",
      type: "text",
      localized: true,
      required: true,
    },
    {
      name: "description",
      type: "textarea",
      localized: true,
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
  ],
};

export default Education;
