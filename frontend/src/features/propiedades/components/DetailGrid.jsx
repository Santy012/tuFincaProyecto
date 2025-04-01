const DetailGrid = ({ propiedad, etiquetas }) => {
  // Función para formatear números con separadores de miles
  const formatNumber = (num) => {
    return num ? num.toLocaleString() : "N/A";
  };
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Columna izquierda - Descripción y características */}
      <div className="lg:col-span-2 space-y-8">
        {/* Descripción */}
        <section className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 border-b pb-2">
            Descripción
          </h2>
          <p className="text-gray-700 whitespace-pre-line leading-relaxed">
            {propiedad.descripcion || "No hay descripción disponible."}
          </p>
        </section>

        {/* Características */}
        <section className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 border-b pb-2">
            Características
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-gray-500 flex items-center">
                <svg
                  className="w-5 h-5 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                  />
                </svg>
                Área total
              </div>
              <div className="text-xl font-semibold mt-1">
                {formatNumber(propiedad.areaTotal)} m²
              </div>
            </div>

            {propiedad.areaConstruida && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-gray-500 flex items-center">
                  <svg
                    className="w-5 h-5 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                  Área construida
                </div>
                <div className="text-xl font-semibold mt-1">
                  {formatNumber(propiedad.areaConstruida)} m²
                </div>
              </div>
            )}

            {/* Puedes añadir más características aquí */}
          </div>
        </section>
      </div>

      {/* Columna derecha - Información de contacto y detalles */}
      <div className="space-y-6">
        {/* Panel de contacto */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">
            ¿Interesado en esta propiedad?
          </h3>

          <div className="space-y-4">

            <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg transition-colors font-medium flex items-center justify-center">
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              Enviar mensaje
            </button>
          </div>
        </div>

        {/* Etiquetas */}
        {propiedad.etiquetas && etiquetas && (
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              Características destacadas
            </h3>
            <div className="flex flex-wrap gap-3">
              {propiedad.etiquetas.map((etiquetaId) => {
                const etiqueta = etiquetas.find((e) => e.id === etiquetaId);
                return etiqueta ? (
                  <span
                    key={etiquetaId}
                    className="bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium flex items-center"
                  >
                    <svg
                      className="w-4 h-4 mr-1 text-blue-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {etiqueta.nombre}
                  </span>
                ) : null;
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailGrid;
