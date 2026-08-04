import { NUMERO_WHATSAPP } from '../utils/whatsapp'

function WhatsAppHelpButton() {
  const mensaje = encodeURIComponent(
    'Hola, tengo una duda sobre un producto de AuraImperial 😊'
  )
  const link = `https://wa.me/${NUMERO_WHATSAPP}?text=${mensaje}`

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 left-5 z-40 bg-green-500 text-blanco rounded-full w-14 h-14 shadow-lg flex items-center justify-center active:bg-green-600"
      aria-label="Escríbenos por WhatsApp"
    >
      <span className="text-2xl">💬</span>
    </a>
  )
}

export default WhatsAppHelpButton