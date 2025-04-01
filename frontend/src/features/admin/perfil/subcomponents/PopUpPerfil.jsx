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
  const [errorCorreo, setErrorCorreo] = useState("");

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleChange = (campo, valor) => {
    if (campo === "correo") {
      if (valor && !isValidEmail(valor)) {
        setErrorCorreo("Por favor ingresa un correo válido (ejemplo@dominio.com)");
      } else {
        setErrorCorreo("");
      }
    }
    setFormData((prev) => ({ ...prev, [campo]: valor }));
  };

  const handleGuardar = () => {
    if (!formData.correo) {
      setErrorCorreo("El correo electrónico es requerido");
      return;
    }
    
    if (!isValidEmail(formData.correo)) {
      setErrorCorreo("Por favor ingresa un correo válido");
      return;
    }
    
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
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 transition"
        >
          <X size={24} />
        </button>

        <h2 className="text-xl font-semibold text-gray-800 mb-4">Perfil del Administrador</h2>

        <div className="space-y-4">
          <CampoEditable 
            label="Nombre" 
            value={formData.nombre} 
            onChange={(valor) => handleChange("nombre", valor)} 
            editando={editando} 
          />
          
          <div>
            <CampoEditable 
              label="Correo electrónico" 
              value={formData.correo} 
              onChange={(valor) => handleChange("correo", valor)} 
              editando={editando} 
              type="email"
            />
            {errorCorreo && (
              <p className="text-red-500 text-sm mt-1 animate-fadeIn">{errorCorreo}</p>
            )}
          </div>
          
          <CampoEditable 
            label="Usuario" 
            value={formData.usuario} 
            onChange={(valor) => handleChange("usuario", valor)} 
            editando={editando} 
          />
        </div>

        {editando ? (
          <div className="mt-6 flex space-x-3">
            <button
              onClick={() => {
                setEditando(false);
                setErrorCorreo("");
                setFormData({
                  nombre: admin.nombre,
                  correo: admin.correo,
                  usuario: admin.usuario,
                });
              }}
              className="flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded-lg font-medium hover:bg-gray-300 transition"
            >
              Cancelar
            </button>
            <button
              onClick={handleGuardar}
              disabled={!!errorCorreo || !formData.correo}
              className={`flex-1 px-4 py-2 rounded-lg font-medium transition ${
                errorCorreo || !formData.correo
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-green-600 text-white hover:bg-green-500"
              }`}
            >
              Guardar
            </button>
          </div>
        ) : (
          <button
            onClick={() => setEditando(true)}
            className="mt-6 w-full bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-500 transition"
          >
            Editar Perfil
          </button>
        )}
      </motion.div>
    </div>
  );
};

export default PopUpPerfil;