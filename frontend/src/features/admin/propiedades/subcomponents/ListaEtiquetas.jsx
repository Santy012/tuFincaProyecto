import { useState } from "react";
import { X, Plus } from "lucide-react";
import ListaTotalEtiquetas from "./ListaTotalEtiquetas";

const ListaEtiquetas = ({ etiquetas, setEtiquetas, editando, mostrarAgregar = true }) => {
  const [mostrarPopup, setMostrarPopup] = useState(false);

  const handleEtiquetaRemove = (etiqueta) => {
    setEtiquetas((prev) => prev.filter((e) => e !== etiqueta));
  };

  const agregarEtiqueta = (etiqueta) => {
    if (!etiquetas.includes(etiqueta)) {
      setEtiquetas([...etiquetas, etiqueta]);
    }
    setMostrarPopup(false);
  };

  return (
    <div className="mt-4">
      <p className="text-sm font-semibold mb-2">Etiquetas Seleccionadas:</p>
      <div className="flex flex-wrap gap-2">
        {etiquetas.map((etiqueta) => (
          <div key={etiqueta} className="flex items-center gap-2 border px-2 py-1 rounded bg-gray-800 text-white">
            <span className="text-sm">{etiqueta}</span>
            {editando && (
              <button onClick={() => handleEtiquetaRemove(etiqueta)} className="text-red-500 text-sm cursor-pointer">
                <X size={12} />
              </button>
            )}
          </div>
        ))}

        {/* Botón para abrir popup de selección de etiquetas */}
        {editando && mostrarAgregar && (
          <button
            onClick={() => setMostrarPopup(true)}
            className="flex items-center gap-1 text-blue-500 text-sm cursor-pointer"
          >
            <Plus size={14} /> Agregar
          </button>
        )}
      </div>

      {/* Popup con ListaTotalEtiquetas */}
      {mostrarPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-lg">
            <h2 className="text-lg font-bold mb-2">Seleccionar Etiquetas</h2>
            <ListaTotalEtiquetas 
              etiquetasDisponibles={["3 habitaciones", "2 baños", "Cerca del mar", "En Venta", "En Arriendo"]} 
              agregarEtiqueta={agregarEtiqueta} 
            />
            <button 
              onClick={() => setMostrarPopup(false)} 
              className="mt-2 bg-red-500 text-white px-4 py-2 rounded"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListaEtiquetas;
