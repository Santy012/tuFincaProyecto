// PopUpBorrarPerfil.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PopUpConfirmar from "./PopUpConfirmar";
import ConfirmarIdentidad from "../components//ConfirmarIdentidad"; // 
import { useAuth } from "../../../../context/AuthContext";

const PopUpBorrarPerfil = ({ admin, onCancel }) => {
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleVerifyPassword = (inputPassword) => {
    if (inputPassword === admin.contraseña) {
      setShowConfirmPopup(true);
      return null; // No hay error
    } else {
      return "Contraseña incorrecta. Inténtalo de nuevo.";
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      // await deleteProfile(admin.id);
      await logout();
      // Forzar recarga para limpiar completamente el estado
      window.location.href = '/login';
    } catch (error) {
      console.error("Error al eliminar el perfil", error);
      setIsDeleting(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-md z-50 p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="relative bg-white p-6 rounded-2xl shadow-2xl max-w-sm w-full"
        >
          <button
            onClick={onCancel}
            className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 transition"
          >
            <X size={24} />
          </button>

          <ConfirmarIdentidad onVerify={handleVerifyPassword} />
        </motion.div>
      </div>

      {showConfirmPopup && (
        <PopUpConfirmar
          mensaje="¿Estás seguro de que deseas eliminar este perfil?"
          onConfirm={handleDelete}
          onCancel={() => setShowConfirmPopup(false)}
          isLoading={isDeleting}
        />
      )}
    </>
  );
};

export default PopUpBorrarPerfil;
