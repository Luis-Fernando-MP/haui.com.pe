export type Testimony = {
  id: string
  autor: string
  photo: string
  role: string
  webPage?: string
  githubPage?: string
  mailTo?: string
  degree: string
  testimonial: string
}

export const testimonies: Testimony[] = [
  {
    id: 'testimony-1',
    autor: 'María Rodríguez',
    photo: '/assets/default_profile.webp',
    role: 'CTO en NovaLabs',
    webPage: 'https://www.novalabs.fake',
    githubPage: 'https://github.com/maria-rodriguez',
    mailTo: 'mailto:maria.rodriguez@novalabs.fake',
    degree: 'MSc. en Ingeniería de Software',
    testimonial:
      'Colaborar con Luis Fernando ha sido clave para impulsar nuestra estrategia digital. Su compromiso, visión estética y atención a los detalles marcaron una gran diferencia en la presentación de nuestra marca. ¡Un talento que destaca en cualquier equipo!'
  },
  {
    id: 'testimony-2',
    autor: 'Carlos Méndez',
    photo: '/assets/default_profile.webp',
    role: 'Líder de Producto en ByteForge',
    webPage: 'https://www.byteforge.fake',
    mailTo: 'mailto:carlos.mendez@byteforge.fake',
    degree: 'MBA en Gestión de Proyectos Tecnológicos',
    testimonial:
      'Luis Fernando aporta no solo habilidades técnicas, sino una sensibilidad especial para entender las necesidades del usuario. Su trabajo ha elevado la calidad y usabilidad de nuestros productos. ¡Una mente creativa y resolutiva!'
  },
  {
    id: 'testimony-3',
    autor: 'Laura Sánchez',
    photo: '/assets/default_profile.webp',
    role: 'UX Manager en Creatix Studio',
    githubPage: 'https://github.com/laura-sanchez',
    degree: 'Lic. en Diseño Digital',
    testimonial:
      'Desde el primer momento, Luis demostró una capacidad impresionante para transformar ideas en experiencias funcionales. Su enfoque humano y profesional marcó la diferencia en cada entrega. ¡Recomiendo su trabajo sin dudarlo!'
  },
  {
    id: 'testimony-4',
    autor: 'Andrés Navarro',
    photo: '/assets/default_profile.webp',
    role: 'CEO en PixelBloom',
    webPage: 'https://www.pixelbloom.fake',
    githubPage: 'https://github.com/andres-navarro',
    mailTo: 'mailto:andres.navarro@pixelbloom.fake',
    degree: 'Ing. en Sistemas Computacionales',
    testimonial:
      'Con Luis Fernando encontramos a alguien que entiende la importancia del diseño enfocado en resultados. Su colaboración nos permitió lanzar un producto sólido, elegante y efectivo en tiempo récord. ¡Un verdadero aliado estratégico!'
  },
  {
    id: 'testimony-5',
    autor: 'María Rodríguez',
    photo: '/assets/default_profile.webp',
    role: 'CTO en NovaLabs',
    webPage: 'https://www.novalabs.fake',
    githubPage: 'https://github.com/maria-rodriguez',
    mailTo: 'mailto:maria.rodriguez@novalabs.fake',
    degree: 'MSc. en Ingeniería de Software',
    testimonial:
      'Colaborar con Luis Fernando ha sido clave para impulsar nuestra estrategia digital. Su compromiso, visión estética y atención a los detalles marcaron una gran diferencia en la presentación de nuestra marca. ¡Un talento que destaca en cualquier equipo!'
  },
  {
    id: 'testimony-6',
    autor: 'Carlos Méndez',
    photo: '/assets/default_profile.webp',
    role: 'Líder de Producto en ByteForge',
    webPage: 'https://www.byteforge.fake',
    mailTo: 'mailto:carlos.mendez@byteforge.fake',
    degree: 'MBA en Gestión de Proyectos Tecnológicos',
    testimonial:
      'Luis Fernando aporta no solo habilidades técnicas, sino una sensibilidad especial para entender las necesidades del usuario. Su trabajo ha elevado la calidad y usabilidad de nuestros productos. ¡Una mente creativa y resolutiva!'
  },
  {
    id: 'testimony-7',
    autor: 'Laura Sánchez',
    photo: '/assets/default_profile.webp',
    role: 'UX Manager en Creatix Studio',
    githubPage: 'https://github.com/laura-sanchez',
    degree: 'Lic. en Diseño Digital',
    testimonial:
      'Desde el primer momento, Luis demostró una capacidad impresionante para transformar ideas en experiencias funcionales. Su enfoque humano y profesional marcó la diferencia en cada entrega. ¡Recomiendo su trabajo sin dudarlo!'
  },
  {
    id: 'testimony-8',
    autor: 'Andrés Navarro',
    photo: '/assets/default_profile.webp',
    role: 'CEO en PixelBloom',
    webPage: 'https://www.pixelbloom.fake',
    githubPage: 'https://github.com/andres-navarro',
    mailTo: 'mailto:andres.navarro@pixelbloom.fake',
    degree: 'Ing. en Sistemas Computacionales',
    testimonial:
      'Con Luis Fernando encontramos a alguien que entiende la importancia del diseño enfocado en resultados. Su colaboración nos permitió lanzar un producto sólido, elegante y efectivo en tiempo récord. ¡Un verdadero aliado estratégico!'
  }
]
