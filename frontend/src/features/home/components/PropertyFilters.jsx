import { useState, useEffect } from "react";
import { useGlobalContext } from "../../../context/GlobalContext";
import NameFilter from "../subcomponents/Filters/NameFilter";
import CodeFilter from "../subcomponents/Filters/CodeFilter";
import FilterButtons from "../subcomponents/Filters/FilterButtons";
import TagsFilterSection from "../subcomponents/Filters/TagFilterSection";
import LocationFilter from "../subcomponents/Filters/LocationFilter";
import PropertyTypeFilter from "../subcomponents/Filters/PropertyTypeFilter";

const PropertyFilters = ({ onFilter }) => {
  const { etiquetas, propiedades } = useGlobalContext();
  const [filters, setFilters] = useState({
    nombre: "",
    etiquetas: [],
    codigo: "",
    ubicacion: "",
    tipoPropiedad: "", // Nuevo campo para el select
  });
  const [etiquetasPropiedad, setEtiquetasPropiedad] = useState([]);
  const [etiquetasCategoria, setEtiquetasCategoria] = useState([]);

  useEffect(() => {
    if (propiedades && propiedades.length > 0 && etiquetas) {
      // Filtrar solo propiedades disponibles
      const propiedadesDisponibles = propiedades.filter(
        propiedad => propiedad.estado === "Disponible"
      );
      
      // Separar etiquetas por tipo y calcular conteo solo en propiedades disponibles
      const propiedadEtiquetas = etiquetas
        .filter(etiqueta => etiqueta.tipoEtiqueta === "propiedad")
        .map(etiqueta => ({
          ...etiqueta,
          count: propiedadesDisponibles.filter(propiedad => 
            propiedad.etiquetas.includes(etiqueta.id)
          ).length
        }));
      
      const categoriaEtiquetas = etiquetas
        .filter(etiqueta => etiqueta.tipoEtiqueta === "categoria")
        .map(etiqueta => ({
          ...etiqueta,
          count: propiedadesDisponibles.filter(propiedad => 
            propiedad.etiquetas.includes(etiqueta.id)
          ).length
        }));
      
      setEtiquetasPropiedad(propiedadEtiquetas);
      setEtiquetasCategoria(categoriaEtiquetas);
    }
  }, [propiedades, etiquetas]);

  const handleInputChange = (name, value) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleTagClick = (etiquetaId) => {
    setFilters((prev) => {
      const idString = etiquetaId.toString();
      const newEtiquetas = prev.etiquetas.includes(idString)
        ? prev.etiquetas.filter((id) => id !== idString)
        : [...prev.etiquetas, idString];
      return { ...prev, etiquetas: newEtiquetas };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Asegurarnos de que las etiquetas de tipo propiedad no se incluyan en el filtro de etiquetas
    const etiquetasFiltradas = filters.etiquetas.filter(
      (etiquetaId) =>
        !etiquetasPropiedad.some(
          (etiqueta) => etiqueta.id.toString() === etiquetaId
        )
    );

    onFilter({
      ...filters,
      etiquetas: etiquetasFiltradas,
    });
  };

  const resetFilters = () => {
    const resetValues = {
      nombre: "",
      etiquetas: [],
      codigo: "",
      ubicacion: "",
      tipoPropiedad: "",
    };
    setFilters(resetValues);
    onFilter(resetValues);
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

          {/* Select para tipo de propiedad */}
          <PropertyTypeFilter
            value={filters.tipoPropiedad}
            onChange={(value) => handleInputChange("tipoPropiedad", value)}
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

          <FilterButtons onReset={resetFilters} />
        </form>

        {/* Sección para filtrar por categorías (etiquetas normales) */}
        <TagsFilterSection
          title="Características"
          etiquetas={etiquetasCategoria}
          selectedTags={filters.etiquetas}
          onTagClick={handleTagClick}
        />
      </div>
    </section>
  );
};

export default PropertyFilters;
