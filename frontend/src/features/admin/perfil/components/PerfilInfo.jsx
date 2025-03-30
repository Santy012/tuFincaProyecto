import { User } from "lucide-react";

const PerfilInfo = ({ admin, onEdit }) => {
  if (!admin) {
    return <p className="text-red-500">Error: No se encontró la información del administrador.</p>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-96 flex flex-col items-center">
      <User size={64} className="text-gray-400 mb-4" />
      <p className="text-lg font-semibold">Nombre: {admin.nombre || "Nombre no disponible"}</p>
      <p className="text-gray-600">Correo: {admin.correo || "Correo no disponible"}</p>
      <p className="text-gray-500 mb-4">Usuario: {admin.usuario || "Usuario no disponible"}</p>
      <button
        onClick={onEdit}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500"
      >
        Editar Perfil
      </button>
    </div>
  );
};

export default PerfilInfo;
