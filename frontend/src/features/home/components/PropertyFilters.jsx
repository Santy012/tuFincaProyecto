import { useState, useEffect } from "react";
import { useGlobalContext } from "../../../context/GlobalContext";
import NameFilter from "../subcomponents/Filters/NameFilter";
import CodeFilter from "../subcomponents/Filters/CodeFilter"; // Nuevo import
import FilterButtons from "../subcomponents/Filters/FilterButtons";
import TagsFilterSection from "../subcomponents/Filters/TagFilterSection";
import LocationFilter from "../subcomponents/Filters/LocationFilter";

const PropertyFilters = ({ onFilter }) => {
  const { etiquetas, propiedades } = useGlobalContext();
  const [filters, setFilters] = useState({
    nombre: "",
    etiquetas: [],
    codigo: "",
    ubicacion: "",
  });
  const [etiquetasConConteo, setEtiquetasConConteo] = useState([]);

  useEffect(() => {
    if (propiedades && propiedades.length > 0) {
      // Eliminamos el cálculo de ubicaciones ya que no lo necesitamos
      const conteoEtiquetas = etiquetas.map((etiqueta) => {
        const count = propiedades.filter((propiedad) =>
          propiedad.etiquetas.includes(etiqueta.id)
        ).length;
        return { ...etiqueta, count };
      });
      setEtiquetasConConteo(conteoEtiquetas);
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
    onFilter(filters);
  };

  const resetFilters = () => {
    const resetValues = {
      nombre: "",
      etiquetas: [],
      codigo: "",
      ubicacion: "",
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
          <NameFilter
            value={filters.nombre}
            onChange={(value) => handleInputChange("nombre", value)}
          />

          <CodeFilter // Reemplazamos LocationFilter por CodeFilter
            value={filters.codigo}
            onChange={(value) => handleInputChange("codigo", value)}
          />

          <LocationFilter
            value={filters.ubicacion}
            onChange={(value) => handleInputChange("ubicacion", value)}
            propiedades={propiedades}
          />

          <FilterButtons onReset={resetFilters} />
        </form>

        <TagsFilterSection
          etiquetas={etiquetasConConteo}
          selectedTags={filters.etiquetas}
          onTagClick={handleTagClick}
        />
      </div>
    </section>
  );
};

export default PropertyFilters;
