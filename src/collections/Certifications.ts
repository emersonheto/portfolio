import { anyone, authenticated } from "./access";
import { revalidateAfterChange, revalidateAfterDelete } from "./hooks/revalidate";
import { CollectionConfig } from "payload";

const Certifications: CollectionConfig = {
  slug: "certifications",
  hooks: {
    afterChange: [revalidateAfterChange],
    afterDelete: [revalidateAfterDelete],
  },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "institution", "date"],
  },
  access: {
    read: anyone,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    {
      name: "name",
      type: "text",
      localized: true,
      required: true,
    },
    {
      name: "institution",
      type: "text",
      required: true,
    },
    {
      name: "date",
      type: "date",
      required: true,
    },
    {
      name: "image",
      type: "text",
    },
    {
      name: "verificationUrl",
      type: "text",
    },
  ],
};

export default Certifications;
