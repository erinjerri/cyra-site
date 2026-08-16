const redirects = async () => {
  const internetExplorerRedirect = {
    destination: '/ie-incompatible.html',
    has: [
      {
        type: 'header',
        key: 'user-agent',
        value: '(.*Trident.*)', // all ie browsers
      },
    ],
    permanent: false,
    source: '/:path((?!ie-incompatible.html$).*)', // all pages except the incompatibility page
  }

  /*
   * /philosophy was replaced by /about, which now carries the Mission, Vision,
   * Values and story in one place.
   *
   * This lives here rather than in the `redirects` collection because
   * @payloadcms/plugin-redirects only stores redirect documents — nothing in
   * the app reads them, so a CMS redirect silently does nothing and the old
   * page keeps rendering. next.config redirects are applied by Next itself.
   * Permanent, so search engines move the ranking across.
   */
  const philosophyToAbout = {
    source: '/philosophy',
    destination: '/about',
    permanent: true,
  }

  const redirects = [internetExplorerRedirect, philosophyToAbout]

  return redirects
}

export default redirects
