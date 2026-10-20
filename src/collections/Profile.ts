import { revalidateAfterChange, revalidateAfterDelete } from "./hooks/revalidate";
import { CollectionConfig } from "payload";

const Profile: CollectionConfig = {
  slug: "profile",
  hooks: {
    afterChange: [revalidateAfterChange],
    afterDelete: [revalidateAfterDelete],
  },
  admin: {
    useAsTitle: "name",
  },
  access: {
    read: () => true,
    update: () => true,
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "professionalTitle",
      type: "text",
      localized: true,
      required: true,
    },
    {
      name: "shortDescription",
      type: "text",
      localized: true,
      required: true,
    },
    {
      name: "longDescription",
      type: "textarea",
      localized: true,
      required: true,
    },
    {
      name: "photo",
      type: "text",
      required: true,
    },
    {
      name: "cv",
      type: "text",
      localized: true,
    },
    {
      name: "yearsOfExperience",
      type: "number",
      required: true,
    },
    {
      name: "socialNetworks",
      type: "array",
      fields: [
        {
          name: "platform",
          type: "text",
          required: true,
        },
        {
          name: "url",
          type: "text",
          required: true,
        },
      ],
    },
  ],
};

export default Profile;
