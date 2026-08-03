function Header() {
  return (
    <header className="bg-turqui text-blanco py-16 px-6 text-center">
      <img
        src={import.meta.env.BASE_URL + "images/logo.png"}
        alt="Aura Imperial"
        className="w-40 md:w-52 mx-auto mb-4 object-contain"
      />
      <p className="font-body text-dorado-claro tracking-[0.3em] text-xs uppercase">
        Oro laminado · Piezas únicas
      </p>
    </header>
  )
}

export default Header