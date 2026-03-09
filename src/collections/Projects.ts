import { CollectionConfig } from 'payload'

const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'featured', 'createdAt'],
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
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'image',
      type: 'text',
      required: true,
    },
    {
      name: 'technologies',
      type: 'array',
      fields: [
        {
          name: 'technology',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'demoUrl',
      type: 'text',
    },
    {
      name: 'githubUrl',
      type: 'text',
    },
  ],
  hooks: {
    afterChange: [
      ({ doc }) => {
        // Trigger ISR revalidation
        if (typeof window === 'undefined') {
          // Only run on server
          const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
          const secret = process.env.PAYLOAD_SECRET

          if (secret) {
            fetch(
              `${siteUrl}/api/revalidate?secret=${secret}&path=/projects`,
              { method: 'GET' }
            ).catch((err) => console.error('ISR revalidation failed:', err))
          }
        }
      },
    ],
  },
}

export default Projects
