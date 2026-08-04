function CategoryFilter({ categorias, categoriaActiva, onSeleccionar }) {
  return (
    <div className="flex gap-2 overflow-x-auto px-4 pb-2 pt-4 max-w-md mx-auto no-scrollbar">
      <button
        onClick={() => onSeleccionar('todos')}
        className={`shrink-0 px-4 py-2 rounded-full font-body text-sm font-medium ${
          categoriaActiva === 'todos'
            ? 'bg-turqui text-blanco'
            : 'bg-turqui/10 text-turqui'
        }`}
      >
        Todos
      </button>
      {categorias.map((cat) => (
        <button
          key={cat}
          onClick={() => onSeleccionar(cat)}
          className={`shrink-0 px-4 py-2 rounded-full font-body text-sm font-medium capitalize ${
            categoriaActiva === cat
              ? 'bg-turqui text-blanco'
              : 'bg-turqui/10 text-turqui'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  )
}

export default CategoryFilter