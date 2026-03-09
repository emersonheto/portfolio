import { payload } from '@/payload'
import { RouteHandler } from '@payloadcms/next/handlers'

const handler = payloadRouteHandler

export default payload

const payloadRouteHandler: RouteHandler = async (req, { params }) => {
  return payload.handler(req, { params })
}

export const config = {
  runtime: 'nodejs',
}
