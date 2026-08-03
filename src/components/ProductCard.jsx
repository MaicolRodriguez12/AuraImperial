function formatearPrecio(precio) {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(precio)
}

function ProductCard({ producto, onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-white border border-turqui/10 rounded-2xl overflow-hidden shadow-sm text-left"
    >
      <img
        src={import.meta.env.BASE_URL + producto.imagenes[0]}
        className="w-full aspect-square object-cover"
      />
      <div className="p-3">
        <h3 className="font-display text-base text-turqui font-semibold leading-tight">
          {producto.nombre}
        </h3>
        <p className="font-body text-xs text-turqui/60 mt-1 mb-2 line-clamp-1">
          {producto.descripcionCorta}
        </p>
        <p className="font-body text-lg text-dorado font-semibold">
          {formatearPrecio(producto.precio)}
        </p>
      </div>
    </button>
  )
}

export default ProductCard