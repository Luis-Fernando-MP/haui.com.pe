export const createTestimonyMailto = (email: string) => {
  const subject = 'Consulta sobre Luis Fernando'
  const body = `¡Hola! 👋

Me pongo en contacto contigo para preguntarte si podrías compartir tu experiencia o impresiones sobre **Luis Fernando**. Me interesa conocer más sobre su desempeño, habilidades y cualquier otro aspecto relevante que consideres importante destacar.

Agradezco de antemano tu tiempo y ayuda. ✨

¡Quedo atento/a a tu respuesta!

Saludos cordiales,
[...]`
  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

export const createPersonalMailTo = (email: string) => {
  const subject = '🔴 Hola Luis Fernando'
  const body = `Hola Luis Fernando 👋,

Me topé con tu perfil y me llamó mucho la atención tu trabajo en [desarrollo de software/gestión de proyectos/otra área]. La verdad es que tengo una idea/proyecto en mente y creo que podrías ser un gran aliado para llevarlo adelante.

¿Te animarías a tomar un café virtual (o presencial) para platicar un poco más? Estoy seguro/a de que podemos encontrar sinergias interesantes.

Avísame qué día y hora te vienen mejor. ¡Gracias por tu tiempo!

Saludos cordiales,
---
Nombre:
Correo:
Teléfono:`

  return {
    url: `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
    display: email
  }
}
