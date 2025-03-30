import { User } from "lucide-react";
import PopUpBorrarPerfil from "../subcomponents/PopUpBorrarPerfil";
import PopUpConfirmar from "../subcomponents/PopUpConfirmar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const PerfilInfo = ({ admin, onEdit }) => {
  const [mostrarPopUpBorrar, setMostrarPopUpBorrar] = useState(false);
  const [mostrarPopUpCerrarSesion, setMostrarPopUpCerrarSesion] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      // TODO: Cerrar la sesión y limpiar el contexto de admin
      navigate("/");
    } catch (error) {
      console.error("Error al cerrar sesión", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-2xl flex flex-col items-center border border-gray-200">
      {/* Icono del usuario */}
      <div className="w-28 h-28 flex items-center justify-center bg-gray-200 rounded-full">
        <User size={72} className="text-gray-400" />
      </div>
      <h2 className="text-2xl font-bold text-gray-800 mt-4">{admin.usuario || "Usuario no disponible"}</h2>
      
      <div className="flex w-full justify-between mt-6">
        {/* Sección de Información */}
        <div className="flex-1 text-center border-r border-gray-300 pr-6">
          <h3 className="text-lg font-bold text-gray-600 mb-2">Información: </h3>
          <p className="text-lg font-semibold text-gray-500">Nombre</p>
          <p className="text-xl text-gray-800 font-medium">{admin.nombre || "Nombre no disponible"}</p>
          <p className="text-lg font-semibold text-gray-500 mt-2">Correo</p>
          <p className="text-xl text-gray-800 font-medium">{admin.correo || "Correo no disponible"}</p>
        </div>
        
        {/* Sección de Gestión de Perfil */}
        <div className="flex-1 flex flex-col items-center pl-6">
          <h3 className="text-lg font-bold text-gray-600 mb-2">Gestión de Perfil:</h3>
          <button
            onClick={onEdit}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-500 transition text-lg w-40 mb-2"
          >
            Editar Perfil
          </button>
          <button
            onClick={() => setMostrarPopUpBorrar(true)}
            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-500 transition text-lg w-40 mb-2"
          >
            Borrar Perfil
          </button>
          <button
            onClick={() => setMostrarPopUpCerrarSesion(true)}
            className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-500 transition text-lg w-40"
          >
            Cerrar Sesión
          </button>
        </div>
      </div>

      {/* Popups */}
      {mostrarPopUpBorrar && (
        <PopUpBorrarPerfil admin={admin} onCancel={() => setMostrarPopUpBorrar(false)} />
      )}
      {mostrarPopUpCerrarSesion && (
        <PopUpConfirmar
          mensaje="¿Estás seguro de cerrar sesión?"
          onConfirm={handleLogout}
          onCancel={() => setMostrarPopUpCerrarSesion(false)}
          isLoading={isLoggingOut}
        />
      )}
    </div>
  );
};

export default PerfilInfo;
