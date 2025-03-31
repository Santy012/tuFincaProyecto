import PropertyCard from "../subcomponents/PropertyCard";
import { Link } from "react-router-dom";

const PropertyGrid = ({ propiedades = [] }) => {
  if (propiedades.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <p className="text-gray-500">No se encontraron propiedades con los filtros aplicados</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {propiedades.map((propiedad) => (
            <PropertyCard propiedad={propiedad} />
        ))}
      </div>
    </div>
  );
};

export default PropertyGrid;