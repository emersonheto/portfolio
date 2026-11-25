import { authenticated } from "./access";
import { CollectionConfig } from "payload";

const Users: CollectionConfig = {
  slug: "users",
  auth: {
    verify: false,
  },
  admin: {
    useAsTitle: "email",
  },
  access: {
    read: authenticated,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    {
      name: "name",
      label: "Name",
      type: "text",
    },
  ],
};

export default Users;
