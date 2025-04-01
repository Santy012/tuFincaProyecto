import { useState } from "react";
import PopUpConfirmar from "../../perfil/subcomponents/PopUpConfirmar";
import { X } from "lucide-react";

const ListaTotalEtiquetas = ({ 
  etiquetasDisponibles, 
  agregarEtiqueta, 
  onAgregarNueva,
  eliminarEtiqueta 
}) => {
  const [etiquetaAEliminar, setEtiquetaAEliminar] = useState(null);
  const [showConfirmacion, setShowConfirmacion] = useState(false);

  const handleEliminarEtiqueta = () => {
    eliminarEtiqueta(etiquetaAEliminar);
    setShowConfirmacion(false);
    setEtiquetaAEliminar(null);
  };

  return (
    <div className="mt-4">
      <p className="text-gray-600">Click sobre la etiqueta a agregar:</p>
      <div className="flex flex-wrap gap-2 mt-2">
        {etiquetasDisponibles.map((etiqueta) => (
          <div 
            key={etiqueta} 
            className="flex items-center gap-1 bg-gray-800 text-white px-3 py-1 rounded"
          >
            <button
              onClick={() => agregarEtiqueta(etiqueta)}
              className="text-left flex-1"
            >
              {etiqueta}
            </button>
            <button
              onClick={() => {
                setEtiquetaAEliminar(etiqueta);
                setShowConfirmacion(true);
              }}
              className="text-red-500 hover:text-red-400 text-sm cursor-pointer transition-colors"
            >
              <X size={12} />
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={onAgregarNueva}
        className="mt-4 bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
      >
        Crear Nueva
      </button>

      {showConfirmacion && (
        <PopUpConfirmar
          mensaje={`¿Estás seguro que deseas eliminar la etiqueta "${etiquetaAEliminar}"?`}
          onConfirm={handleEliminarEtiqueta}
          onCancel={() => {
            setShowConfirmacion(false);
            setEtiquetaAEliminar(null);
          }}
        />
      )}
    </div>
  );
};

export default ListaTotalEtiquetas;