import { FiRefreshCw } from "react-icons/fi";
import { useState, useEffect } from "react";
import { useGlobalContext } from "../../../context/GlobalContext";
import MensajeCard from "./components/MensajeCard";
import PopUpConfirmar from "../perfil/subcomponents/PopUpConfirmar";
import LoadingSpinner from "../../../components/LoadingSpinner";
import ErrorMessage from "../../../components/ErrorMessage";

const ListaMensajes = () => {
  const {
    mensajes,
    eliminarMensaje,
    fetchMensajes,
    loadingMensajes,
    errorMensajes,
  } = useGlobalContext();

  const [filtro, setFiltro] = useState("todos");
  const [mensajesSeleccionados, setMensajesSeleccionados] = useState([]);
  const [showConfirmacion, setShowConfirmacion] = useState(false);

  useEffect(() => {
    fetchMensajes();
  }, []);

  const mensajesFiltrados = mensajes.filter((mensaje) => {
    if (filtro === "todos") return true;
    console.log(mensaje.fecha);
    return mensaje.gestion === filtro;
  });

  const toggleSeleccionMensaje = (id) => {
    setMensajesSeleccionados((prev) =>
      prev.includes(id) ? prev.filter((msgId) => msgId !== id) : [...prev, id]
    );
  };

  const deseleccionarTodos = () => {
    setMensajesSeleccionados([]);
  };

  const handleRecargarMensajes = async () => {
    try {
      await fetchMensajes(); // Llama a la función para recargar los mensajes
      console.log("Mensajes recargados exitosamente");
    } catch (error) {
      console.error("Error al recargar los mensajes:", error);
    }
  };

  const handleEliminarMensajes = async () => {
    try {
      await Promise.all(mensajesSeleccionados.map((id) => eliminarMensaje(id)));
      setMensajesSeleccionados([]);
      setShowConfirmacion(false);
    } catch (error) {
      console.error("Error eliminando mensajes:", error);
    }
  };

  if (loadingMensajes) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner message="Cargando mensajes..." />
      </div>
    );
  }

  if (errorMensajes) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <ErrorMessage
          message={errorMensajes}
          onRetry={fetchMensajes}
          retryText="Volver a cargar mensajes"
        />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="sm:flex sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Bandeja de Mensajes
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            {mensajesFiltrados.length}{" "}
            {mensajesFiltrados.length === 1 ? "mensaje" : "mensajes"}
            {filtro !== "todos" &&
              ` (${filtro === "porLeer" ? "no leídos" : "leídos"})`}
            {mensajesSeleccionados.length > 0 && (
              <span className="ml-2 text-blue-600">
                • {mensajesSeleccionados.length} seleccionados
              </span>
            )}
          </p>
        </div>

        <div className="mt-4 sm:mt-0 flex space-x-2">
          {/* Botón para recargar mensajes */}
          <button
            onClick={handleRecargarMensajes}
            className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            aria-label="Recargar mensajes"
          >
            <FiRefreshCw className="h-5 w-5" />
          </button>

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
          <div className="flex gap-2">
            <FiltroButton
              estado="todos"
              current={filtro}
              label="Todos"
              color="blue"
              onClick={() => setFiltro("todos")}
            />
            <FiltroButton
              estado="porLeer"
              current={filtro}
              label="Por leer"
              color="red"
              onClick={() => setFiltro("porLeer")}
            />
            <FiltroButton
              estado="realizado"
              current={filtro}
              label="Leídos"
              color="green"
              onClick={() => setFiltro("realizado")}
            />
          </div>
        </div>
      </div>

      {showConfirmacion && (
        <PopUpConfirmar
          mensaje={`¿Estás seguro que deseas eliminar ${
            mensajesSeleccionados.length
          } mensaje${mensajesSeleccionados.length > 1 ? "s" : ""}?`}
          onConfirm={handleEliminarMensajes}
          onCancel={() => setShowConfirmacion(false)}
        />
      )}

      {mensajesFiltrados.length === 0 ? (
        <EmptyState filtro={filtro} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {mensajesFiltrados.map((mensaje) => (
            <MensajeCard
              key={mensaje.id}
              mensaje={mensaje}
              isSelected={mensajesSeleccionados.includes(mensaje.id)}
              onSelect={toggleSeleccionMensaje}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const FiltroButton = ({ estado, current, label, color, onClick }) => (
  <button
    onClick={() => {
      onClick();
      if (current !== estado) deseleccionarTodos();
    }}
    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
      current === estado
        ? `bg-${color}-600 text-white shadow-md`
        : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
    }`}
  >
    {label}
  </button>
);

const EmptyState = ({ filtro }) => (
  <div className="bg-white rounded-xl shadow-sm p-8 text-center">
    <svg
      className="mx-auto h-12 w-12 text-gray-400"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    </svg>
    <h3 className="mt-2 text-lg font-medium text-gray-900">
      No hay mensajes{" "}
      {filtro === "todos" ? "" : filtro === "porLeer" ? "por leer" : "leídos"}
    </h3>
    <p className="mt-1 text-sm text-gray-500">
      {filtro === "porLeer"
        ? "¡Todo está bajo control!"
        : "Cuando recibas nuevos mensajes aparecerán aquí"}
    </p>
  </div>
);

export default ListaMensajes;
