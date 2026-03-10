import { getPayload } from 'payload'
import config from '../src/payload/config'

async function main() {
  const payload = await getPayload({ config })
  payload.logger.info('Database schema initialized successfully')
  process.exit(0)
}

main().catch((err) => {
  console.error('Failed to initialize database:', err.message)
  process.exit(1)
})
