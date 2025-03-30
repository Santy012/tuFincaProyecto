import { User } from "lucide-react";
import PopUpBorrarPerfil from "../subcomponents/PopUpBorrarPerfil";
import { useState } from "react";

const PerfilInfo = ({ admin, onEdit }) => {
  const [mostrarPopUp, setMostrarPopUp] = useState(false);

  if (!admin) {
    return <p className="text-red-500 text-center mt-4">Error: No se encontró la información del administrador.</p>;
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md flex flex-col items-center border border-gray-200">
      <div className="relative w-28 h-28 mb-6">
        <div className="w-full h-full flex items-center justify-center bg-gray-200 rounded-full">
          <User size={72} className="text-gray-400" />
        </div>
      </div>
      <h2 className="text-2xl font-bold text-gray-800">{admin.usuario || "Usuario no disponible"}</h2>
      <div className="mt-4 w-full text-center">
        <p className="text-lg font-semibold text-gray-500">Nombre</p>
        <p className="text-xl text-gray-800 font-medium">{admin.nombre || "Nombre no disponible"}</p>
      </div>
      <div className="mt-2 w-full text-center">
        <p className="text-lg font-semibold text-gray-500">Correo</p>
        <p className="text-xl text-gray-800 font-medium">{admin.correo || "Correo no disponible"}</p>
      </div>
      <button
        onClick={onEdit}
        className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-500 transition text-lg"
      >
        Editar Perfil
      </button>
      <button
        onClick={() => setMostrarPopUp(true)}
        className="mt-4 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-500 transition text-lg"
      >
        Borrar Perfil
      </button>
      {mostrarPopUp && (
        <PopUpBorrarPerfil admin={admin} onCancel={() => setMostrarPopUp(false)} />
      )}
    </div>
  );
};

export default PerfilInfo;
