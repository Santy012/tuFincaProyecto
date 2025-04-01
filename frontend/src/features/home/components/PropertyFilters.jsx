import { useState, useEffect } from "react";
import { useGlobalContext } from "../../../context/GlobalContext";
import NameFilter from "../subcomponents/Filters/NameFilter";
import LocationFilter from "../subcomponents/Filters/LocationFilter";
import FilterButtons from "../subcomponents/Filters/FilterButtons";
import TagsFilterSection from "../subcomponents/Filters/TagFilterSection";

const PropertyFilters = ({ onFilter }) => {
  const { etiquetas, propiedades } = useGlobalContext();
  const [filters, setFilters] = useState({
    nombre: "",
    etiquetas: [], // Cambiamos a array para múltiples selecciones
    ubicacion: ""
  });
  const [ubicaciones, setUbicaciones] = useState([]);

  useEffect(() => {
    if (propiedades && propiedades.length > 0) {
      const uniqueLocations = [...new Set(propiedades.map(p => p.ubicacion))];
      setUbicaciones(uniqueLocations);
    }
  }, [propiedades]);

  const handleInputChange = (name, value) => {
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleTagClick = (etiquetaId) => {
    setFilters(prev => {
      const idString = etiquetaId.toString();
      const newEtiquetas = prev.etiquetas.includes(idString)
        ? prev.etiquetas.filter(id => id !== idString) // Remover si ya está
        : [...prev.etiquetas, idString]; // Agregar si no está
      
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
      ubicacion: ""
    };
    setFilters(resetValues);
    onFilter(resetValues);
  };

  return (
    <section className="bg-white py-6 px-4 sm:px-6 lg:px-8 border-b border-gray-200">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Filtrar propiedades</h2>
        
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <NameFilter 
            value={filters.nombre} 
            onChange={(value) => handleInputChange("nombre", value)} 
          />
          
          <LocationFilter 
            value={filters.ubicacion} 
            ubicaciones={ubicaciones}
            onChange={(value) => handleInputChange("ubicacion", value)} 
          />
          
          <FilterButtons 
            onReset={resetFilters}
          />
        </form>

        <TagsFilterSection 
          etiquetas={etiquetas} 
          selectedTags={filters.etiquetas} // Cambiamos prop a plural
          onTagClick={handleTagClick}
        />
      </div>
    </section>
  );
};

export default PropertyFilters;