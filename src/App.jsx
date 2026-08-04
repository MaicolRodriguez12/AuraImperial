import { useState, useMemo } from 'react'
import Header from './components/Header'
import ProductCard from './components/ProductCard'
import ProductModal from './components/ProductModal'
import CartButton from './components/CartButton'
import CartPanel from './components/CartPanel'
import CategoryFilter from './components/CategoryFilter'
import { products } from './data/products'
import WhatsAppHelpButton from './components/WhatsAppHelpButton'

function App() {
  const [productoSeleccionado, setProductoSeleccionado] = useState(null)
  const [carritoAbierto, setCarritoAbierto] = useState(false)
  const [categoriaActiva, setCategoriaActiva] = useState('todos')

  const categorias = useMemo(
    () => [...new Set(products.map((p) => p.categoria))],
    []
  )

  const productosFiltrados = useMemo(() => {
    if (categoriaActiva === 'todos') return products
    return products.filter((p) => p.categoria === categoriaActiva)
  }, [categoriaActiva])

  return (
    <div className="min-h-screen bg-blanco">
      <Header />

      <CategoryFilter
        categorias={categorias}
        categoriaActiva={categoriaActiva}
        onSeleccionar={setCategoriaActiva}
      />

      <main className="px-4 py-4">
        <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
          {productosFiltrados.map((producto) => (
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
      <WhatsAppHelpButton />
      <CartButton onClick={() => setCarritoAbierto(true)} />

      {carritoAbierto && (
        <CartPanel onClose={() => setCarritoAbierto(false)} />
      )}
    </div>
  )
}

export default App