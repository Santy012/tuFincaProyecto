import { motion } from "framer-motion";
import { X } from "lucide-react";

const PopUpPerfil = ({ admin, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-md z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="relative bg-white p-6 rounded-2xl shadow-2xl max-w-md w-full"
      >
        {/* Botón de cerrar */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 transition"
        >
          <X size={24} />
        </button>

        {/* Contenido del perfil */}
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Perfil del Administrador</h2>
        <div className="space-y-3">
          <p><span className="font-semibold">Nombre:</span> {admin.nombre}</p>
          <p><span className="font-semibold">Correo:</span> {admin.email}</p>
          <p><span className="font-semibold">Rol:</span> {admin.rol}</p>
        </div>

        {/* Botón para eliminar cuenta */}
        <button
          className="mt-4 w-full bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-500 transition"
          onClick={admin.onDelete}
        >
          Eliminar Cuenta
        </button>
      </motion.div>
    </div>
  );
};

export default PopUpPerfil;
