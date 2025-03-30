
//AL LLAMAR AL POP UP DE ETIQUETA, NO ESTA GUARDANDO AÚN LA ETIQUETA

import { useState } from "react";
import PopUpEtiqueta from "./PopUpEtiqueta";

const ListaTotalEtiquetas = ({ etiquetasDisponibles, agregarEtiqueta }) => {
  const [mostrarPopup, setMostrarPopup] = useState(false);
  const [etiquetas, setEtiquetas] = useState(etiquetasDisponibles); // Manejo local de etiquetas

  const guardarEtiqueta = (nombre) => {
    const nuevaEtiqueta = {
      id: etiquetas.length + 1, // Genera un ID único (temporal)
      nombre,
    };
    setEtiquetas([...etiquetas, nuevaEtiqueta]); // Agregar al estado local
  };

  return (
    <div className="mt-4">
      <p className="text-gray-600">Click sobre la etiqueta a agregar:</p>
      <div className="flex flex-wrap gap-2 mt-2">
        {etiquetasDisponibles.map((etiqueta) => (
          <button
            key={etiqueta}
            className="bg-gray-800 text-white px-3 py-1 rounded"
            onClick={() => agregarEtiqueta(etiqueta)}
          >
            {etiqueta}
          </button>
        ))}
      </div>

      {/* Botón para crear nueva etiqueta */}
      <button
        onClick={() => setMostrarPopup(true)}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Crear Nueva
      </button>

      {/* Popup para agregar nueva etiqueta */}
      {mostrarPopup && <PopUpEtiqueta cerrar={() => setMostrarPopup(false)} guardarEtiqueta={guardarEtiqueta} />}
    </div>
  );
};

export default ListaTotalEtiquetas;
