import { useCart } from '../context/CartContext'

function CartButton({ onClick }) {
  const { totalItems } = useCart()

  if (totalItems === 0) return null

  return (
    <button
      onClick={onClick}
      className="fixed bottom-5 right-5 z-40 bg-turqui text-blanco rounded-full w-16 h-16 shadow-lg flex items-center justify-center active:bg-turqui-medio"
    >
      <span className="text-2xl">🛍️</span>
      <span className="absolute -top-1 -right-1 bg-dorado text-turqui text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
        {totalItems}
      </span>
    </button>
  )
}

export default CartButton