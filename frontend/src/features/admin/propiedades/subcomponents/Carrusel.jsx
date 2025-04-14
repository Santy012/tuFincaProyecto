import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";

const Carrusel = ({ propiedadSeleccionada, imagenActual, setImagenActual, setMostrarGaleria, editando }) => {
  const [direccion, setDireccion] = useState(1);

  const isVideo = (media) => {
    if (!media) return false;
    
    if (media instanceof File || media instanceof Blob) {
      return media.type.startsWith('video/');
    }
    
    if (typeof media === 'string') {
      if (media.startsWith('data:')) {
        return media.split(';')[0].includes('video');
      }
      return media.match(/\.(mp4|webm|ogg|mov)$/i);
    }
    
    return false;
  };

  const getMediaSource = (media) => {
    const baseUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:8080";

    if (typeof media === "string") {
      // Si es una URL relativa, prepéndele el dominio base
      return media.startsWith("/uploads") ? `${baseUrl}${media}` : media;
    }

    if (media instanceof File || media instanceof Blob) {
      // Si es un objeto File o Blob, usa URL.createObjectURL
      return URL.createObjectURL(media);
    }

    if (typeof media === "object" && media.url) {
      // Si es un objeto con un campo `url`, construye la URL
      return media.url.startsWith("/uploads") ? `${baseUrl}${media.url}` : media.url;
    }

    console.error("Tipo de media no válido:", media);
    return null;
  };

  const handleClick = () => {
    if (setMostrarGaleria) {
      setMostrarGaleria(true);
    }
  };

  if (!propiedadSeleccionada || !Array.isArray(propiedadSeleccionada.imagenes)) {
    return (
      <div 
        className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-200 transition"
        onClick={handleClick}
      >
        <p className="text-gray-500">No hay medios disponibles.</p>
      </div>
    );
  }

  if (propiedadSeleccionada.imagenes.length === 0) {
    return (
      <div 
        className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-200 transition"
        onClick={handleClick}
      >
        <p className="text-gray-500">No hay medios disponibles.</p>
      </div>
    );
  }

  const siguienteImagen = (e) => {
    e.stopPropagation();
    setDireccion(1);
    setImagenActual((prev) =>
      prev === propiedadSeleccionada.imagenes.length - 1 ? 0 : prev + 1
    );
  };

  const anteriorImagen = (e) => {
    e.stopPropagation();
    setDireccion(-1);
    setImagenActual((prev) =>
      prev === 0 ? propiedadSeleccionada.imagenes.length - 1 : prev - 1
    );
  };

  const currentMedia = propiedadSeleccionada.imagenes[imagenActual];

  return (
    <div 
      className="relative w-full h-64 overflow-hidden rounded-lg shadow-md cursor-pointer"
      onClick={handleClick}
    >
      <AnimatePresence initial={false} custom={direccion}>
        <motion.div
          key={imagenActual}
          className="absolute w-full h-full"
          initial={{ x: direccion * 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -direccion * 300, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          {currentMedia && isVideo(currentMedia) ? (
            <div className="w-full h-full flex items-center justify-center bg-gray-900">
              <video
                src={getMediaSource(currentMedia)}
                className="max-w-full max-h-full"
                controls
                autoPlay
                loop
                muted
              />
            </div>
          ) : currentMedia ? (
            <img
              src={getMediaSource(currentMedia)}
              alt={propiedadSeleccionada.titulo || "Imagen de la propiedad"}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-200">
              <p className="text-gray-500">Media no disponible</p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {propiedadSeleccionada.imagenes.length > 1 && (
        <>
          <button
            onClick={anteriorImagen}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-900/60 text-white p-2 rounded-full hover:bg-gray-900 transition z-10"
          >
            <ArrowLeft size={20} />
          </button>
          <button
            onClick={siguienteImagen}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-900/60 text-white p-2 rounded-full hover:bg-gray-900 transition z-10"
          >
            <ArrowRight size={20} />
          </button>
        </>
      )}
    </div>
  );
};

export default Carrusel;