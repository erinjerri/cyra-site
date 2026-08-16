import { LayoutSketch } from './LayoutSketch'
import { MediaFrame } from './MediaFrame'
import { resolveMedia } from './media'
import type { MediaContent } from './types'

/**
 * The hero product composition: the Mac window with a phone standing in front
 * of it, the way the reference sites lead with a device rather than with type.
 *
 * Both slots are ordinary CMS media, so uploading the real captures replaces
 * the schematics with no code change. The phone is optional — with no phone
 * media set, the Mac window renders alone rather than showing an empty frame,
 * which matters because the iPhone app is still in development and a fake
 * phone screenshot would be claiming something that does not exist.
 */
export function ProductShowcase({
  desktop,
  phone,
}: {
  desktop: MediaContent
  phone?: MediaContent & { enabled?: boolean | null }
}) {
  const phoneMedia = phone ? resolveMedia(phone) : null
  const showPhone = Boolean(phone && phone.enabled !== false)

  return (
    <div className={`tb-showcase-stage${showPhone ? ' tb-showcase-stage-with-phone' : ''}`}>
      <div className="tb-showcase-desktop">
        <MediaFrame priority ratio="16 / 10" source={desktop} title="TimeBite" />
      </div>

      {showPhone ? (
        <div className="tb-showcase-phone">
          <div className="tb-phone-frame">
            <span aria-hidden="true" className="tb-phone-notch" />
            <div className="tb-phone-screen">
              {phoneMedia?.poster ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img alt={phoneMedia.alt} src={phoneMedia.poster} />
              ) : (
                <div
                  className="tb-phone-sketch"
                  role="img"
                  aria-label={
                    phoneMedia?.alt || 'Schematic of the TimeBite day view on iPhone: today’s actions in a list.'
                  }
                >
                  <LayoutSketch kind={phoneMedia?.sketch || 'list'} />
                </div>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
