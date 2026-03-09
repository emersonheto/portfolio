import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import path from 'path'

// Collections
import Users from '../collections/Users'
import Profile from '../collections/Profile'
import Projects from '../collections/Projects'
import Experience from '../collections/Experience'
import Education from '../collections/Education'
import Certifications from '../collections/Certifications'
import Skills from '../collections/Skills'
import Messages from '../collections/Messages'

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  secret: process.env.PAYLOAD_SECRET || '',
  admin: {
    user: 'users',
    importMap: {
      baseDir: path.resolve(__dirname, '../..'),
    },
  },
  collections: [
    Users,
    Profile,
    Projects,
    Experience,
    Education,
    Certifications,
    Skills,
    Messages,
  ],
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI,
    },
  }),
  typescript: {
    outputFile: path.resolve(__dirname, '../../src/payload-types.ts'),
  },
  // Email can be configured later
  // email: {
  //   fromAddress: 'noreply@payloadcms.com',
  //   fromName: 'Payload CMS',
  // },
})
