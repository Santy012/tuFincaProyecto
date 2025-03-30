const ListaTotalEtiquetas = ({ etiquetasDisponibles, agregarEtiqueta, onAgregarNueva }) => {
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

      <button
        onClick={onAgregarNueva}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Crear Nueva
      </button>
    </div>
  );
};

export default ListaTotalEtiquetas;