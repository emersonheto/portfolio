import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { slateEditor } from '@payloadcms/richtext-slate'
import { webpackBundler } from '@payloadcms/bundler-webpack'
import path from 'path'

// Collections will be imported here
import Profile from './src/collections/Profile'
import Projects from './src/collections/Projects'
import Experience from './src/collections/Experience'
import Education from './src/collections/Education'
import Certifications from './src/collections/Certifications'
import Skills from './src/collections/Skills'
import Messages from './src/collections/Messages'

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  admin: {
    user: 'users',
    bundler: webpackBundler(),
  },
  collections: [
    Profile,
    Projects,
    Experience,
    Education,
    Certifications,
    Skills,
    Messages,
  ],
  editor: slateEditor({}),
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI,
    },
  }),
  typescript: {
    outputFile: path.resolve(__dirname, 'src/payload-types.ts'),
  },
})
