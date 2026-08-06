import { useState, useEffect } from 'react'
import { useCart } from '../context/CartContext'

function formatearPrecio(precio) {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(precio)
}

function ProductModal({ producto, varianteInicial = 0, onClose, onAgregado }) {
  const [varianteIndex, setVarianteIndex] = useState(varianteInicial)
  const [indiceImagen, setIndiceImagen] = useState(0)
  const [cantidad, setCantidad] = useState(1)
  const [inicioX, setInicioX] = useState(null)
  const { agregarProducto } = useCart()

  const tieneVariantes = Array.isArray(producto.variantes)
  const imagenes = tieneVariantes
    ? producto.variantes[varianteIndex].imagenes
    : producto.imagenes

  useEffect(() => {
    setIndiceImagen(0)
  }, [varianteIndex])

  function imagenAnterior() {
    setIndiceImagen((i) => (i === 0 ? imagenes.length - 1 : i - 1))
  }

  function imagenSiguiente() {
    setIndiceImagen((i) => (i === imagenes.length - 1 ? 0 : i + 1))
  }

  function manejarInicioToque(e) {
    setInicioX(e.touches[0].clientX)
  }

  function manejarFinToque(e) {
    if (inicioX === null) return

    const finX = e.changedTouches[0].clientX
    const diferencia = inicioX - finX
    const distanciaMinima = 50

    if (diferencia > distanciaMinima) {
      imagenSiguiente()
    } else if (diferencia < -distanciaMinima) {
      imagenAnterior()
    }

    setInicioX(null)
  }

  function handleAgregar() {
    const productoParaCarrito = tieneVariantes
      ? {
          ...producto,
          id: `${producto.id}-${producto.variantes[varianteIndex].color}`,
          nombre: `${producto.nombre} (${producto.variantes[varianteIndex].color})`,
          imagenes: producto.variantes[varianteIndex].imagenes,
        }
      : producto

    agregarProducto(productoParaCarrito, cantidad)
    onAgregado(`${productoParaCarrito.nombre} agregado al carrito`)
    onClose()
  }

  function compartirProducto() {
    const url = window.location.href
    const texto = `Mira esta pieza de AuraImperial: ${producto.nombre} — ${formatearPrecio(producto.precio)}`

    if (navigator.share) {
      navigator.share({
        title: producto.nombre,
        text: texto,
        url: url,
      })
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div
        className="absolute inset-0 bg-turqui/60"
        onClick={onClose}
      />

      <div className="relative bg-blanco w-full sm:max-w-md sm:rounded-2xl rounded-t-3xl max-h-[90vh] overflow-y-auto">
        <div className="absolute top-3 right-3 left-3 z-10 flex justify-between">
          {typeof navigator.share === 'function' ? (
            <button
              onClick={compartirProducto}
              className="w-9 h-9 rounded-full bg-turqui/80 text-blanco flex items-center justify-center"
              aria-label="Compartir producto"
            >
              ↗
            </button>
          ) : (
            <span />
          )}
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-turqui/80 text-blanco text-lg flex items-center justify-center"
          >
            ✕
          </button>
        </div>

        <div
          className="relative"
          onTouchStart={manejarInicioToque}
          onTouchEnd={manejarFinToque}
        >
          <img
            src={import.meta.env.BASE_URL + imagenes[indiceImagen]}
            alt={producto.nombre}
            className="w-full aspect-square object-cover select-none"
            draggable="false"
          />
          {imagenes.length > 1 && (
            <>
              <button
                onClick={imagenAnterior}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-turqui/70 text-blanco flex items-center justify-center"
              >
                ‹
              </button>
              <button
                onClick={imagenSiguiente}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-turqui/70 text-blanco flex items-center justify-center"
              >
                ›
              </button>
              <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
                {imagenes.map((_, i) => (
                  <span
                    key={i}
                    className={`w-1.5 h-1.5 rounded-full ${
                      i === indiceImagen ? 'bg-dorado' : 'bg-blanco/60'
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        <div className="p-5">
          <h2 className="font-display text-2xl text-turqui font-semibold">
            {producto.nombre}
          </h2>
          <p className="font-body text-2xl text-dorado font-semibold mt-2 mb-3">
            {formatearPrecio(producto.precio)}
          </p>

          {tieneVariantes && (
            <div className="mb-4">
              <span className="font-body text-sm text-turqui/70 block mb-2">
                Color: <span className="font-semibold text-turqui">{producto.variantes[varianteIndex].color}</span>
              </span>
              <div className="flex gap-2">
                {producto.variantes.map((variante, index) => (
                  <button
                    key={variante.color}
                    onClick={() => setVarianteIndex(index)}
                    className={`w-8 h-8 rounded-full border-2 ${
                      index === varianteIndex ? 'border-dorado' : 'border-turqui/20'
                    }`}
                    style={{ backgroundColor: variante.colorHex }}
                    aria-label={variante.color}
                  />
                ))}
              </div>
            </div>
          )}

          <p className="font-body text-sm text-turqui/70 leading-relaxed mb-6 whitespace-pre-line">
            {producto.descripcionDetallada}
          </p>

          <div className="flex items-center justify-between mb-4">
            <span className="font-body text-turqui font-medium">Cantidad</span>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setCantidad((c) => Math.max(1, c - 1))}
                className="w-10 h-10 rounded-lg bg-turqui/10 text-turqui text-lg font-bold active:bg-turqui/20"
              >
                −
              </button>
              <span className="font-body text-turqui font-semibold text-lg w-6 text-center">
                {cantidad}
              </span>
              <button
                onClick={() => setCantidad((c) => c + 1)}
                className="w-10 h-10 rounded-lg bg-turqui/10 text-turqui text-lg font-bold active:bg-turqui/20"
              >
                +
              </button>
            </div>
          </div>

          <button
            onClick={handleAgregar}
            className="w-full bg-turqui text-blanco font-body font-medium py-3.5 rounded-xl active:bg-turqui-medio"
          >
            Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductModal