import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";
const Carrusel = ({ propiedadSeleccionada, imagenActual, setImagenActual }) => {
  const [direccion, setDireccion] = useState(1);

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
  return (
    <div className="relative w-full h-64 overflow-hidden rounded-lg shadow-md">
      <AnimatePresence initial={false} custom={direccion}>
        <motion.img
          key={imagenActual}
          src={propiedadSeleccionada.imagenes[imagenActual]}
          alt={propiedadSeleccionada.titulo}
          className="absolute w-full h-64 object-cover rounded-lg"
          initial={{ x: direccion * 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -direccion * 300, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </AnimatePresence>
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
    </div>
  );
};

export default Carrusel;
