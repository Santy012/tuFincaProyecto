import { useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PopUpConfirmar from "./PopUpConfirmar"; // Importamos el nuevo popup de confirmación

const PopUpBorrarPerfil = ({ admin, onCancel }) => {
  const [password, setPassword] = useState("");
  const [passwordCorrect, setPasswordCorrect] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const navigate = useNavigate();

  const handleVerifyPassword = () => {
    if (password === admin.contraseña) {
      setPasswordCorrect(true);
      setErrorMessage("");
      setShowConfirmPopup(true); // Muestra el popup de confirmación
    } else {
      setErrorMessage("Contraseña incorrecta. Inténtalo de nuevo.");
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    
    try {
      // Aquí llamamos a la API del backend para eliminar el perfil
      // await deleteProfile(admin.id);

      navigate("/main"); // Redirigir a MainPage después de la eliminación
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
          className="relative bg-white p-6 rounded-2xl shadow-2xl max-w-sm w-full text-center"
        >
          <button
            onClick={onCancel}
            className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 transition"
          >
            <X size={24} />
          </button>

          <h2 className="text-xl font-semibold text-gray-800 mb-4">Confirmar identidad</h2>
          <p className="text-gray-600 mb-4">Ingresa tu contraseña para continuar.</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg mb-2"
            placeholder="Contraseña"
          />
          {errorMessage && <p className="text-red-500 text-sm mb-2">{errorMessage}</p>}
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-500 transition w-full"
            onClick={handleVerifyPassword}
          >
            Aceptar
          </button>
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
