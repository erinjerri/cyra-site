import type { BlockImage, MediaContent } from './types'

function uploadOf(value: BlockImage | undefined) {
  return value && typeof value === 'object' ? value : null
}

export type ResolvedMedia = {
  poster: string | null
  video: string | null
  alt: string
  caption: string | null
  frame: 'mac' | 'plain'
  sketch: MediaContent['sketch']
  /** True when neither a screenshot nor a video has been supplied yet. */
  empty: boolean
}

/**
 * Turns a CMS media slot into something renderable, whether the editor used an
 * upload, a public URL, or has not supplied anything at all.
 *
 * A slot is never "broken" — with nothing set it reports `empty`, and the
 * caller draws the schematic instead.
 */
export function resolveMedia(source: MediaContent): ResolvedMedia {
  const imageUpload = uploadOf(source.image)
  const videoUpload = uploadOf(source.video)

  const poster = imageUpload?.url || source.assetUrl || null
  const video = videoUpload?.url || source.videoUrl || null

  return {
    poster,
    video,
    alt: source.imageAlt || imageUpload?.alt || '',
    caption: source.mediaCaption || null,
    frame: source.mediaFrame === 'plain' ? 'plain' : 'mac',
    sketch: source.sketch,
    empty: !poster && !video,
  }
}
