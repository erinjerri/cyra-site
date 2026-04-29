export type Media = {
  id: string
  alt?: string | null
  r2Url?: string | null
  url?: string | null
  filename?: string | null
  mimeType?: string | null
  filesize?: number | null
  width?: number | null
  height?: number | null
}

export type Page = {
  id: string
  title: string
  slug: string
  layout: unknown[]
}

export type User = {
  id: string
  email: string
}
