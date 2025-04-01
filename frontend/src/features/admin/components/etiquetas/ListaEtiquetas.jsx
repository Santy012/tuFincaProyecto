import { X } from "lucide-react";

const ListaEtiquetas = ({ etiquetas, onRemove, editando, mostrarAgregar = true }) => {
  return (
    <div className="mt-4">
      <div className="flex flex-wrap gap-2">
        {etiquetas.map((etiqueta) => (
          <div key={etiqueta} className="flex items-center gap-2 border px-2 py-1 rounded bg-gray-800 text-white">
            <span className="text-sm">{etiqueta}</span>
            {editando && (
              <button 
                onClick={() => onRemove(etiqueta)} 
                className="text-red-500 text-sm cursor-pointer"
              >
                <X size={12} />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListaEtiquetas;