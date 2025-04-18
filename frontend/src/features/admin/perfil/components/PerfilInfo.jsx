import { User } from "lucide-react";
import PopUpBorrarPerfil from "../subcomponents/PopUpBorrarPerfil";
import PopUpConfirmar from "../subcomponents/PopUpConfirmar";
import { useState } from "react";
import { useGlobalContext } from "../../../../context/GlobalContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const PerfilInfo = ({ admin, onEdit }) => {
  const { logoutAdmin } = useGlobalContext();
  const [mostrarPopUpBorrar, setMostrarPopUpBorrar] = useState(false);
  const [mostrarPopUpCerrarSesion, setMostrarPopUpCerrarSesion] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();

  const handleLogoutConfirm = async () => {
    setIsLoggingOut(true);
    try {
      await logoutAdmin();
      navigate('/login');
    } catch (error) {
      console.error("Error al cerrar sesión", error);
    } finally {
      setIsLoggingOut(false);
      setMostrarPopUpCerrarSesion(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-3xl mx-4 border border-gray-100 hover:shadow-2xl transition-shadow"
    >
      <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start">
        {/* Sección de Avatar */}
        <div className="flex flex-col items-center">
          <div className="w-32 h-32 flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 rounded-full shadow-lg">
            <User size={64} className="text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mt-4 text-center">
            {admin.usuario || "Usuario no disponible"}
          </h2>
        </div>

        {/* Contenido Principal */}
        <div className="flex-1 w-full">
          {/* Sección de Información */}
          <div className="space-y-4 mb-8">
            <div className="bg-gray-50 p-4 rounded-xl">
              <h3 className="text-sm font-semibold text-gray-500 mb-2">Información del perfil</h3>
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-medium text-gray-400">Nombre completo</label>
                  <p className="text-lg text-gray-800 font-medium">
                    {admin.nombre || "Nombre no disponible"}
                  </p>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-400">Correo electrónico</label>
                  <p className="text-lg text-gray-800 font-medium break-all">
                    {admin.correo || "Correo no disponible"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sección de Acciones */}
          <div className="border-t border-gray-100 pt-6">
            <h3 className="text-sm font-semibold text-gray-500 mb-4">Acciones de cuenta</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <button
                onClick={onEdit}
                className="flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all text-sm font-medium shadow-md hover:shadow-lg"
              >
                <User size={18} />
                Editar perfil
              </button>
              
              <button
                onClick={() => setMostrarPopUpBorrar(true)}
                className="flex items-center justify-center gap-2 bg-red-100 text-red-600 px-6 py-3 rounded-lg hover:bg-red-200 transition-all text-sm font-medium shadow-md hover:shadow-lg"
              >
                <User size={18} />
                Eliminar cuenta
              </button>
              
              <button
                onClick={() => setMostrarPopUpCerrarSesion(true)}
                className="flex items-center justify-center gap-2 bg-gray-100 text-gray-600 px-6 py-3 rounded-lg hover:bg-gray-200 transition-all text-sm font-medium shadow-md hover:shadow-lg md:col-span-2"
              >
                <User size={18} />
                Cerrar sesión
                {isLoggingOut && <span className="ml-2 animate-pulse">...</span>}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Popups */}
      {mostrarPopUpBorrar && (
        <PopUpBorrarPerfil admin={admin} onCancel={() => setMostrarPopUpBorrar(false)} />
      )}
      
      {mostrarPopUpCerrarSesion && (
        <PopUpConfirmar
          mensaje="¿Estás seguro de cerrar sesión?"
          onConfirm={handleLogoutConfirm}
          onCancel={() => setMostrarPopUpCerrarSesion(false)}
          isLoading={isLoggingOut}
        />
      )}
    </motion.div>
  );
};

export default PerfilInfo;