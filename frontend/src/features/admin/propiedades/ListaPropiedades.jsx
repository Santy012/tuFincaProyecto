import { useState } from "react";
import { useGlobalContext } from "../../../context/GlobalContext";
import PropiedadCard from "./components/PropiedadCard";
import PopUpDetalles from "./components/PopUpDetalles";
import FiltroEtiquetas from "./components/FiltroEtiquetas";

const ListaPropiedades = () => {
  // Aseguramos que 'etiquetas' siempre tenga un valor predeterminado (un array vacío)
  const { propiedades, etiquetas = [] } = useGlobalContext(); 
  const [propiedadSeleccionada, setPropiedadSeleccionada] = useState(null);
  const [etiquetasSeleccionadas, setEtiquetasSeleccionadas] = useState([]);

  // Función para convertir los IDs de etiquetas en sus nombres
  const obtenerNombresEtiquetas = (ids) => {
    return ids.map((id) => etiquetas.find((etiqueta) => etiqueta.id === id)?.nombre).filter(Boolean);
  };

  // Filtrar propiedades según etiquetas seleccionadas
  const propiedadesFiltradas = etiquetasSeleccionadas.length
    ? propiedades.filter((propiedad) =>
        etiquetasSeleccionadas.every((id) => propiedad.etiquetas.includes(id))
      )
    : propiedades;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Lista de Propiedades</h1>

      {/* Filtro de etiquetas */}
      <FiltroEtiquetas
        etiquetas={etiquetas}
        etiquetasSeleccionadas={etiquetasSeleccionadas}
        setEtiquetasSeleccionadas={setEtiquetasSeleccionadas}
      />

      {propiedadesFiltradas.length === 0 ? (
        <p className="text-gray-500">No hay propiedades disponibles con esas etiquetas.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {propiedadesFiltradas.map((propiedad) => (
            <PropiedadCard
              key={propiedad.id}
              propiedad={{ ...propiedad, etiquetas: obtenerNombresEtiquetas(propiedad.etiquetas) }}
              onClick={() => setPropiedadSeleccionada(propiedad)}
            />
          ))}
        </div>
      )}

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
