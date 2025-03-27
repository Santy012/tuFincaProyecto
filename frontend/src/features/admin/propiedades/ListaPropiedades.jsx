import { useState } from "react";
import { useGlobalContext } from "../../../context/GlobalContext";
import PropiedadCard from "./components/PropiedadCard";
import PopUpDetalles from "./components/PopUpDetalles";

const ListaPropiedades = () => {
  const { propiedades, etiquetas } = useGlobalContext(); // Obtiene propiedades y etiquetas del contexto
  const [propiedadSeleccionada, setPropiedadSeleccionada] = useState(null);

  // Función para convertir los IDs de etiquetas en sus nombres
  const obtenerNombresEtiquetas = (ids) => {
    return ids.map((id) => etiquetas.find((etiqueta) => etiqueta.id === id)?.nombre).filter(Boolean);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Lista de Propiedades</h1>

      {propiedades.length === 0 ? (
        <p className="text-gray-500">No hay propiedades disponibles.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {propiedades.map((propiedad) => (
            <PropiedadCard
              key={propiedad.id}
              propiedad={{ ...propiedad, etiquetas: obtenerNombresEtiquetas(propiedad.etiquetas) }}
              onClick={() => setPropiedadSeleccionada(propiedad)}
            />
          ))}
        </div>
      )}

      {/* Popup de Detalles */}
      {propiedadSeleccionada && (
        <PopUpDetalles
          propiedadSeleccionada={propiedadSeleccionada}
          setPropiedadSeleccionada={setPropiedadSeleccionada}
          obtenerNombresEtiquetas={obtenerNombresEtiquetas}
        />
      )}
    </div>
  );
};

export default ListaPropiedades;
