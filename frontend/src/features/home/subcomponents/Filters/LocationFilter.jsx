const LocationFilter = ({ value, ubicaciones, onChange }) => {
    return (
      <div>
        <label htmlFor="ubicacion" className="block text-sm font-medium text-gray-700 mb-1">
          Ubicación
        </label>
        <select
          id="ubicacion"
          name="ubicacion"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Todas las ubicaciones</option>
          {ubicaciones.map((ubicacion, index) => (
            <option key={index} value={ubicacion}>
              {ubicacion}
            </option>
          ))}
        </select>
      </div>
    );
  };
  
  export default LocationFilter;