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
  const varianteActiva = tieneVariantes ? producto.variantes[varianteIndex] : null
  const imagenes = tieneVariantes ? varianteActiva.imagenes : producto.imagenes
  const precioMostrado = tieneVariantes ? varianteActiva.precio : producto.precio
  const esVariantePorColor = tieneVariantes && producto.variantes[0].colorHex

  function handleSwatchClick(e, index) {
    e.stopPropagation()
    setVarianteIndex(index)
  }

  return (
    <button
      onClick={() => onClick(producto, varianteIndex)}
      className="bg-white border border-turqui/10 rounded-2xl overflow-hidden shadow-sm text-left"
    >
      <img
        src={import.meta.env.BASE_URL + imagenes[0]}
        alt={producto.nombre}
        className="w-full aspect-square object-cover"
      />
      <div className="p-3">
        <h3 className="font-display text-base text-turqui font-semibold leading-tight">
          {producto.nombre}
        </h3>
        <p className="font-body text-xs text-turqui/60 mt-1 mb-2 line-clamp-1">
          {producto.descripcionCorta}
        </p>

        {tieneVariantes && esVariantePorColor && (
          <div className="flex gap-1.5 mb-2">
            {producto.variantes.map((variante, index) => (
              <span
                key={variante.color}
                onClick={(e) => handleSwatchClick(e, index)}
                className={`w-5 h-5 rounded-full border-2 ${
                  index === varianteIndex ? 'border-dorado' : 'border-transparent'
                }`}
                style={{ backgroundColor: variante.colorHex }}
                aria-label={variante.color}
              />
            ))}
          </div>
        )}

        {tieneVariantes && !esVariantePorColor && (
          <div className="flex gap-1.5 mb-2 flex-wrap">
            {producto.variantes.map((variante, index) => (
              <span
                key={variante.nombre}
                onClick={(e) => handleSwatchClick(e, index)}
                className={`text-xs font-body px-2 py-1 rounded-full border ${
                  index === varianteIndex
                    ? 'bg-turqui text-blanco border-turqui'
                    : 'bg-turqui/5 text-turqui border-turqui/20'
                }`}
              >
                {variante.nombre}
              </span>
            ))}
          </div>
        )}

        <p className="font-body text-lg text-dorado font-semibold">
          {formatearPrecio(precioMostrado)}
        </p>
      </div>
    </button>
  )
}

export default ProductCard