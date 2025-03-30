// FiltroEtiquetas.js
import { useState } from "react";

const FiltroEtiquetas = ({ etiquetas, etiquetasSeleccionadas, setEtiquetasSeleccionadas }) => {
  // Función para alternar la selección de etiquetas
  const toggleEtiqueta = (id) => {
    setEtiquetasSeleccionadas((prevSeleccionadas) =>
      prevSeleccionadas.includes(id)
        ? prevSeleccionadas.filter((etiquetaId) => etiquetaId !== id)
        : [...prevSeleccionadas, id]
    );
  };

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {etiquetas.map((etiqueta) => (
        <button
          key={etiqueta.id}
          className={`px-4 py-2 rounded-full text-sm font-medium shadow-md transition-colors duration-200 ${
            etiquetasSeleccionadas.includes(etiqueta.id) ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => toggleEtiqueta(etiqueta.id)}
        >
          {etiqueta.nombre}
        </button>
      ))}
    </div>
  );
};

export default FiltroEtiquetas;
