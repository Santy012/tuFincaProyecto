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
    loadPaginatedData
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
    loadPaginatedData(newPage, pagination.pageSize, {
      ...busquedas,
      etiquetas: etiquetasSeleccionadas
    });
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

  // Aplicar filtros localmente para vista previa
  const propiedadesFiltradas = propiedades.filter((propiedad) => {
    const cumpleEtiquetas =
      etiquetasSeleccionadas.length === 0 ||
      etiquetasSeleccionadas.every((id) => propiedad.etiquetas.includes(id));
      console.log(etiquetasSeleccionadas)

    const cumpleCodigo =
      !busquedas.codigo || propiedad.codigo.toLowerCase() === busquedas.codigo.toLowerCase();

    const cumpleEstado = !busquedas.estado || propiedad.estado === busquedas.estado;

    const cumpleNombre =
      !busquedas.nombre ||
      propiedad.titulo.toLowerCase().includes(busquedas.nombre.toLowerCase());

    return cumpleEtiquetas && cumpleCodigo && cumpleEstado && cumpleNombre;
  });
  

  return (
    <div className="max-w-6xl mx-auto p-6">
      <FiltroEtiquetas
        etiquetasPropiedad={etiquetasPropiedad}
        etiquetasCategoria={etiquetasCategoria}
        etiquetasSeleccionadas={etiquetasSeleccionadas}
        setEtiquetasSeleccionadas={setEtiquetasSeleccionadas}
        busquedas={busquedas}
        setBusquedas={setBusquedas}
        onApplyFilters={handlePageChange}
      />

      {propiedadesFiltradas.length === 0 ? (
        <p className="text-gray-500">No hay propiedades disponibles.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {propiedadesFiltradas.map((propiedad) => (
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