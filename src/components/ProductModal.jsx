import { useState } from 'react'
import { useCart } from '../context/CartContext'

function formatearPrecio(precio) {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(precio)
}

function ProductModal({ producto, onClose }) {
  const [indiceImagen, setIndiceImagen] = useState(0)
  const [cantidad, setCantidad] = useState(1)
  const { agregarProducto } = useCart()

  function imagenAnterior() {
    setIndiceImagen((i) => (i === 0 ? producto.imagenes.length - 1 : i - 1))
  }

  function imagenSiguiente() {
    setIndiceImagen((i) => (i === producto.imagenes.length - 1 ? 0 : i + 1))
  }

  function handleAgregar() {
    agregarProducto(producto, cantidad)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      {/* Fondo oscuro semitransparente, clic para cerrar */}
      <div
        className="absolute inset-0 bg-turqui/60"
        onClick={onClose}
      />

      {/* Hoja del modal */}
      <div className="relative bg-blanco w-full sm:max-w-md sm:rounded-2xl rounded-t-3xl max-h-[90vh] overflow-y-auto">
        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-turqui/80 text-blanco text-lg flex items-center justify-center"
        >
          ✕
        </button>

        {/* Carrusel */}
        <div className="relative">
          <img
            src={producto.imagenes[indiceImagen]}
            alt={producto.nombre}
            className="w-full aspect-square object-cover"
          />
          {producto.imagenes.length > 1 && (
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
                {producto.imagenes.map((_, i) => (
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

        {/* Info del producto */}
        <div className="p-5">
          <h2 className="font-display text-2xl text-turqui font-semibold">
            {producto.nombre}
          </h2>
          <p className="font-body text-2xl text-dorado font-semibold mt-2 mb-4">
            {formatearPrecio(producto.precio)}
          </p>
          <p className="font-body text-sm text-turqui/70 leading-relaxed mb-6">
            {producto.descripcionDetallada}
          </p>

          {/* Selector de cantidad */}
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