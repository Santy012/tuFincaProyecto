import { useState, useEffect, useCallback } from "react";
import NameFilter from "../subcomponents/Filters/NameFilter";
import CodeFilter from "../subcomponents/Filters/CodeFilter";
import FilterButtons from "../subcomponents/Filters/FilterButtons";
import TagsFilterSection from "../subcomponents/Filters/TagFilterSection";
import LocationFilter from "../subcomponents/Filters/LocationFilter";
import PropertyTypeFilter from "../subcomponents/Filters/PropertyTypeFilter";
import { debounce, escape } from 'lodash';
const PropertyFilters = ({ onFilter, etiquetas, propiedades }) => {
  const [filters, setFilters] = useState({
    nombre: "",
    etiquetas: [], // Ahora almacena nombres de etiquetas
    codigo: "",
    ubicacion: "",
    estado: "disponible"
  });
  const [etiquetasPropiedad, setEtiquetasPropiedad] = useState([]);
  const [etiquetasCategoria, setEtiquetasCategoria] = useState([]);
  const [isFiltering, setIsFiltering] = useState(false);

   // Actualizar el efecto para usar nombres
   useEffect(() => {
    if (propiedades && etiquetas) {
      const propiedadesDisponibles = propiedades.filter(p => p.estado === "disponible");

      // Función para contar etiquetas por tipo
      const contarEtiquetas = (tipo) => 
        etiquetas
          .filter(e => e.tipoEtiqueta === tipo)
          .map(etiqueta => ({
            ...etiqueta,
            count: propiedadesDisponibles.filter(p => 
              p.etiquetasNombres?.includes(etiqueta.nombre)
            ).length
          }));

      setEtiquetasPropiedad(contarEtiquetas("propiedad"));
      setEtiquetasCategoria(contarEtiquetas("categoria"));
    }
  }, [propiedades, etiquetas]);


  const debouncedFilter = useCallback(debounce(async (filters) => {
    try {
      setIsFiltering(true);
      await onFilter({
        ...filters,
        etiquetas: filters.etiquetas,
        estado: "disponible"
      });
    } finally {
      setIsFiltering(false);
    }
  }, 500), [onFilter]);

  const handleInputChange = (name, value) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleTipoPropiedadChange = (nuevasEtiquetas) => {
    setFilters(prev => {
      // Filtrar etiquetas de tipo propiedad existentes
      const otrasEtiquetas = prev.etiquetas.filter(
        nombre => !etiquetasPropiedad.some(e => e.nombre === nombre)
      );
      
      return {
        ...prev,
        etiquetas: [...otrasEtiquetas, ...nuevasEtiquetas]
      };
    });
  };

  const handleTagClick = (nombreEtiqueta) => {
    setFilters(prev => ({
      ...prev,
      etiquetas: prev.etiquetas.includes(nombreEtiqueta)
        ? prev.etiquetas.filter(n => n !== nombreEtiqueta)
        : [...prev.etiquetas, nombreEtiqueta]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFiltering) return;
    debouncedFilter(filters);
  };

  const resetFilters = () => {
    const resetValues = {
      nombre: "",
      etiquetas: [],
      codigo: "",
      ubicacion: "",
      tipoPropiedad: "",
      estado: "disponible"
    };
    setFilters(resetValues);
    debouncedFilter(resetValues);
  };

  return (
    <section className="bg-white py-6 px-4 sm:px-6 lg:px-8 border-b border-gray-200">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Filtrar propiedades
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <LocationFilter
            value={filters.ubicacion}
            onChange={(value) => handleInputChange("ubicacion", value)}
            propiedades={propiedades}
          />

          {/* Selector de Tipo de Propiedad */}
          <PropertyTypeFilter
            value={filters.etiquetas.filter(nombre => 
              etiquetasPropiedad.some(e => e.nombre === nombre)
            )}
            onChange={handleTipoPropiedadChange}
            options={etiquetasPropiedad}
          />

          <NameFilter
            value={filters.nombre}
            onChange={(value) => handleInputChange("nombre", value)}
          />

          <CodeFilter
            value={filters.codigo}
            onChange={(value) => handleInputChange("codigo", value)}
          />
          </form>
          {/* Sección para filtrar por categorías (etiquetas normales) */}
          <TagsFilterSection
            title="Características"
            etiquetas={etiquetasCategoria}
            selectedTags={filters.etiquetas}
            onTagClick={handleTagClick}
          />
          <FilterButtons
            isLoading={isFiltering}
            onSubmit={handleSubmit}   // Cambiar a esto
            onReset={resetFilters}
          />
      </div>
    </section>
  );
};

export default PropertyFilters;
