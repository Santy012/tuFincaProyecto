import { useState } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";

const FiltroEtiquetas = ({ etiquetas, etiquetasSeleccionadas, setEtiquetasSeleccionadas, busquedas, setBusquedas }) => {
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
        <div className="flex flex-row gap-4 items-center">
          {/* Filtro por Nombre */}
          <div className="flex items-center gap-2 bg-gray-300 px-3 py-2 rounded-md flex-1">
            <input
              type="text"
              className="bg-transparent focus:outline-none w-full"
              placeholder="Por Nombre"
              value={valoresInput.nombre}
              onChange={(e) => handleInputChange(e, 'nombre')}
              onKeyPress={(e) => e.key === 'Enter' && aplicarFiltro('nombre')}
            />
            {busquedas.nombre ? (
              <FaTimes 
                className="text-blue-500 cursor-pointer" 
                onClick={() => limpiarFiltro('nombre')}
              />
            ) : (
              <FaSearch 
                className="text-blue-500 cursor-pointer" 
                onClick={() => aplicarFiltro('nombre')}
              />
            )}
          </div>

          {/* Filtro por Código */}
          <div className="flex items-center gap-2 bg-gray-300 px-3 py-2 rounded-md flex-1">
          <input
            type="text"
            className="bg-transparent focus:outline-none w-full"
            placeholder="Por Código"
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
                className="text-blue-500 cursor-pointer" 
                onClick={() => limpiarFiltro('codigo')}
              />
            ) : (
              <FaSearch 
                className="text-blue-500 cursor-pointer" 
                onClick={() => aplicarFiltro('codigo')}
              />
            )}
          </div>

          {/* Filtro por Estado */}
          <div className="flex items-center gap-2 bg-gray-300 px-3 py-2 rounded-md flex-1">
            <select
              className="bg-transparent focus:outline-none w-full text-gray-500"
              value={busquedas.estado}
              onChange={(e) => setBusquedas(prev => ({ ...prev, estado: e.target.value }))}
            >
              <option value="">Seleccionar Estado</option>
              <option value="En venta">En venta</option>
              <option value="Disponible">Disponible</option>
            </select>
        
          </div>
        </div>
      )}
    </div>
  );
};

export default FiltroEtiquetas;