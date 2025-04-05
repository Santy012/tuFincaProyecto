import { useParams, useNavigate, Link } from "react-router-dom";
import { useGlobalContext } from "../../context/GlobalContext";
import ImageCarrousel from "../home/subcomponents/ImageCarrousel";
import Footer from "../home/components/Footer";
import Header from "../home/components/Header";
import DetailGrid from "./components/DetailGrid";

const PropertyPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { propiedades, etiquetas } = useGlobalContext();
  const propertyId = Number(id);
  const propiedad = propiedades.find((p) => p.id === propertyId);

  if (!propiedad) {
    return (
      <div className="container mx-auto px-4 md:px-8 py-6 max-w-6xl">
        <h1 className="text-2xl font-bold">Propiedad no encontrada</h1>
        <p className="mt-2">La propiedad solicitada no existe o ha sido removida.</p>
        <button 
          onClick={() => navigate(-1)} 
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Volver al listado
        </button>
      </div>
    );
  }

  return (
    <>
      <Header/>
      <div className="container mx-auto px-4 md:px-8 py-8">
        {/* Botón de volver */}
        <Link to="/" className="flex items-center">
        <button
          className="mb-6 flex items-center text-blue-600 hover:text-blue-800 transition-colors"
        >
          <svg
            className="w-5 h-5 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Volver al listado
        </button>
        </Link>

        {/* Encabezado con título y ubicación */}
        <div className="mb-6 border-b pb-4">
          <div className="flex flex-col md:flex-row justify-between items-start gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                {propiedad.titulo}
              </h1>
              <div className="flex items-center mt-1">
                <svg className="w-4 h-4 text-gray-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p className="text-base md:text-lg text-gray-600">{propiedad.ubicacion}</p>
              </div>
            </div>
            <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded-full text-xs md:text-sm font-medium">
              {propiedad.estado}
            </span>
          </div>
        </div>

        {/* Galería de imágenes */}
        <div className="mb-8 rounded-xl overflow-hidden shadow-lg max-w-4xl mx-auto">
          <ImageCarrousel
            propiedad={propiedad}
            fullSize
            className="w-full aspect-[16/9]"
          />
        </div>

        {/* Código de propiedad */}
        <div className="mb-6 bg-blue-50 p-3 rounded-lg inline-block">
          <span className="font-medium">Código de propiedad:</span>{" "}
          <span className="font-semibold text-blue-700">{propiedad.codigo}</span>
        </div>

        {/* Grid principal */}
        <DetailGrid propiedad={propiedad} etiquetas={etiquetas}/>
      </div>
      <Footer />
    </>
  );
};

export default PropertyPage;