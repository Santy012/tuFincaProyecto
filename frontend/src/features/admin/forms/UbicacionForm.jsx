import { XCircle } from "lucide-react";

const UbicacionForm = ({ propiedadData, handleChange, errors }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold">Información de Ubicación y Área</h2>
      <p className="text-gray-600 mt-2">Especifica la ubicación y dimensiones de la propiedad.</p>

      <label className="block mt-4 text-gray-700">Ubicación</label>
      <input
        type="text"
        placeholder="Ej: Chía"
        value={propiedadData.ubicacion}
        onChange={(e) => handleChange("ubicacion", e.target.value)}
        className="w-full border border-gray-300 px-4 py-2 rounded-md mt-1"
      />

      <label className="block mt-4 text-gray-700">Área Total (m²)</label>
      <div className={`flex items-center border ${errors.areaTotal ? 'border-red-500' : 'border-gray-300'} rounded-md mt-1`}>
        <input
          type="number"
          placeholder="Ej: 150.5"
          value={propiedadData.areaTotal}
          onChange={(e) => {
            const value = e.target.value;
            if (value === '' || /^[0-9]*\.?[0-9]*$/.test(value)) {
              handleChange("areaTotal", value === '' ? '' : parseFloat(value));
            }
          }}
          onKeyPress={(e) => {
            if (!/[0-9.]/.test(e.key) && 
                e.key !== 'Backspace' && 
                e.key !== 'Delete' && 
                e.key !== 'ArrowLeft' && 
                e.key !== 'ArrowRight') {
              e.preventDefault();
            }
          }}
          className="w-full px-4 py-2 outline-none rounded-md appearance-none"
          required
          min="0"
          step="0.01"
        />
        <span className="px-3 text-gray-600">m²</span>
      </div>
      {errors.areaTotal && (
        <p className="mt-1 text-sm text-red-600 flex items-center">
          <XCircle className="mr-1" size={16} /> {errors.areaTotal}
        </p>
      )}

      <label className="block mt-4 text-gray-700">Área Construida (m²)</label>
      <div className="flex items-center border border-gray-300 rounded-md mt-1">
        <input
          type="number"
          placeholder="Ej: 120.75"
          value={propiedadData.areaConstruida}
          onChange={(e) => {
            const value = e.target.value;
            if (value === '' || /^[0-9]*\.?[0-9]*$/.test(value)) {
              handleChange("areaConstruida", value === '' ? '' : parseFloat(value));
            }
          }}
          onKeyPress={(e) => {
            if (!/[0-9.]/.test(e.key) && 
                e.key !== 'Backspace' && 
                e.key !== 'Delete' && 
                e.key !== 'ArrowLeft' && 
                e.key !== 'ArrowRight') {
              e.preventDefault();
            }
          }}
          className="w-full px-4 py-2 outline-none rounded-md appearance-none"
          min="0"
          step="0.01"
        />
        <span className="px-3 text-gray-600">m²</span>
      </div>
    </div>
  );
};

export default UbicacionForm;