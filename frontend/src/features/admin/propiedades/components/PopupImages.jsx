import { motion } from "framer-motion";
import { X } from "lucide-react";

const PopupImages = ({ imagenes, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-md z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="relative bg-white p-6 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[80vh] overflow-y-auto"
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 cursor-pointer z-10 transition"
        >
          <X size={24} />
        </button>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          {imagenes && imagenes.length > 0 ? (
            imagenes.map((imagen, index) => (
              <img
                key={index}
                src={imagen}
                alt={`Imagen ${index + 1}`}
                className="w-full h-40 object-cover rounded-lg shadow"
              />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">No hay imágenes disponibles</p>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default PopupImages;
