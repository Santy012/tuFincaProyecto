const NameFilter = ({ value, onChange }) => {
    return (
      <div>
        <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">
          Nombre de propiedad
        </label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Ej: Casa en Guatavita"
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
    );
  };
  
  export default NameFilter;