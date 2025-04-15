import { useGlobalContext } from "../../../context/GlobalContext";
import ImageCarrousel from "./ImageCarrousel";
import { Link } from "react-router-dom";

const PropertyCard = ({ propiedad }) => {
  // Recibir propiedad como prop
  const { etiquetas } = useGlobalContext();

  return (
    <div className="rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      {/* Carrusel de imágenes o marcador de posición */}
      {propiedad && propiedad.imagenes && propiedad.imagenes.length > 0 ? (
        <ImageCarrousel propiedad={propiedad} />
      ) : (
        <div className="h-48 bg-gray-100 flex items-center justify-center">
          <p className="text-gray-500">Imagen no disponible</p>
        </div>
      )}

      {/* Detalles de la propiedad */}
      <Link to={`/propiedad/${propiedad.id}`}>
        <div className="p-4">
          <div className="flex justify-between items-start">
            <h3 className="font-semibold text-lg truncate">
              {propiedad.titulo || "Sin título"}
            </h3>
          </div>

          <p className="text-gray-500 text-sm mt-1 truncate">
            {propiedad.ubicacion || "Ubicación no especificada"}
          </p>
          <p className="text-gray-500 text-sm">
            {propiedad.areaTotal
              ? `${propiedad.areaTotal} m²`
              : "Área no especificada"}
          </p>

          {propiedad.etiquetas && etiquetas && (
            <div className="mt-2 flex flex-wrap gap-1">
              {propiedad.etiquetas.slice(0, 3).map((etiquetaId) => {
                const etiqueta = etiquetas.find((e) => e.id === etiquetaId);
                return etiqueta ? (
                  <span
                    key={etiquetaId}
                    className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded"
                  >
                    {etiqueta.nombre}
                  </span>
                ) : null;
              })}
            </div>
          )}
        </div>
      </Link>
    </div>
  );
};

export default PropertyCard;
