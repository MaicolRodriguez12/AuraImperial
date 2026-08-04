function Header() {
  return (
    <header className="bg-turqui text-blanco py-10 px-6 text-center">
      <img
        src={import.meta.env.BASE_URL + "images/logo.png"}
        alt="Aura Imperial"
        className="w-28 md:w-36 mx-auto mb-3 object-contain"
      />
      <p className="font-body text-dorado-claro tracking-[0.2em] text-xs uppercase">
        Oro laminado · Piezas únicas
      </p>
    </header>
  )
}

export default Header