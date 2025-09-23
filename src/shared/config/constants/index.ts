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
  cv: 'https://luigfmp.github.io/cv/',
  resumeAbout: 'Desarrollador y diseñador de aplicaciones full stack',
  hobbies: ['Estudiar', 'Leer', 'Entrenar', 'Programar', 'Investigar', 'Gatos', 'Hamsters', 'Músicas', 'Meditar']
} as const

export const SOCIAL = {
  Gmail: {
    url: 'mailto:luigfmp@gmail.com?subject=Hola&cc=otro@correo.com&bcc=secret@correo.com&body=Este%20es%20el%20mensaje',
    display: 'luigfmp@gmail.com'
  },
  GitHub: {
    url: 'https://github.com/Luis-Fernando-MP',
    display: '@Luis-Fernando-MP'
  },
  LinkedIn: {
    url: 'https://www.linkedin.com/in/luigfmp/',
    display: 'in-Luis Fernando'
  },
  Figma: {
    url: 'https://www.figma.com/@luigfmp',
    display: '@luigfmp'
  },
  WhatsApp: {
    url: `https://wa.me/${INFO.phone}?text=Hola%20Luis`,
    display: `+51 ${INFO.phone}`
  }
}
