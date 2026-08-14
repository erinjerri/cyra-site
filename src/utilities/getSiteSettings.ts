import config from '@payload-config'
import { getPayload } from 'payload'

export async function getSiteSettings() {
  const payload = await getPayload({ config })
  return payload.findGlobal({ slug: 'site-settings', depth: 0 })
}
