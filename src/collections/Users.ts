import { CollectionConfig } from 'payload'

const Users: CollectionConfig = {
  slug: 'users',
  auth: {
    verify: false,
  },
  admin: {
    useAsTitle: 'email',
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'name',
      label: 'Name',
      type: 'text',
    },
  ],
}

export default Users
