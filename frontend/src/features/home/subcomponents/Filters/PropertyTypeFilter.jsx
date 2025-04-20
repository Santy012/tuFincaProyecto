import React from 'react';

const PropertyTypeFilter = ({ value, onChange, options }) => {
  // Obtener nombres de etiquetas de tipo propiedad para validación
  const opcionesPropiedad = options.map(opt => opt.nombre);
  
  // Manejar cambio manteniendo solo una etiqueta de tipo propiedad
  const handleChange = (selectedNombre) => {
    // Filtrar etiquetas existentes del tipo propiedad
    const nuevasEtiquetas = value 
      ? [] // Si ya había una selección, la eliminamos primero
      : [];
    
    // Agregar nueva selección si no es "Todos"
    if (selectedNombre && selectedNombre !== "") {
      nuevasEtiquetas.push(selectedNombre);
    }
    
    onChange(nuevasEtiquetas);
  };

  return (
    <div>
      <h3 className="block text-sm font-medium text-gray-700 mb-1">Tipo de Propiedad</h3>
      <select
        value={value.length > 0 ? value[0] : ""}
        onChange={(e) => handleChange(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="">Todos los tipos</option>
        {options.map((option) => (
          <option key={option.nombre} value={option.nombre}>
            {option.nombre} ({option.count})
          </option>
        ))}
      </select>
    </div>
  );
};

export default PropertyTypeFilter;