const FilterButtons = ({ onReset, isLoading = false }) => {
  return (
    <div className="flex items-end gap-2 md:col-span-3">
      <button
        type="submit"
        disabled={isLoading}
        className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors ${
          isLoading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {isLoading ? 'Aplicando...' : 'Aplicar filtros'}
      </button>
      <button
        type="button"
        onClick={onReset}
        disabled={isLoading}
        className={`px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors ${
          isLoading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        Limpiar filtros
      </button>
    </div>
  );
};

export default FilterButtons;