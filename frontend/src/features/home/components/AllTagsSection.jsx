import { useGlobalContext } from "../../../context/GlobalContext";

const AllTagsSection = () => {
  const { etiquetas } = useGlobalContext();

  if (!etiquetas || etiquetas.length === 0) return null;

  return (
    <section className="bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Explora por características</h2>
        <div className="flex flex-wrap gap-3">
          {etiquetas.map(etiqueta => (
            <span
              key={etiqueta.id}
              className="inline-flex items-center bg-white border border-gray-200 text-gray-700 text-sm font-medium px-4 py-2 rounded-full shadow-sm hover:bg-blue-50 hover:border-blue-300 transition-colors cursor-pointer"
            >
              {etiqueta.nombre}
              <span className="bg-blue-100 text-blue-800 text-xs font-semibold ml-2 px-2 py-0.5 rounded-full">
                {etiqueta.id}
              </span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AllTagsSection;