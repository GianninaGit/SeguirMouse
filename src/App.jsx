import { useState } from "react";
import { useEffect } from "react";

function App() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    console.log("efecto: ", { enabled });
  }, [enabled]);
  return (
    <>
      <button onClick={() => setEnabled(!enabled)}>
        {enabled ? "Desactivar" : "Activar"} seguimiento
      </button>
    </>
  );
}

export default App;
