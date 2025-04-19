import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";

const Carrusel = ({ propiedadSeleccionada, imagenActual, setImagenActual, setMostrarGaleria, editando }) => {
  const [direccion, setDireccion] = useState(1);

  const isVideo = (media) => {
    if (!media) return false;
    
    // Si es un objeto con propiedad tipo
    if (typeof media === 'object' && media.tipo === 'video') {
      return true;
    }
    
    // Si es un objeto con URL de video
    if (typeof media === 'object' && media.url) {
      const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov'];
      return videoExtensions.some(ext => media.url.toLowerCase().endsWith(ext));
    }
    
    // Si es una URL string
    if (typeof media === 'string') {
      const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov'];
      return videoExtensions.some(ext => media.toLowerCase().endsWith(ext));
    }
    
    return false;
  };

  const getMediaSource = (media) => {
    const baseUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:8080";
    
    // Si es un objeto con URL
    if (typeof media === 'object' && media.url) {
      return media.url.startsWith('/uploads') ? `${baseUrl}${media.url}` : media.url;
    }
    
    // Si es una URL string
    if (typeof media === 'string') {
      return media.startsWith('/uploads') ? `${baseUrl}${media}` : media;
    }
    
    console.error("Formato de media no soportado:", media);
    return null;
  };

  const handleClick = () => {
    if (setMostrarGaleria && !editando) {
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
  const mediaSource = getMediaSource(currentMedia);

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
                src={mediaSource}
                className="max-w-full max-h-full"
                controls
                autoPlay
                loop
                muted
                playsInline
                onContextMenu={(e) => e.preventDefault()}
              >
                Tu navegador no soporta videos HTML5
              </video>
            </div>
          ) : currentMedia ? (
            <img
              src={mediaSource}
              alt={propiedadSeleccionada.titulo || "Imagen de la propiedad"}
              className="w-full h-full object-cover"
              onContextMenu={(e) => e.preventDefault()}
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
            aria-label="Anterior"
          >
            <ArrowLeft size={20} />
          </button>
          <button
            onClick={siguienteImagen}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-900/60 text-white p-2 rounded-full hover:bg-gray-900 transition z-10"
            aria-label="Siguiente"
          >
            <ArrowRight size={20} />
          </button>
        </>
      )}
    </div>
  );
};

export default Carrusel;