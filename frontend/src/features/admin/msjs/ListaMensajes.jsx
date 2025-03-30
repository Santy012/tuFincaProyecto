import { useState } from "react";
import { useGlobalContext } from "../../../context/GlobalContext";
import MensajeCard from "./components/MensajeCard";

const ListaMensajes = () => {
  const { mensajes } = useGlobalContext(); // Obtiene los mensajes desde el contexto
  const [filtro, setFiltro] = useState("todos");

  // Función para filtrar mensajes
  const mensajesFiltrados = mensajes.filter((mensaje) => {
    if (filtro === "todos") return true;
    return mensaje.gestion === filtro;
  });

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Bandeja de Entrada</h1>

      {/* Filtros */}
      <div className="flex space-x-4 mb-6">
        <button
          className={`px-4 py-2 rounded-lg ${filtro === "todos" ? "bg-yellow-500 text-white" : "bg-gray-200"}`}
          onClick={() => setFiltro("todos")}
        >
          Todos
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${filtro === "porLeer" ? "bg-yellow-500 text-white" : "bg-gray-200"}`}
          onClick={() => setFiltro("porLeer")}
        >
          Por Leer
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${filtro === "realizado" ? "bg-yellow-500 text-white" : "bg-gray-200"}`}
          onClick={() => setFiltro("realizado")}
        >
          Realizado
        </button>
      </div>

      {/* Lista de mensajes */}
      {mensajesFiltrados.length === 0 ? (
        <p className="text-gray-500">No hay mensajes disponibles.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {mensajesFiltrados.map((mensaje) => (
            <MensajeCard key={mensaje.id} mensaje={mensaje} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ListaMensajes;
