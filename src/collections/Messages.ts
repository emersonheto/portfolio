import { anyone, authenticated } from "./access";
import { CollectionConfig } from "payload";

const Messages: CollectionConfig = {
  slug: "messages",
  admin: {
    useAsTitle: "email",
    defaultColumns: ["name", "email", "createdAt"],
  },
  access: {
    read: authenticated,
    create: anyone, // Public: contact form
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
