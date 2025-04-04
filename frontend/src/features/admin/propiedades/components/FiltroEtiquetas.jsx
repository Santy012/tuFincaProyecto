import { useState } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";

const FiltroEtiquetas = ({
  etiquetasPropiedad,
  etiquetasCategoria,
  etiquetasSeleccionadas,
  setEtiquetasSeleccionadas,
  busquedas,
  setBusquedas
}) => {
  const [pestanaActiva, setPestanaActiva] = useState("tags");
  const [valoresInput, setValoresInput] = useState({
    nombre: '',
    codigo: ''
  });

  const toggleEtiqueta = (id) => {
    setEtiquetasSeleccionadas((prevSeleccionadas) =>
      prevSeleccionadas.includes(id)
        ? prevSeleccionadas.filter((etiquetaId) => etiquetaId !== id)
        : [...prevSeleccionadas, id]
    );
  };

  const handleInputChange = (e, campo) => {
    setValoresInput(prev => ({
      ...prev,
      [campo]: e.target.value
    }));
  };

  const aplicarFiltro = (campo) => {
    if (valoresInput[campo].trim() === '') return;
    setBusquedas(prev => ({
      ...prev,
      [campo]: valoresInput[campo]
    }));
  };

  const limpiarFiltro = (campo) => {
    setValoresInput(prev => ({
      ...prev,
      [campo]: ''
    }));
    setBusquedas(prev => ({
      ...prev,
      [campo]: ''
    }));
  };

  return (
    <div className="w-full mb-6">
      <div className="flex border-b mb-4">
        <button
          className={`px-4 py-2 text-lg font-bold transition-colors duration-200 ${
            pestanaActiva === "tags" 
              ? "text-blue-500 border-b-2 border-blue-500" 
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setPestanaActiva("tags")}
        >
          Filtrado por Tags
        </button>
        <button
          className={`px-4 py-2 text-lg font-bold transition-colors duration-200 ${
            pestanaActiva === "busqueda" 
              ? "text-blue-500 border-b-2 border-blue-500" 
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setPestanaActiva("busqueda")}
        >
          Filtrado Específico
        </button>
      </div>

      {pestanaActiva === "tags" ? (
        <div className="space-y-6">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Contenedor principal */}
            <div className="flex-1 flex flex-col lg:flex-row gap-8">
              {/* Sección Tipo de Propiedad */}
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Tipo de Propiedad</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {etiquetasPropiedad.map((etiqueta) => (
                    <button
                      key={etiqueta.id}
                      className={`px-4 py-2 text-center rounded-lg text-sm font-medium shadow-md transition-all duration-200 ${
                        etiquetasSeleccionadas.includes(etiqueta.id)
                          ? "bg-blue-500 text-white hover:bg-blue-600"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                      onClick={() => toggleEtiqueta(etiqueta.id)}
                    >
                      {etiqueta.nombre}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sección Características */}
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Características de Propiedad</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {etiquetasCategoria.map((etiqueta) => (
                    <button
                      key={etiqueta.id}
                      className={`px-4 py-2 text-center rounded-lg text-sm font-medium shadow-md transition-all duration-200 ${
                        etiquetasSeleccionadas.includes(etiqueta.id)
                          ? "bg-blue-500 text-white hover:bg-blue-600"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                      onClick={() => toggleEtiqueta(etiqueta.id)}
                    >
                      {etiqueta.nombre}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Botón Limpiar Filtros */}
            {etiquetasSeleccionadas.length > 0 && (
              <div className="lg:ml-auto mt-4 lg:mt-0">
                <button
                  className="px-4 py-2 rounded-lg text-sm font-medium shadow-md bg-red-500 text-white hover:bg-red-600 transition-colors"
                  onClick={() => setEtiquetasSeleccionadas([])}
                >
                  Limpiar filtros
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row gap-4 items-center">
          {/* Filtro por Nombre */}
          <div className="w-full md:flex-1">
            <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-md hover:bg-gray-200 transition-colors">
              <input
                type="text"
                className="bg-transparent focus:outline-none w-full"
                placeholder="Buscar por nombre"
                value={valoresInput.nombre}
                onChange={(e) => handleInputChange(e, 'nombre')}
                onKeyPress={(e) => e.key === 'Enter' && aplicarFiltro('nombre')}
              />
              {busquedas.nombre ? (
                <FaTimes 
                  className="text-blue-500 cursor-pointer hover:text-blue-600"
                  onClick={() => limpiarFiltro('nombre')}
                />
              ) : (
                <FaSearch 
                  className="text-blue-500 cursor-pointer hover:text-blue-600"
                  onClick={() => aplicarFiltro('nombre')}
                />
              )}
            </div>
          </div>

          {/* Filtro por Código */}
          <div className="w-full md:flex-1">
            <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-md hover:bg-gray-200 transition-colors">
              <input
                type="text"
                className="bg-transparent focus:outline-none w-full"
                placeholder="Buscar por código"
                value={valoresInput.codigo}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === '' || /^[0-9]+$/.test(value)) {
                    handleInputChange(e, 'codigo');
                  }
                }}
                onKeyPress={(e) => {
                  if (!/[0-9]/.test(e.key)) {
                    e.preventDefault();
                  }
                  if (e.key === 'Enter') aplicarFiltro('codigo');
                }}
              />
              {busquedas.codigo ? (
                <FaTimes 
                  className="text-blue-500 cursor-pointer hover:text-blue-600"
                  onClick={() => limpiarFiltro('codigo')}
                />
              ) : (
                <FaSearch 
                  className="text-blue-500 cursor-pointer hover:text-blue-600"
                  onClick={() => aplicarFiltro('codigo')}
                />
              )}
            </div>
          </div>

          {/* Filtro por Estado */}
          <div className="w-full md:flex-1">
            <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-md hover:bg-gray-200 transition-colors">
              <select
                className="bg-transparent focus:outline-none w-full text-gray-700"
                value={busquedas.estado}
                onChange={(e) => setBusquedas(prev => ({ ...prev, estado: e.target.value }))}
              >
                <option value="">Todos los estados</option>
                <option value="disponible">Disponible</option>
                <option value="reservado">Reservado</option>
                <option value="vendido">Vendido</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FiltroEtiquetas;