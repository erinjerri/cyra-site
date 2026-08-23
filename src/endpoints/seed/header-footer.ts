export const headerData = {
  logoText: 'TimeBite',
  logoTag: 'by Creating Your Reality',
  navLinks: [
    { label: 'Shop', url: '/shop' },
    { label: 'Pricing', url: '/pricing' },
    { label: 'About', url: '/about' },
  ],
  cta: { label: 'Join Beta', url: '/#beta' },
}

export const footerData = {
  brandStatement:
    'Creating Your Reality is the philosophy behind TimeBite, and everything we build next.',
  columns: [
    {
      title: 'Digital',
      accent: 'blue',
      links: [
        { label: 'macOS', url: '/#platforms' },
        { label: 'iOS', url: '/#platforms' },
        { label: 'watchOS', url: '/#platforms' },
        { label: 'visionOS', url: '/#platforms' },
        { label: 'AI Glasses', comingSoon: true },
      ],
    },
    {
      title: 'Shop',
      accent: 'pink',
      links: [
        { label: 'Shop', url: '/shop' },
        { label: 'Pricing', url: '/pricing' },
        { label: 'CYR Planner', url: '/shop/planner' },
        { label: 'App + planner bundle', url: '/pricing#bundle' },
        { label: 'Planner list', url: '/shop#planner-interest' },
      ],
    },
    {
      title: 'Features',
      accent: 'teal',
      links: [
        { label: 'Intentional Living', url: '/about' },
        { label: 'Sustainable Productivity', url: '/#features' },
        { label: 'Kanban', url: '/#features' },
        { label: 'Ikigai', url: '/#features' },
        { label: 'AI Agents', url: '/#agents' },
      ],
    },
    {
      title: 'Company',
      accent: 'gold',
      links: [
        { label: 'About', url: '/about' },
        { label: 'Our Mission', url: '/about' },
        { label: 'Blog', url: '/blog' },
        { label: 'FAQ', url: '/#faq' },
      ],
    },
  ],
  connect: {
    title: 'Connect',
    // A blank url renders the icon dimmed rather than linking nowhere.
    links: [
      { platform: 'github', url: 'https://github.com/erinjerri' },
      { platform: 'linkedin', url: '' },
      { platform: 'substack', url: 'https://erinjerri.substack.com/' },
      { platform: 'youtube', url: '' },
      { platform: 'instagram', url: '' },
      { platform: 'x', url: '' },
      { platform: 'tiktok', url: '' },
      { platform: 'pinterest', url: '' },
    ],
  },
  // No URLs yet, so these render as plain text rather than links to a 404.
  // Add a url in /admin the moment the pages exist and they become links.
  legalLinks: [{ label: 'Privacy Policy' }, { label: 'Terms of Use' }],
  legalNote: `© ${new Date().getFullYear()} Creating Your Reality. All rights reserved.`,
  colophon: 'Made with Payload CMS.',
}
