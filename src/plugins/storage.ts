import { s3Storage } from '@payloadcms/storage-s3'
import type { Plugin } from 'payload'

/**
 * Cloudflare R2 media storage.
 *
 * R2 is S3-compatible, so the standard @payloadcms/storage-s3 adapter drives it
 * with `region: 'auto'` and an R2 endpoint. Env var names match
 * erinjerri-portf-template so this block ports between repos unchanged — see
 * docs/MediaStorage.md.
 *
 * Opt-in by design: with USE_R2_STORAGE unset, uploads fall back to local disk
 * (`public/media`), so local dev and CI need no cloud credentials. Any non-local
 * deploy MUST set it, or uploaded files vanish on the next deploy.
 */

const bucket = process.env.R2_BUCKET?.trim()
const accountId = process.env.R2_ACCOUNT_ID?.trim()
const accessKeyId = process.env.R2_ACCESS_KEY_ID?.trim()
const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY?.trim()

// Endpoint can be given explicitly, or derived from the account ID.
const endpoint =
  process.env.R2_ENDPOINT?.trim() ||
  (accountId ? `https://${accountId}.r2.cloudflarestorage.com` : undefined)

// Public hostname (custom domain or r2.dev) used to serve files directly,
// bypassing the Next.js server. Without it, reads proxy through Payload.
const publicHostname = process.env.R2_PUBLIC_HOSTNAME?.trim() || process.env.R2_PUBLIC_URL?.trim()

const enabled = process.env.USE_R2_STORAGE === 'true'
const serveDirectly = Boolean(publicHostname)

export const isR2Configured = Boolean(enabled && bucket && endpoint && accessKeyId && secretAccessKey)

function buildFileURL({ filename, prefix }: { filename: string; prefix?: string }): string {
  const base = `https://${(publicHostname as string).replace(/^https?:\/\//, '').replace(/\/+$/, '')}`
  const name = encodeURIComponent(String(filename).replace(/^\/+/, ''))
  return prefix ? `${base}/${prefix}/${name}` : `${base}/${name}`
}

export const storagePlugins: Plugin[] = isR2Configured
  ? [
      s3Storage({
        collections: {
          media: serveDirectly
            ? { disablePayloadAccessControl: true, generateFileURL: buildFileURL }
            : true,
        },
        bucket: bucket as string,
        config: {
          credentials: {
            accessKeyId: accessKeyId as string,
            secretAccessKey: secretAccessKey as string,
          },
          endpoint: endpoint as string,
          region: 'auto',
          forcePathStyle: process.env.R2_FORCE_PATH_STYLE !== 'false',
        },
      }),
    ]
  : []
