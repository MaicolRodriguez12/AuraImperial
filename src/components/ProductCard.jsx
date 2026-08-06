import { useState } from 'react'

function formatearPrecio(precio) {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(precio)
}

function ProductCard({ producto, onClick }) {
  const [varianteIndex, setVarianteIndex] = useState(0)

  const tieneVariantes = Array.isArray(producto.variantes)
  const imagenes = tieneVariantes
    ? producto.variantes[varianteIndex].imagenes
    : producto.imagenes

  function handleSwatchClick(e, index) {
    e.stopPropagation()
    setVarianteIndex(index)
  }

  return (
    <button
      onClick={() => onClick(producto, varianteIndex)}
      className="bg-white border border-turqui/10 rounded-2xl overflow-hidden shadow-sm text-left h-full flex flex-col"
    >
      <div className="w-full aspect-square">
        <img
          src={import.meta.env.BASE_URL + imagenes[0]}
          alt={producto.nombre}
          className="w-full h-full object-cover block"
        />
      </div>

      <div className="p-3 flex flex-col flex-1">
        <h3 className="font-display text-base text-turqui font-semibold leading-tight h-10 line-clamp-2">
          {producto.nombre}
        </h3>

        <p className="font-body text-xs text-turqui/60 mt-1 mb-2 line-clamp-1">
          {producto.descripcionCorta}
        </p>

        {tieneVariantes && (
          <div className="flex gap-1.5 mb-2">
            {producto.variantes.map((variante, index) => (
              <span
                key={variante.color}
                onClick={(e) => handleSwatchClick(e, index)}
                className={`w-5 h-5 rounded-full border-2 ${
                  index === varianteIndex
                    ? 'border-dorado'
                    : 'border-transparent'
                }`}
                style={{ backgroundColor: variante.colorHex }}
                aria-label={variante.color}
              />
            ))}
          </div>
        )}

        <p className="mt-auto font-body text-lg text-dorado font-semibold">
          {formatearPrecio(producto.precio)}
        </p>
      </div>
    </button>
  )
}

export default ProductCard