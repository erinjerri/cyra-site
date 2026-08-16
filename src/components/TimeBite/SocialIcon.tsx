/**
 * Social glyphs, drawn inline rather than pulled from an icon package.
 *
 * Nine icons is well under the weight of a dependency, and inline paths inherit
 * `currentColor`, so they follow the theme without a second set of assets for
 * light mode.
 */

export type SocialPlatform =
  | 'github'
  | 'linkedin'
  | 'substack'
  | 'youtube'
  | 'instagram'
  | 'x'
  | 'tiktok'
  | 'pinterest'
  | 'discord'

export const SOCIAL_LABELS: Record<SocialPlatform, string> = {
  github: 'GitHub',
  linkedin: 'LinkedIn',
  substack: 'Substack',
  youtube: 'YouTube',
  instagram: 'Instagram',
  x: 'X',
  tiktok: 'TikTok',
  pinterest: 'Pinterest',
  discord: 'Discord',
}

const PATHS: Record<SocialPlatform, React.JSX.Element> = {
  github: (
    <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.36 1.09 2.94.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.35 4.68-4.58 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
  ),
  linkedin: (
    <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm6 0h3.8v1.71h.05c.53-.95 1.83-1.96 3.76-1.96 4.02 0 4.76 2.5 4.76 5.75V21h-4v-5.6c0-1.34-.02-3.06-1.9-3.06-1.9 0-2.19 1.45-2.19 2.96V21H9V9Z" />
  ),
  substack: (
    <path d="M4 3h16v2.6H4V3Zm0 4.4h16V10H4V7.4ZM4 11.8 12 16l8-4.2V21l-8-4.2L4 21v-9.2Z" />
  ),
  youtube: (
    <path d="M21.6 7.2a2.5 2.5 0 0 0-1.76-1.77C18.25 5 12 5 12 5s-6.25 0-7.84.43A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.76 1.77C5.75 19 12 19 12 19s6.25 0 7.84-.43a2.5 2.5 0 0 0 1.76-1.77A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8ZM10 15.2V8.8L15.5 12 10 15.2Z" />
  ),
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.2" cy="6.8" r="1.2" />
    </>
  ),
  x: <path d="M17.5 3h3.2l-7 8 8.2 10h-6.4l-5-6.1L4.7 21H1.5l7.5-8.6L1.1 3h6.6l4.5 5.6L17.5 3Zm-1.1 16h1.8L7.7 4.9H5.8L16.4 19Z" />,
  tiktok: (
    <path d="M16.5 3a5.6 5.6 0 0 0 4.5 4.5v3a8.6 8.6 0 0 1-4.5-1.4v6.2a6.3 6.3 0 1 1-6.3-6.3c.3 0 .6 0 .9.06v3.1a3.2 3.2 0 1 0 2.3 3.1V3h3.1Z" />
  ),
  pinterest: (
    <path d="M12 2a10 10 0 0 0-3.6 19.3c-.08-.8-.15-2.05.03-2.93.17-.8 1.1-5.1 1.1-5.1s-.28-.57-.28-1.4c0-1.32.76-2.3 1.72-2.3.81 0 1.2.6 1.2 1.34 0 .81-.52 2.03-.79 3.16-.22.94.47 1.71 1.4 1.71 1.69 0 2.98-1.78 2.98-4.34 0-2.27-1.63-3.86-3.96-3.86-2.7 0-4.28 2.02-4.28 4.11 0 .81.31 1.69.7 2.16.08.1.09.18.07.28l-.27 1.1c-.04.18-.14.22-.32.13-1.2-.56-1.95-2.3-1.95-3.71 0-3.02 2.2-5.8 6.33-5.8 3.32 0 5.9 2.37 5.9 5.53 0 3.3-2.08 5.96-4.97 5.96-.97 0-1.88-.5-2.19-1.1l-.6 2.28c-.21.84-.79 1.89-1.18 2.53A10 10 0 1 0 12 2Z" />
  ),
  discord: (
    <path d="M19.3 5.4A16.3 16.3 0 0 0 15.3 4l-.25.5a12 12 0 0 1 3.5 1.8 15.6 15.6 0 0 0-13.1 0A12 12 0 0 1 9 4.5L8.7 4a16.3 16.3 0 0 0-4 1.4C1.5 10.3.7 15 1.1 19.6A16.4 16.4 0 0 0 6.1 22l1-1.7a10.7 10.7 0 0 1-1.7-.8l.4-.3a11.7 11.7 0 0 0 10.4 0l.4.3c-.5.3-1.1.6-1.7.8l1 1.7a16.4 16.4 0 0 0 5-2.4c.5-5.3-.8-9.9-3.6-14.2ZM8.6 16.6c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.8.9 1.8 2-.8 2-1.8 2Zm6.8 0c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.8.9 1.8 2-.8 2-1.8 2Z" />
  ),
}

export function SocialIcon({ platform }: { platform: SocialPlatform }) {
  return (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="currentColor">
      {PATHS[platform]}
    </svg>
  )
}
