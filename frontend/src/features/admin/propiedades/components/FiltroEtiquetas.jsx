import { useState } from "react";
import { FaSearch } from "react-icons/fa";

const FiltroEtiquetas = ({ etiquetas, etiquetasSeleccionadas, setEtiquetasSeleccionadas, propiedades, setPropiedadesFiltradas }) => {
  const [pestanaActiva, setPestanaActiva] = useState("tags");
  const [busquedas, setBusquedas] = useState({ nombre: "", codigo: "", estado: "" });

  const toggleEtiqueta = (id) => {
    setEtiquetasSeleccionadas((prevSeleccionadas) =>
      prevSeleccionadas.includes(id)
        ? prevSeleccionadas.filter((etiquetaId) => etiquetaId !== id)
        : [...prevSeleccionadas, id]
    );
  };

  const buscarPorCodigo = () => {
    const resultado = propiedades.filter((propiedad) => propiedad.codigo === busquedas.codigo);
    setPropiedadesFiltradas(resultado);
  };

  const buscarPorEstado = (estado) => {
    const resultado = propiedades.filter((propiedad) => propiedad.estado === estado);
    setPropiedadesFiltradas(resultado);
  };

  return (
    <div className="w-full mb-6">
      {/* Pestañas */}
      <div className="flex border-b mb-4">
        <button
          className={`px-4 py-2 text-lg font-bold transition-colors duration-200 ${
            pestanaActiva === "tags" ? "text-blue-500 border-b-2 border-blue-500" : "text-gray-500"
          }`}
          onClick={() => setPestanaActiva("tags")}
        >
          Filtrado por Tags
        </button>
        <button
          className={`px-4 py-2 text-lg font-bold transition-colors duration-200 ${
            pestanaActiva === "busqueda" ? "text-blue-500 border-b-2 border-blue-500" : "text-gray-500"
          }`}
          onClick={() => setPestanaActiva("busqueda")}
        >
          Filtrado Específico
        </button>
      </div>

      {/* Contenido de las pestañas */}
      {pestanaActiva === "tags" ? (
        <div className="flex flex-wrap gap-2">
          {etiquetasSeleccionadas.length > 0 && (
            <button
              className="px-4 py-2 rounded-lg text-sm font-medium shadow-md bg-red-500 text-white"
              onClick={() => setEtiquetasSeleccionadas([])}
            >
              X
            </button>
          )}
          {etiquetas.map((etiqueta) => (
            <button
              key={etiqueta.id}
              className={`px-4 py-2 rounded-lg text-sm font-medium shadow-md transition-colors duration-200 ${
                etiquetasSeleccionadas.includes(etiqueta.id) ? "bg-blue-500 text-white" : "bg-gray-300"
              }`}
              onClick={() => toggleEtiqueta(etiqueta.id)}
            >
              {etiqueta.nombre}
            </button>
          ))}
        </div>
      ) : (
        <div className="flex gap-4">
          <div className="flex items-center gap-2 bg-gray-300 px-3 py-2 rounded-md">
            <input
              type="text"
              className="bg-transparent focus:outline-none"
              placeholder="Por Código"
              value={busquedas.codigo}
              onChange={(e) => setBusquedas({ ...busquedas, codigo: e.target.value })}
            />
            <button className="text-blue-500" onClick={buscarPorCodigo}>
              <FaSearch />
            </button>
          </div>
          <div className="flex items-center gap-2 bg-gray-300 px-3 py-2 rounded-md">
            <label className="text-gray-500">Seleccionar Estado</label>
            <select
              className="bg-transparent focus:outline-none"
              value={busquedas.estado}
              onChange={(e) => buscarPorEstado(e.target.value)}
            >
              <option value="">Seleccionar...</option>
              <option value="En Venta">En Venta</option>
              <option value="Disponible">Disponible</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default FiltroEtiquetas;
