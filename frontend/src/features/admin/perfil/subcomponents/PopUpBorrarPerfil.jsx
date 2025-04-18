// PopUpBorrarPerfil.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import PopUpConfirmar from "./PopUpConfirmar";
import ConfirmarIdentidad from "../components//ConfirmarIdentidad"; // 
import { useGlobalContext } from "../../../../context/GlobalContext";
import Cookies from "js-cookie"; // Asegúrate de tener js-cookie instalado

const PopUpBorrarPerfil = ({ admin, onCancel }) => {
  const { deleteAdmin, loginAdmin } = useGlobalContext(); // Asegúrate de que estas funciones estén disponibles en tu contexto
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleVerifyPassword = async (inputPassword) => {
    try {
      const authData = { usuario: admin.usuario, contrasena: inputPassword };
      console.log("Auth Data:", authData); // Verifica los datos de autenticación
      const loginResponse = await loginAdmin(authData); // Call loginAdmin
  
      if (loginResponse.token) {
        setShowConfirmPopup(true);
        return null; // Authentication successful
      } else {
        return "Autenticación fallida. Inténtalo de nuevo.";
      }
    } catch (error) {
      console.error("Error al autenticar:", error);
      return "Error al autenticar. Inténtalo de nuevo.";
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      // Elimina al administrador
      await deleteAdmin(admin.id); // Usa la función deleteAdmin del contexto
      Cookies.remove("authToken"); // Elimina el token
      window.location.href = "/login"; // Redirige al login
    } catch (error) {
      console.error("Error al eliminar el perfil:", error);
    } finally {
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
