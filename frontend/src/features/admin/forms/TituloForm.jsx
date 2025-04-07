import { XCircle } from "lucide-react";

const TituloForm = ({ propiedadData, handleChange, errors }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold">Información de Título, Código y Descripción</h2>
      <p className="text-gray-600 mt-2">Ingresa los datos básicos de tu propiedad.</p>

      <label className="block mt-4 text-gray-700">Título</label>
      <input
        type="text"
        placeholder="Ej: Hermosa casa en el centro"
        value={propiedadData.titulo}
        onChange={(e) => handleChange("titulo", e.target.value)}
        className={`w-full border ${errors.titulo ? 'border-red-500' : 'border-gray-300'} px-4 py-2 rounded-md mt-1`}
        required
      />
      {errors.titulo && (
        <p className="mt-1 text-sm text-red-600 flex items-center">
          <XCircle className="mr-1" size={16} /> {errors.titulo}
        </p>
      )}

      <label className="block mt-4 text-gray-700">Código (único)</label>
      <input 
        type="number" 
        placeholder="Ingresa el código único de propiedad"
        value={propiedadData.codigo}
        onChange={(e) => {
          const value = e.target.value;
          if (value === '' || /^[0-9]+$/.test(value)) {
            handleChange("codigo", value);
          }
        }}
        onKeyPress={(e) => {
          if (!/[0-9]/.test(e.key)) {
            e.preventDefault();
          }
        }}
        className={`w-full border ${errors.codigo ? 'border-red-500' : 'border-gray-300'} px-4 py-2 rounded-md mt-1 appearance-none`}
        required
        min="0"
        step="1"
      />
      {errors.codigo && (
        <p className="mt-1 text-sm text-red-600 flex items-center">
          <XCircle className="mr-1" size={16} /> {errors.codigo}
        </p>
      )}

      <label className="block mt-4 text-gray-700">Descripción</label>
      <textarea
        rows="4"
        placeholder="Describe tu propiedad aquí..."
        value={propiedadData.descripcion}
        onChange={(e) => handleChange("descripcion", e.target.value)}
        className={`w-full border ${errors.descripcion ? 'border-red-500' : 'border-gray-300'} px-4 py-2 rounded-md mt-1`}
      ></textarea>
      {errors.descripcion && (
        <p className="mt-1 text-sm text-red-600 flex items-center">
          <XCircle className="mr-1" size={16} /> {errors.descripcion}
        </p>
      )}
    </div>
  );
};

export default TituloForm;