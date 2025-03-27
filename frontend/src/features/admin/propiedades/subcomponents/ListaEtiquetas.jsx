import { useState } from "react";
import { X, Plus } from "lucide-react";

const ListaEtiquetas = ({ etiquetas, setEtiquetas, editando }) => {
  const [nuevaEtiqueta, setNuevaEtiqueta] = useState("");
  const [agregando, setAgregando] = useState(false);

  const handleEtiquetaAdd = () => {
    if (nuevaEtiqueta.trim()) {
      setEtiquetas([...etiquetas, nuevaEtiqueta.trim()]);
    }
    setNuevaEtiqueta("");
    setAgregando(false);
  };

  const handleEtiquetaRemove = (index) => {
    setEtiquetas(etiquetas.filter((_, i) => i !== index));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleEtiquetaAdd();
    } else if (e.key === "Escape") {
      // Si presiona Escape, cancela la acción
      setNuevaEtiqueta("");
      setAgregando(false);
    }
  };

  return (
    <div className="mt-4">
      <p className="text-sm font-semibold mb-2">Etiquetas:</p>
      <div className="flex flex-wrap gap-2">
        {etiquetas.map((etiqueta, index) => (
          <div key={index} className="flex items-center gap-2 border px-2 py-1 rounded bg-gray-800 text-white">
            <span className="text-sm">{etiqueta}</span>
            {editando && (
              <button onClick={() => handleEtiquetaRemove(index)} className="text-red-500 text-sm cursor-pointer">
                <X size={12} />
              </button>
            )}
          </div>
        ))}

        {/* Input inline para agregar etiquetas */}
        {editando && agregando ? (
          <input
            type="text"
            value={nuevaEtiqueta}
            onChange={(e) => setNuevaEtiqueta(e.target.value)}
            onBlur={handleEtiquetaAdd} // Guarda cuando pierde el foco
            onKeyDown={handleKeyDown} // Maneja Enter y Escape
            className="border px-2 py-1 rounded bg-gray-800 text-white text-sm focus:outline-none w-[100px]"
            autoFocus
          />
        ) : (
          editando && (
            <button
              onClick={() => setAgregando(true)}
              className="flex items-center gap-1 text-blue-500 text-sm cursor-pointer"
            >
              <Plus size={14} /> Agregar
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default ListaEtiquetas;
