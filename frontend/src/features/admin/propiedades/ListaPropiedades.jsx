import { useState } from "react";
import { useGlobalContext } from "../../../context/GlobalContext";
import PropiedadCard from "./components/PropiedadCard";
import FiltroEtiquetas from "./components/FiltroEtiquetas";
import PopUpDetalles from "./components/PopUpDetalles/PopUpDetalles";
import Pagination from "../../../components/Pagination";

const ListaPropiedades = () => {
  const { 
    propiedades, 
    etiquetas = [],
    pagination,
    loadPaginatedData,
    applyFilters
  } = useGlobalContext() || { propiedades: [], etiquetas: [] };
  
  const [propiedadSeleccionada, setPropiedadSeleccionada] = useState(null);
  const [etiquetasSeleccionadas, setEtiquetasSeleccionadas] = useState([]);
  const [busquedas, setBusquedas] = useState({ 
    nombre: "", 
    codigo: "", 
    estado: "",
    etiquetas: []
  });

  const handlePageChange = (newPage) => {
    console.log("busquedas", busquedas);
    loadPaginatedData(newPage, pagination.pageSize, busquedas);
  };

  // Separar etiquetas por tipo
  const etiquetasPropiedad = etiquetas.filter(e => e.tipoEtiqueta === 'propiedad');
  const etiquetasCategoria = etiquetas.filter(e => e.tipoEtiqueta === 'categoria');

  const obtenerNombresEtiquetas = (ids = []) => {
    if (!Array.isArray(ids) || !Array.isArray(etiquetas)) return [];
    return ids
      .map((id) => etiquetas.find((etiqueta) => etiqueta?.id === id)?.nombre)
      .filter(Boolean);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <FiltroEtiquetas
        etiquetasPropiedad={etiquetasPropiedad}
        etiquetasCategoria={etiquetasCategoria}
        etiquetasSeleccionadas={etiquetasSeleccionadas}
        setEtiquetasSeleccionadas={setEtiquetasSeleccionadas}
        busquedas={busquedas}
        setBusquedas={setBusquedas}
        onApplyFilters={(busquedas) => applyFilters(busquedas)}
      />

      {propiedades.length === 0 ? (
        <p className="text-gray-500">No hay propiedades disponibles.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {propiedades.map((propiedad) => (
              <PropiedadCard
                key={propiedad.id}
                propiedad={{ 
                  ...propiedad, 
                  etiquetas: obtenerNombresEtiquetas(propiedad.etiquetas || []) 
                }}
                onClick={() => setPropiedadSeleccionada(propiedad)}
              />
            ))}
          </div>
          
          <div className="mt-8">
            <Pagination
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </>
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