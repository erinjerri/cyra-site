import { League_Spartan, Poppins } from 'next/font/google'

// Display face: geometric, set at light weights so headlines read soft rather than shouty.
export const displayFont = League_Spartan({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
})

// Body face: rounded and gentle. 300/400 only — nothing heavier is used anywhere.
export const bodyFont = Poppins({
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500'],
  variable: '--font-body',
})
