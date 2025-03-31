const TagsFilterSection = ({ etiquetas, selectedTag, onTagClick }) => {
    return (
      <div className="mt-6">
        <h3 className="text-lg font-medium text-gray-800 mb-3">Filtrar por características</h3>
        <div className="flex flex-wrap gap-3">
          {etiquetas.map(etiqueta => (
            <button
              key={etiqueta.id}
              type="button"
              onClick={() => onTagClick(etiqueta.id)}
              className={`inline-flex items-center border text-sm font-medium px-4 py-2 rounded-full shadow-sm transition-colors cursor-pointer ${
                selectedTag === etiqueta.id
                  ? 'bg-blue-100 border-blue-300 text-blue-800'
                  : 'bg-white border-gray-200 text-gray-700 hover:bg-blue-50 hover:border-blue-300'
              }`}
            >
              {etiqueta.nombre}
              <span className={`ml-2 text-xs font-semibold px-2 py-0.5 rounded-full ${
                selectedTag === etiqueta.id
                  ? 'bg-blue-200 text-blue-900'
                  : 'bg-blue-100 text-blue-800'
              }`}>
                {etiqueta.id}
              </span>
            </button>
          ))}
        </div>
      </div>
    );
  };
  
  export default TagsFilterSection;