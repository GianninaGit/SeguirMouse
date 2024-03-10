import { useState, useEffect } from "react";

function App() {
  const [enabled, setEnabled] = useState(false);
  //Creo un estado, y lo inicializo con la posición x y, que le pasaré al return transform
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    console.log("efecto: ", { enabled });

    //event es un parámetro de handleMove, y handleMove es una función callback, que se pasa como argumento al método addEventListener
    const handleMove = (event) => {
      //event representa el objeto del evento que se desencadenó al mover el mouse, y tiene info de las coordenadas X-Y
      const { clientX, clientY } = event;
      console.log("handleMove", { clientX, clientY });
      //establezco que x e y tomen los valores de clientXY, que tienen las coordenadas del movimiento
      setPosition({ x: clientX, y: clientY });
    };

    //sólo me suscribo al evento, si enabled es true:
    if (enabled) {
      //pointermove es el nombre del evento, el cual se activa cuanodo el mouse se mueve dentro del área del documento (window, la ventana)
      //handleMove se ejecutará cada vez que ocurra este evento
      window.addEventListener("pointermove", handleMove);
    }
  }, [enabled]);

  return (
    <main>
      <div
        style={{
          position: "absolute",
          backgroundColor: "#ff3368",
          borderRadius: "50%",
          opacity: 0.8,
          pointerEvents: "none",
          left: -20,
          top: -20,
          width: 40,
          height: 40,
          transform: `translate(${position.x}px, ${position.y}px)`,
        }}
      />

      <button onClick={() => setEnabled(!enabled)}>
        {enabled ? "Desactivar" : "Activar"} seguimiento
      </button>
    </main>
  );
}

export default App;
