import { CollectionConfig } from 'payload'

const Education: CollectionConfig = {
  slug: 'education',
  admin: {
    useAsTitle: 'degree',
    defaultColumns: ['degree', 'institution', 'startDate', 'endDate'],
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'institution',
      type: 'text',
      required: true,
    },
    {
      name: 'degree',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'startDate',
      type: 'date',
      required: true,
    },
    {
      name: 'endDate',
      type: 'date',
    },
  ],
}

export default Education
