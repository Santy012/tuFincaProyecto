import { useState, useEffect } from "react";

const EtiquetasEstadoForm = ({ propiedadData, handleChange }) => {
  const etiquetasDisponibles = ["En Venta", "En Arriendo", "Cerca del centro", "Piscina", "Jardín"];
  
  // Estados locales para manejar el estado y las etiquetas seleccionadas
  const [estado, setEstado] = useState(propiedadData.estado || "");
  const [etiquetasSeleccionadas, setEtiquetasSeleccionadas] = useState(propiedadData.etiquetas || []);

  // Sincronizar cambios en propiedadData
  useEffect(() => {
    handleChange("estado", estado);
  }, [estado]);

  useEffect(() => {
    handleChange("etiquetas", etiquetasSeleccionadas);
  }, [etiquetasSeleccionadas]);

  // Manejar cambio de estado
  const handleEstadoChange = (e) => {
    setEstado(e.target.value);
  };

  // Manejar selección/deselección de etiquetas
  const toggleEtiqueta = (etiqueta) => {
    setEtiquetasSeleccionadas((prev) =>
      prev.includes(etiqueta)
        ? prev.filter((e) => e !== etiqueta) // Quitar si ya está seleccionada
        : [...prev, etiqueta] // Agregar si no está seleccionada
    );
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold">Estado y Etiquetas</h2>
      <p className="text-gray-600 mt-2">Selecciona el estado y etiquetas de la propiedad.</p>

      {/* Estado de la Propiedad */}
      <label className="block mt-4 text-gray-700">Estado</label>
      <select
        className="w-full border border-gray-300 px-4 py-2 rounded-md mt-1"
        value={estado}
        onChange={handleEstadoChange}
        required
      >
        <option value="" disabled>Selecciona el estado</option>
        <option value="vendido">Vendido</option>
        <option value="disponible">Disponible</option>
      </select>

      {/* Etiquetas */}
      <label className="block mt-4 text-gray-700">Etiquetas</label>
      <div className="mt-2">
        {etiquetasDisponibles.map((etiqueta) => (
          <div key={etiqueta} className="flex items-center mb-2">
            <input
              type="checkbox"
              id={etiqueta}
              className="mr-2"
              checked={etiquetasSeleccionadas.includes(etiqueta)}
              onChange={() => toggleEtiqueta(etiqueta)}
            />
            <label htmlFor={etiqueta} className="text-gray-700">{etiqueta}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EtiquetasEstadoForm;
