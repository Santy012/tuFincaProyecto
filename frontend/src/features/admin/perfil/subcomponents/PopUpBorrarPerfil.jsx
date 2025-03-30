import { motion } from "framer-motion";

const PopUpBorrarPerfil = ({ onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-md z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="relative bg-white p-6 rounded-2xl shadow-2xl max-w-sm w-full text-center"
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-4">¿Estás seguro?</h2>
        <p className="text-gray-600">Esta acción no se puede deshacer.</p>

        {/* Botones */}
        <div className="mt-4 flex justify-center gap-4">
          <button
            className="bg-gray-400 text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-500 transition"
            onClick={onCancel}
          >
            Cancelar
          </button>
          <button
            className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-500 transition"
            onClick={onConfirm}
          >
            Eliminar
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default PopUpBorrarPerfil;
