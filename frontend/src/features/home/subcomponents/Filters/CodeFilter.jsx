const CodeFilter = ({ value, onChange }) => {
    return (
      <div>
        <label htmlFor="codigo" className="block text-sm font-medium text-gray-700 mb-1">
          Código de propiedad
        </label>
        <input
          type="text"
          id="codigo"
          name="codigo"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Ej: 0001, 0002"
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
    );
  };
  
  export default CodeFilter;