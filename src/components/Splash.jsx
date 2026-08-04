import { useEffect, useState } from 'react'

function Splash({ onTerminar }) {
  const [saliendo, setSaliendo] = useState(false)

  useEffect(() => {
    const inicioSalida = setTimeout(() => setSaliendo(true), 1400)
    const fin = setTimeout(onTerminar, 1800)

    return () => {
      clearTimeout(inicioSalida)
      clearTimeout(fin)
    }
  }, [onTerminar])

  return (
    <div
      className={`fixed inset-0 z-[100] bg-turqui flex items-center justify-center transition-opacity duration-500 ${
        saliendo ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <img
        src={import.meta.env.BASE_URL + 'images/logo.png'}
        alt="Aura Imperial"
        className="w-48 md:w-56 object-contain animate-splash-entrada"
      />
    </div>
  )
}

export default Splash