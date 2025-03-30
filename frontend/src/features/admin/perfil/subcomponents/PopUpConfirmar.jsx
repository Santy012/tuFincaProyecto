import { motion } from "framer-motion";

const PopUpConfirmar = ({ mensaje, onConfirm, onCancel, isLoading }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-md z-50 p-4">
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="relative bg-white p-6 rounded-2xl shadow-2xl max-w-sm w-full text-center"
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-4">{mensaje}</h2>
        <div className="mt-4 flex justify-center gap-4">
          <button
            className="bg-gray-400 text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-500 transition"
            onClick={onCancel}
          >
            Cancelar
          </button>
          <button
            className={`bg-red-600 text-white px-4 py-2 rounded-lg font-semibold transition w-full ${isLoading ? 'hover:bg-red-400 cursor-not-allowed' : 'hover:bg-red-500'}`}
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? "Confirmando..." : "Hecho"}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default PopUpConfirmar;
