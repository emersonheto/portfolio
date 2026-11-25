import { authenticated } from "./access";
import { CollectionConfig } from "payload";

const Messages: CollectionConfig = {
  slug: "messages",
  admin: {
    useAsTitle: "email",
    defaultColumns: ["name", "email", "createdAt"],
  },
  access: {
    read: authenticated,
    create: authenticated, // Contact form writes via the local API (overrideAccess), so REST stays closed
    update: authenticated,
    delete: authenticated,
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
