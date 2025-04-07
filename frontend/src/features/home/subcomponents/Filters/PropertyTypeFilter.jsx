import React from 'react';

const PropertyTypeFilter = ({ value, onChange, options }) => {
  return (
    <div>
      <h3 className="block text-sm font-medium text-gray-700 mb-1">Tipo de Propiedad</h3>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="">Todos los tipos</option>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.nombre} ({option.count})
          </option>
        ))}
      </select>
    </div>
  );
};

export default PropertyTypeFilter;