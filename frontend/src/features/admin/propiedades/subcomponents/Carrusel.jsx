import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";

const Carrusel = ({ propiedadSeleccionada, imagenActual, setImagenActual, setMostrarGaleria }) => {
  const [direccion, setDireccion] = useState(1);

  const isVideo = (media) => {
    if (!media) return false;
    
    // Si es un objeto File/Blob
    if (media instanceof File || media instanceof Blob) {
      return media.type.includes('video');
    }
    
    // Si es un string (URL o DataURL)
    if (typeof media === 'string') {
      // Para DataURLs, verificamos el tipo MIME
      if (media.startsWith('data:')) {
        return media.split(';')[0].includes('video');
      }
      // Para URLs normales, verificamos la extensión
      return media.match(/\.(mp4|webm|ogg|mov)$/i);
    }
    
    return false;
  };

  const getMediaSource = (media) => {
    if (typeof media === 'string') {
      return media;
    }
    return URL.createObjectURL(media);
  };

  if (!propiedadSeleccionada || !Array.isArray(propiedadSeleccionada.imagenes) || propiedadSeleccionada.imagenes.length === 0) {
    return <p className="text-gray-500">No hay medios disponibles.</p>;
  }

  const siguienteImagen = () => {
    setDireccion(1);
    setImagenActual((prev) =>
      prev === propiedadSeleccionada.imagenes.length - 1 ? 0 : prev + 1
    );
  };

  const anteriorImagen = () => {
    setDireccion(-1);
    setImagenActual((prev) =>
      prev === 0 ? propiedadSeleccionada.imagenes.length - 1 : prev - 1
    );
  };

  const currentMedia = propiedadSeleccionada.imagenes[imagenActual];

  return (
    <div className="relative w-full h-64 overflow-hidden rounded-lg shadow-md">
      <AnimatePresence initial={false} custom={direccion}>
        <motion.div
          key={imagenActual}
          className="absolute w-full h-64"
          initial={{ x: direccion * 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -direccion * 300, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          onClick={() => setMostrarGaleria(true)}
        >
          {isVideo(currentMedia) ? (
            <video
              src={getMediaSource(currentMedia)}
              className="w-full h-full object-cover rounded-lg cursor-pointer"
              controls
              autoPlay
              loop
              muted
            />
          ) : (
            <img
              src={getMediaSource(currentMedia)}
              alt={propiedadSeleccionada.titulo || "Imagen de la propiedad"}
              className="w-full h-full object-cover rounded-lg cursor-pointer"
            />
          )}
        </motion.div>
      </AnimatePresence>
      {propiedadSeleccionada.imagenes.length > 1 && (
        <>
          <button
            onClick={anteriorImagen}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-900/60 text-white p-3 rounded-full hover:bg-gray-900 transition"
          >
            <ArrowLeft size={20} />
          </button>
          <button
            onClick={siguienteImagen}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-900/60 text-white p-3 rounded-full hover:bg-gray-900 transition"
          >
            <ArrowRight size={20} />
          </button>
        </>
      )}
    </div>
  );
};

export default Carrusel;