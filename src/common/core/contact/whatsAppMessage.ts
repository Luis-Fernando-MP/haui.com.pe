export const createWhatsAppMessage = (phone: string) => {
  const message = `¡Hola Luis Fernando! 👋
Me encontré con tu perfil y me interesó mucho tu experiencia en [área relevante]. Tengo una idea/proyecto que podría alinearse con lo que haces.
¿Te animas a platicar un rato? Avísame cuándo te viene bien.
¡Saludos!`

  return {
    url: `https://wa.me/${phone}?text=${encodeURIComponent(message)}`,
    display: `+51 ${phone}`
  }
}
