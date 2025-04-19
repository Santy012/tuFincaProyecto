import { useState } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";

const FiltroEtiquetas = ({
  etiquetasPropiedad = [],
  etiquetasCategoria = [],
  etiquetasSeleccionadas = [],
  setEtiquetasSeleccionadas,
  busquedas = {},
  setBusquedas,
  onApplyFilters
}) => {
  const [pestanaActiva, setPestanaActiva] = useState("tags");
  const [valoresInput, setValoresInput] = useState({
    nombre: busquedas.nombre || '',
    codigo: busquedas.codigo || ''
  });

  const toggleEtiqueta = (id) => {
    const nuevasEtiquetas = etiquetasSeleccionadas.includes(id)
      ? etiquetasSeleccionadas.filter(etiquetaId => etiquetaId !== id)
      : [...etiquetasSeleccionadas, id];
    
    setEtiquetasSeleccionadas(nuevasEtiquetas);
    // Aplicar filtros inmediatamente al cambiar etiquetas
    onApplyFilters({
      ...busquedas,
      etiquetas: nuevasEtiquetas
    });
  };

  const handleInputChange = (e, campo) => {
    setValoresInput(prev => ({
      ...prev,
      [campo]: e.target.value
    }));
  };

  const aplicarFiltro = (campo) => {
    const newBusquedas = {
      ...busquedas,
      [campo]: valoresInput[campo].trim()
    };
    setBusquedas(newBusquedas);
    onApplyFilters({
      ...newBusquedas,
      etiquetas: etiquetasSeleccionadas
    });
  };

  const limpiarFiltro = (campo) => {
    setValoresInput(prev => ({
      ...prev,
      [campo]: ''
    }));
    const newBusquedas = {
      ...busquedas,
      [campo]: ''
    };
    setBusquedas(newBusquedas);
    onApplyFilters({
      ...newBusquedas,
      etiquetas: etiquetasSeleccionadas
    });
  };

  const limpiarTodosFiltros = () => {
    setEtiquetasSeleccionadas([]);
    setValoresInput({
      nombre: '',
      codigo: ''
    });
    setBusquedas({
      nombre: '',
      codigo: '',
      estado: ''
    });
    onApplyFilters({
      nombre: '',
      codigo: '',
      estado: '',
      etiquetas: []
    });
  };

  return (
    <div className="w-full mb-6 bg-white p-4 rounded-lg shadow-md">
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
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Características</h3>
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

            {/* Botones de acción */}
            <div className="flex gap-2 mt-4 lg:mt-0">
              {(etiquetasSeleccionadas.length > 0 || busquedas.nombre || busquedas.codigo || busquedas.estado) && (
                <button
                  className="px-4 py-2 rounded-lg text-sm font-medium shadow-md bg-red-500 text-white hover:bg-red-600 transition-colors"
                  onClick={limpiarTodosFiltros}
                >
                  Limpiar todos
                </button>
              )}
            </div>
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
                value={busquedas.estado || ''}
                onChange={(e) => {
                  const newBusquedas = {
                    ...busquedas,
                    estado: e.target.value || undefined
                  };
                  setBusquedas(newBusquedas);
                  onApplyFilters({
                    ...newBusquedas,
                    etiquetas: etiquetasSeleccionadas
                  });
                }}
              >
                <option value="">Todos los estados</option>
                <option value="disponible">Disponible</option>
                <option value="vendido">Vendido</option>
                <option value="reservado">Reservado</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FiltroEtiquetas;