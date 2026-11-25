import { authenticated } from "./access";
import { CollectionConfig } from "payload";

const Users: CollectionConfig = {
  slug: "users",
  auth: {
    // Brute-force protection: lock the account for 15 minutes after 5 failed logins.
    maxLoginAttempts: 5,
    lockTime: 15 * 60 * 1000,
    // forgot/reset/unlock stay enabled: no email adapter is configured in src/payload/config.ts
    // (the `email` block is commented out), so Payload only logs messages and no mail leaves the server.
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
