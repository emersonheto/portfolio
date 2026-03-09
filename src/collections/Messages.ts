import { CollectionConfig } from "payload";

const Messages: CollectionConfig = {
  slug: "messages",
  admin: {
    useAsTitle: "email",
    defaultColumns: ["name", "email", "createdAt"],
  },
  access: {
    read: () => true,
    create: () => true, // Only allow creation via API
    update: () => false, // Disable editing
    delete: () => true,
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "email",
      type: "text",
      required: true,
    },
    {
      name: "message",
      type: "textarea",
      required: true,
    },
    {
      name: "ipAddress",
      type: "text",
    },
    {
      name: "userAgent",
      type: "text",
    },
  ],
};

export default Messages;
