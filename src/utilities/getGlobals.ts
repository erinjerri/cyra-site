import config from '@payload-config'
import { getPayload } from 'payload'

export async function getHeader() {
  const payload = await getPayload({ config })
  return payload.findGlobal({ slug: 'header', depth: 0 })
}

export async function getFooter() {
  const payload = await getPayload({ config })
  return payload.findGlobal({ slug: 'footer', depth: 0 })
}
