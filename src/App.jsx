import { useState, useEffect } from 'react'

const SeguirPuntero = () => {
  const [enabled, setEnabled] = useState(false)
  // Creo un estado, y lo inicializo con la posición x y, que le pasaré al return transform
  const [position, setPosition] = useState({ x: 0, y: 0 })

  // Efecto para globo en cursor
  useEffect(() => {
    console.log('efecto: ', { enabled })

    // event es un parámetro de handleMove, y handleMove es una función callback, que se pasa como argumento al método addEventListener
    const handleMove = (event) => {
      // event representa el objeto del evento que se desencadenó al mover el mouse, y tiene info de las coordenadas X-Y
      const { clientX, clientY } = event
      console.log('handleMove', { clientX, clientY })
      // establezco que x e y tomen los valores de clientXY, que tienen las coordenadas del movimiento
      setPosition({ x: clientX, y: clientY })
    }

    // sólo me suscribo al evento, si enabled es true:
    if (enabled) {
      // pointermove es el nombre del evento, el cual se activa cuanodo el mouse se mueve dentro del área del documento (window, la ventana)
      // handleMove se ejecutará cada vez que ocurra este evento
      window.addEventListener('pointermove', handleMove)
    }

    // En consola, usar getEventListener(window) SOLO EN CHROME para ver el rendimiento del
    // debo limpiar esa suscripción al evento, sino segurá estando activado (aún desactivando el botón), se ejecuta siempre que se desmonte el componente (App deja de renderizarse) y cada vez que cambie la dependencia (!enabled)
    return () => {
      window.removeEventListener('pointermove', handleMove)
    }
  }, [enabled])

  // Efecto para ocultar cursor cuando hay globo
  useEffect(() => {
    document.body.classList.toggle('no-cursor', enabled)
    return () => {
      document.body.classList.remove('no-cursor')
    }
  })
  return (
    <>
      <div
        style={{
          position: 'absolute',
          backgroundColor: '#ff3368',
          borderRadius: '50%',
          opacity: 0.8,
          pointerEvents: 'none',
          left: -20,
          top: -20,
          width: 40,
          height: 40,
          transform: `translate(${position.x}px, ${position.y}px)`
        }}
      />

      <button onClick={() => setEnabled(!enabled)}>
        {enabled ? 'Desactivar' : 'Activar'} seguimiento
      </button>
    </>
  )
}
function App () {
  return (
    <main>
      <SeguirPuntero />
    </main>
  )
}

export default App
