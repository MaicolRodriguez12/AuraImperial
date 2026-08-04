import { useEffect } from 'react'

function Toast({ mensaje, visible, onOcultar }) {
  useEffect(() => {
    if (visible) {
      const temporizador = setTimeout(onOcultar, 2000)
      return () => clearTimeout(temporizador)
    }
  }, [visible, onOcultar])

  if (!visible) return null

  return (
    <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-turqui text-blanco font-body px-5 py-3 rounded-full shadow-lg flex items-center gap-2 animate-toast">
      <span className="text-dorado">✓</span>
      {mensaje}
    </div>
  )
}

export default Toast