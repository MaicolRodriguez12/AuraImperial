import { useState } from 'react'
import Header from './components/Header'
import ProductCard from './components/ProductCard'
import ProductModal from './components/ProductModal'
import CartButton from './components/CartButton'
import CartPanel from './components/CartPanel'
import { products } from './data/products'

function App() {
  const [productoSeleccionado, setProductoSeleccionado] = useState(null)
  const [carritoAbierto, setCarritoAbierto] = useState(false)

  return (
    <div className="min-h-screen bg-blanco">
      <Header />

      <main className="px-4 py-8">
        <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
          {products.map((producto) => (
            <ProductCard
              key={producto.id}
              producto={producto}
              onClick={() => setProductoSeleccionado(producto)}
            />
          ))}
        </div>
      </main>

      {productoSeleccionado && (
        <ProductModal
          producto={productoSeleccionado}
          onClose={() => setProductoSeleccionado(null)}
        />
      )}

      <CartButton onClick={() => setCarritoAbierto(true)} />

      {carritoAbierto && (
        <CartPanel onClose={() => setCarritoAbierto(false)} />
      )}
    </div>
  )
}

export default App