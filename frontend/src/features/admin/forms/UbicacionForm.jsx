const UbicacionForm = ({ propiedadData, handleChange }) => {
    return (
      <div>
        <h2 className="text-xl font-semibold">Información de Ubicación y Área</h2>
        <p className="text-gray-600 mt-2">Especifica la ubicación y dimensiones de la propiedad.</p>
  
        {/* Campo de Ubicación */}
        <label className="block mt-4 text-gray-700">Ubicación</label>
        <input
          type="text"
          placeholder="Ej: Chía"
          value={propiedadData.ubicacion}
          onChange={(e) => handleChange("ubicacion", e.target.value)}
          className="w-full border border-gray-300 px-4 py-2 rounded-md mt-1"
          required
        />
  
        {/* Campo de Área Total */}
        <label className="block mt-4 text-gray-700">Área Total (m²)</label>
        <div className="flex items-center border border-gray-300 rounded-md mt-1">
        <input
            type="number"
            placeholder="Ej: 150"
            value={propiedadData.areaTotal}
            onChange={(e) => {
                const value = e.target.value;
                if (value === '' || /^[0-9]+$/.test(value)) {
                    handleChange("areaTotal", value);
                }
            }}
            onKeyPress={(e) => {
                if (!/[0-9]/.test(e.key)) {
                    e.preventDefault();
                }
            }}
            className="w-full px-4 py-2 outline-none rounded-md appearance-none"
            required
            min="0"
            step="1"
        />
          <span className="px-3 text-gray-600">m²</span>
        </div>
  
        {/* Campo de Área Construida */}
        <label className="block mt-4 text-gray-700">Área Construida (m²)</label>
        <div className="flex items-center border border-gray-300 rounded-md mt-1">
        <input
            type="number"
            placeholder="Ej: 120"
            value={propiedadData.areaConstruida}
            onChange={(e) => {
                const value = e.target.value;
                if (value === '' || /^[0-9]+$/.test(value)) {
                    handleChange("areaConstruida", value);
                }
            }}
            onKeyPress={(e) => {
                if (!/[0-9]/.test(e.key)) {
                    e.preventDefault();
                }
            }}
            className="w-full px-4 py-2 outline-none rounded-md appearance-none"
            required
            min="0"
            step="1"
        />
          <span className="px-3 text-gray-600">m²</span>
        </div>
      </div>
    );
  };
  
  export default UbicacionForm;
  