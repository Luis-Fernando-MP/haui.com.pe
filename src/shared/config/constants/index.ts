import { createPersonalMailTo } from '@/lib/mailto'
import { createWhatsAppMessage } from '@/lib/whatsAppMessage'

export const INFO = {
  devName: 'Haui dev',
  devShortName: 'Haui',
  name: 'Luis Fernando',
  fullName: 'Luis Fernando Melgar Pizarro',
  working: {
    state: false,
    enterprise: ''
  },
  phone: '958978370',
  cv: 'https://drive.google.com/file/d/1uL6k9y1Sd64ZkVKYiXXFL1FZy-5RDPGV/view?usp=sharing',
  resumeAbout: 'Desarrollador y diseñador de aplicaciones full stack',
  hobbies: ['Estudiar', 'Leer', 'Entrenar', 'Programar', 'Investigar', 'Gatos', 'Hamsters', 'Músicas', 'Meditar'],
  testimonios_discussions: 'https://github.com/Luis-Fernando-MP/haui.com.pe/discussions/new?category=testimonios'
} as const

export const SOCIAL = {
  Gmail: createPersonalMailTo('luigfmp@gmail.com'),
  GitHub: {
    url: 'https://github.com/Luis-Fernando-MP',
    display: '@Luis-Fernando-MP'
  },
  LinkedIn: {
    url: 'https://www.linkedin.com/in/luis-fernando-melgar-pizarro',
    display: 'in-Luis Fernando'
  },
  Figma: {
    url: 'https://www.figma.com/@haui',
    display: '@haui'
  },
  WhatsApp: createWhatsAppMessage(INFO.phone)
}
