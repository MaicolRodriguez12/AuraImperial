import { useCart } from '../context/CartContext'
import { generarLinkWhatsApp } from '../utils/whatsapp'

function formatearPrecio(precio) {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(precio)
}

function CartPanel({ onClose }) {
  const { items, cambiarCantidad, quitarProducto, totalPrecio } = useCart()

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-turqui/60" onClick={onClose} />

      <div className="relative bg-blanco w-full sm:max-w-md sm:rounded-2xl rounded-t-3xl max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-5 border-b border-turqui/10">
          <h2 className="font-display text-xl text-turqui font-semibold">
            Tu pedido
          </h2>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-turqui/10 text-turqui flex items-center justify-center"
          >
            ✕
          </button>
        </div>

        <div className="overflow-y-auto flex-1 p-5">
          {items.length === 0 ? (
            <p className="text-center text-turqui/50 font-body py-10">
              Tu carrito está vacío
            </p>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3 items-center">
                  <img
                    src={item.imagenes[0]}
                    alt={item.nombre}
                    className="w-16 h-16 rounded-xl object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-body text-sm text-turqui font-semibold">
                      {item.nombre}
                    </h3>
                    <p className="font-body text-sm text-dorado font-semibold">
                      {formatearPrecio(item.precio)}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <button
                        onClick={() => cambiarCantidad(item.id, item.cantidad - 1)}
                        className="w-7 h-7 rounded-md bg-turqui/10 text-turqui font-bold active:bg-turqui/20"
                      >
                        −
                      </button>
                      <span className="font-body text-turqui text-sm w-4 text-center">
                        {item.cantidad}
                      </span>
                      <button
                        onClick={() => cambiarCantidad(item.id, item.cantidad + 1)}
                        className="w-7 h-7 rounded-md bg-turqui/10 text-turqui font-bold active:bg-turqui/20"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => quitarProducto(item.id)}
                    className="text-turqui/40 text-sm font-body"
                  >
                    Quitar
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="p-5 border-t border-turqui/10">
            <div className="flex justify-between items-center mb-4">
              <span className="font-body text-turqui font-medium">Total</span>
              <span className="font-display text-xl text-dorado font-semibold">a
                {formatearPrecio(totalPrecio)}
              </span>
            </div>
            <button
            onClick={() => {
                const link = generarLinkWhatsApp(items, totalPrecio)
                window.open(link, '_blank')
            }}
            className="w-full bg-turqui text-blanco font-body font-medium py-3.5 rounded-xl active:bg-turqui-medio"
            >
            Finalizar pedido por WhatsApp
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default CartPanel