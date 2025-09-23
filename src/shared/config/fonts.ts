import { Geist, Geist_Mono, Noto_Color_Emoji, Rubik_Lines, Send_Flowers } from 'next/font/google'

export const geist = Geist({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-geist-text'
})

export const geist_mono = Geist_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-geist-mono'
})

export const send_flowers = Send_Flowers({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-send-flowers'
})

export const noto = Noto_Color_Emoji({
  subsets: ['emoji'],
  weight: ['400'],
  variable: '--font-emojis'
})

export const rubik_lines = Rubik_Lines({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-rubik-lines'
})

export const bodyFonts = `${geist.variable} ${geist_mono.variable} ${send_flowers.variable} ${noto.variable} ${rubik_lines.variable}`
