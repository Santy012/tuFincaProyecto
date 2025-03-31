import PropertyCard from "../subcomponents/PropertyCard";
import { useGlobalContext } from "../../../context/GlobalContext";
import { Link } from "react-router-dom";

const PropertyGrid = () => {
  const { propiedades } = useGlobalContext();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {propiedades.map((propiedad) => (
          <PropertyCard key={propiedad.id} propiedad={propiedad} />
        ))}
      </div>
    </div>
  );
};
export default PropertyGrid;