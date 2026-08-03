// Número de WhatsApp del negocio (formato internacional, sin espacios ni +)
// TEMPORAL: reemplazar cuando tengan el número oficial de AuraImperial
export const NUMERO_WHATSAPP = '573178300244'

function formatearPrecio(precio) {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(precio)
}

export function generarMensajeWhatsApp(items, totalPrecio) {
  let mensaje = '¡Hola! Quiero hacer este pedido en AuraImperial:\n\n'

  items.forEach((item) => {
    mensaje += `• ${item.nombre}\n`
    mensaje += `  Cantidad: ${item.cantidad} — ${formatearPrecio(item.precio)} c/u\n`
    mensaje += `  Subtotal: ${formatearPrecio(item.precio * item.cantidad)}\n\n`
  })

  mensaje += `Total del pedido: ${formatearPrecio(totalPrecio)}`

  return mensaje
}

export function generarLinkWhatsApp(items, totalPrecio) {
  const mensaje = generarMensajeWhatsApp(items, totalPrecio)
  const mensajeCodificado = encodeURIComponent(mensaje)
  return `https://wa.me/${NUMERO_WHATSAPP}?text=${mensajeCodificado}`
}