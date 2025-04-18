import { useState, useEffect } from "react";
import { useGlobalContext } from "../../../../context/GlobalContext";
import PopUpMensaje from "../subcomponents/PopUpMensajes";
import PopUpConfirmar from "../../perfil/subcomponents/PopUpConfirmar";

const MensajeCard = ({ mensaje, isSelected, onSelect }) => {
  const { eliminarMensaje, propiedades, admins, fetchAdminById } =
    useGlobalContext();
  const [isOpen, setIsOpen] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [currentMensaje, setCurrentMensaje] = useState(mensaje);

  const propiedadRelacionada = mensaje?.propiedad
    ? propiedades.find((p) => p.id === mensaje.propiedad.id)
    : null;

  const administradorRelacionado = mensaje?.administradorId
    ? admins.find((a) => a.id === mensaje.administradorId)
    : null;

  useEffect(() => {
    const fetchAdmin = async () => {
      // Usar administradorId si ese es el nombre correcto
      if (currentMensaje.administradorId) {
        try {
          const admin = await fetchAdminById(currentMensaje.administradorId);
          setCurrentMensaje(admin);
        } catch (error) {
          console.error("Error al buscar el administrador:", error);
        }
      }
    };

    fetchAdmin();
  }, [currentMensaje.administradorId, fetchAdminById]); // Cambiar la dependencia aquí

  const formatFecha = (fechaString) => {
    const [fecha, hora] = fechaString.split("T");
    const [hh, mm] = hora.split(":");
    let horas = parseInt(hh, 10);
    const ampm = horas >= 12 ? 'PM' : 'AM';
    horas = horas % 12 || 12; // Convierte 0 a 12
    return `${fecha} ${horas}:${mm} ${ampm}`;
  }
  
  
  
  const handleCardClick = (e) => {
    if (e.target.type !== "checkbox") {
      setIsOpen(true);
    }
  };

  const handleDelete = async () => {
    try {
      await eliminarMensaje(mensaje.id);
      setShowDeleteConfirm(false);
    } catch (error) {
      console.error("Error eliminando mensaje:", error);
    }
  };

  return (
    <>
      <div
        className={`bg-white rounded-xl border overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer group relative ${
          isSelected ? "border-blue-500 border-2" : "border-gray-200"
        }`}
        onClick={handleCardClick}
      >
        <div className="absolute top-2 left-2">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={(e) => {
              e.stopPropagation();
              onSelect(mensaje.id);
            }}
            className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            onClick={(e) => e.stopPropagation()}
          />
        </div>

        <div className="p-5 pl-10">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                {mensaje.nombreCliente} {mensaje.apellidoCliente}
              </h3>
              <div className="flex flex-wrap gap-3 mt-1 text-sm text-gray-500">
                <span className="flex items-center">
                  <svg
                    className="w-3 h-3 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  {mensaje.celular}
                </span>
                <span className="flex items-center">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {formatFecha(mensaje.fecha)}
                </span>
                {propiedadRelacionada && (
                  <span className="flex items-center bg-blue-50 rounded-full px-2 py-0.5">
                    <svg
                      className="w-3 h-3 mr-1 text-blue-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2H4a1 1 0 010-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-blue-600 font-medium">
                      {propiedadRelacionada.codigo}
                    </span>
                  </span>
                )}
                {administradorRelacionado && (
                  <span className="flex items-center bg-purple-50 rounded-full px-2 py-0.5">
                    <svg
                      className="w-3 h-3 mr-1 text-purple-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                    </svg>
                    <span className="text-purple-600 font-medium">
                      {administradorRelacionado.nombre.split(" ")[0]}
                    </span>
                  </span>
                )}
              </div>
            </div>
            <span
              className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium whitespace-nowrap ${
                mensaje.gestion === "porLeer"
                  ? "bg-red-100 text-red-800"
                  : "bg-green-100 text-green-800"
              }`}
            >
              {mensaje.gestion === "porLeer" ? "Por leer" : "Leído"}
            </span>
          </div>

          <p className="mt-3 text-gray-600 line-clamp-2">{mensaje.detalle}</p>

          <div className="mt-4 flex justify-between items-center">
            <button className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center">
              Ver completo
              <svg
                className="w-4 h-4 ml-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <PopUpMensaje
          mensaje={mensaje}
          onClose={() => setIsOpen(false)}
          onDelete={() => setShowDeleteConfirm(true)}
          propiedadRelacionada={propiedadRelacionada}
          adminData={administradorRelacionado}
          setAdminData={setCurrentMensaje} // Cambiar el estado del administrador relacionado aquí
        />
      )}

      {showDeleteConfirm && (
        <PopUpConfirmar
          mensaje="¿Estás seguro que deseas eliminar este mensaje?"
          onConfirm={handleDelete}
          onCancel={() => setShowDeleteConfirm(false)}
        />
      )}
    </>
  );
};

export default MensajeCard;
