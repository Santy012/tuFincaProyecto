import { useState } from "react";
import { useGlobalContext } from "../../../context/GlobalContext";
import MensajeCard from "./components/MensajeCard";
import PopUpConfirmar from "../perfil/subcomponents/PopUpConfirmar";

const ListaMensajes = () => {
  const { mensajes, setMensajes, propiedades } = useGlobalContext();
  const [filtro, setFiltro] = useState("todos");
  const [mensajesSeleccionados, setMensajesSeleccionados] = useState([]);
  const [showConfirmacion, setShowConfirmacion] = useState(false);

  const mensajesFiltrados = mensajes.filter((mensaje) => {
    if (filtro === "todos") return true;
    return mensaje.gestion === filtro;
  });

  const toggleSeleccionMensaje = (id) => {
    setMensajesSeleccionados(prev =>
      prev.includes(id)
        ? prev.filter(msgId => msgId !== id)
        : [...prev, id]
    );
  };

  const deseleccionarTodos = () => {
    setMensajesSeleccionados([]);
  };

  const eliminarMensajesSeleccionados = () => {
    setMensajes(prev => prev.filter(msg => !mensajesSeleccionados.includes(msg.id)));
    setMensajesSeleccionados([]);
    setShowConfirmacion(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="sm:flex sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Bandeja de Mensajes</h1>
          <p className="mt-1 text-sm text-gray-500">
            {mensajesFiltrados.length} {mensajesFiltrados.length === 1 ? "mensaje" : "mensajes"} 
            {filtro !== "todos" && ` (${filtro === "porLeer" ? "no leídos" : "leídos"})`}
            {mensajesSeleccionados.length > 0 && (
              <span className="ml-2 text-blue-600">
                • {mensajesSeleccionados.length} seleccionados
              </span>
            )}
          </p>
        </div>
        
        <div className="mt-4 sm:mt-0 flex space-x-2">
          {mensajesSeleccionados.length > 0 && (
            <>
              <button
                onClick={deseleccionarTodos}
                className="px-3 py-1.5 rounded-full text-sm font-medium bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors border border-gray-300"
              >
                Deseleccionar todos
              </button>
              <button
                onClick={() => setShowConfirmacion(true)}
                className="px-3 py-1.5 rounded-full text-sm font-medium bg-red-600 text-white shadow-md hover:bg-red-700 transition-colors"
              >
                Eliminar seleccionados
              </button>
            </>
          )}
          <button
            onClick={() => {
              setFiltro("todos");
              deseleccionarTodos();
            }}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              filtro === "todos" 
                ? "bg-blue-600 text-white shadow-md" 
                : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
            }`}
          >
            Todos
          </button>
          <button
            onClick={() => {
              setFiltro("porLeer");
              deseleccionarTodos();
            }}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              filtro === "porLeer" 
                ? "bg-red-600 text-white shadow-md" 
                : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
            }`}
          >
            Por leer
          </button>
          <button
            onClick={() => {
              setFiltro("realizado");
              deseleccionarTodos();
            }}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              filtro === "realizado" 
                ? "bg-green-600 text-white shadow-md" 
                : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
            }`}
          >
            Leídos
          </button>
        </div>
      </div>

      {showConfirmacion && (
        <PopUpConfirmar
          mensaje={`¿Estás seguro que deseas eliminar ${mensajesSeleccionados.length} mensaje${mensajesSeleccionados.length > 1 ? 's' : ''}?`}
          onConfirm={eliminarMensajesSeleccionados}
          onCancel={() => setShowConfirmacion(false)}
        />
      )}

      {mensajesFiltrados.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-8 text-center">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
          </svg>
          <h3 className="mt-2 text-lg font-medium text-gray-900">
            No hay mensajes {filtro === "todos" ? "" : filtro === "porLeer" ? "por leer" : "leídos"}
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            {filtro === "porLeer" 
              ? "¡Todo está bajo control!" 
              : "Cuando recibas nuevos mensajes aparecerán aquí"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {mensajesFiltrados.map((mensaje) => (
            <MensajeCard 
              key={mensaje.id} 
              mensaje={mensaje} 
              setMensajes={setMensajes}
              propiedades={propiedades}
              isSelected={mensajesSeleccionados.includes(mensaje.id)}
              onSelect={() => toggleSeleccionMensaje(mensaje.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ListaMensajes;