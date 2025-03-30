import { useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import CampoEditable from "../../propiedades/subcomponents/CampoEditable";

const PopUpPerfil = ({ admin, setAdmin, onClose }) => {
  const [editando, setEditando] = useState(false);
  const [formData, setFormData] = useState({
    nombre: admin.nombre,
    correo: admin.correo,
    usuario: admin.usuario,
  });

  const handleChange = (campo, valor) => {
    setFormData((prev) => ({ ...prev, [campo]: valor }));
  };

  const handleGuardar = () => {
    setAdmin((prev) => ({ ...prev, ...formData }));
    setEditando(false);
  };

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

        <CampoEditable 
          label="Nombre" 
          value={formData.nombre} 
          onChange={(valor) => handleChange("nombre", valor)} 
          editando={editando} 
        />
        <CampoEditable 
          label="Correo" 
          value={formData.correo} 
          onChange={(valor) => handleChange("correo", valor)} 
          editando={editando} 
          type="email" 
        />
        <CampoEditable 
          label="Usuario" 
          value={formData.usuario} 
          onChange={(valor) => handleChange("usuario", valor)} 
          editando={editando} 
        />

        {editando ? (
          <button
            onClick={handleGuardar}
            className="mt-4 w-full bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-500 transition"
          >
            Guardar Cambios
          </button>
        ) : (
          <button
            onClick={() => setEditando(true)}
            className="mt-4 w-full bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-500 transition"
          >
            Editar Perfil
          </button>
        )}
      </motion.div>
    </div>
  );
};

export default PopUpPerfil;
