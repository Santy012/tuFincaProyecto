import { motion } from "framer-motion";
import { X, Plus } from "lucide-react";
import { useState } from "react";

const PopupImages = ({ imagenes, onClose, onAddImage, onRemoveImage }) => {
  const [hoverIndex, setHoverIndex] = useState(null);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-md z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="relative bg-white p-6 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[80vh] overflow-y-auto"
      >
        {/* Botón de cierre en la esquina superior derecha */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 cursor-pointer z-10 transition"
        >
          <X size={24} />
        </button>

        {/* Grid de imágenes */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          {imagenes.length > 0 ? (
            imagenes.map((imagen, index) => (
              <div key={index} className="relative group">
                <img
                  src={imagen}
                  alt={`Imagen ${index + 1}`}
                  className="w-full h-40 object-cover rounded-lg shadow"
                />
                <button
                  onClick={() => onRemoveImage(index)}
                  className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
                >
                  <X size={16} />
                </button>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">
              No hay imágenes disponibles
            </p>
          )}

          {/* Botón para subir imágenes */}
          <label className="w-full h-40 flex items-center justify-center border-2 border-dashed border-gray-400 text-gray-600 rounded-lg shadow hover:bg-gray-100 transition cursor-pointer">
            <Plus size={40} />
            <input
              type="file"
              accept="image/*,video/*"
              className="hidden"
              onChange={(e) => onAddImage(e.target.files[0])}
            />
          </label>
        </div>

        {/* Botón de Guardar al final del Popup */}
        <div className="flex justify-end mt-6">
          <button
            onClick={onClose} // Misma funcionalidad que la "X"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
          >
            Guardar
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default PopupImages;
