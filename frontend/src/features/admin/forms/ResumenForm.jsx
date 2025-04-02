import { CheckCircle, XCircle } from "lucide-react";

const ResumenForm = ({ propiedadData, errors }) => {
  const hasErrors = Object.keys(errors).length > 0;

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold">Resumen de la Propiedad</h1>
      <p className="text-gray-600 mt-2">Verifica la información antes de enviar.</p>

      {hasErrors ? (
        <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-500 rounded">
          <h3 className="text-red-700 font-medium flex items-center">
            <XCircle className="mr-2" size={20} />
            Faltan campos obligatorios:
          </h3>
          <ul className="list-disc pl-5 mt-2 text-red-600">
            {Object.entries(errors).map(([field, error]) => (
              <li key={field}>{error}</li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="mb-4 p-4 bg-green-50 border-l-4 border-green-500 rounded">
          <h3 className="text-green-700 font-medium flex items-center">
            <CheckCircle className="mr-2" size={20} />
            Todos los campos obligatorios están completados
          </h3>
        </div>
      )}

      <div className="mt-4 space-y-4">
        <div>
          <h2 className="text-lg font-semibold">Título:</h2>
          <p className={`${!propiedadData.titulo ? 'text-red-500' : 'text-gray-700'}`}>
            {propiedadData.titulo || "No ingresado"}
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold">Código:</h2>
          <p className={`${!propiedadData.codigo ? 'text-red-500' : 'text-gray-700'}`}>
            {propiedadData.codigo || "No ingresado"}
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold">Descripción:</h2>
          <p className={`${!propiedadData.descripcion ? 'text-red-500' : 'text-gray-700'}`}>
            {propiedadData.descripcion || "No ingresada"}
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold">Ubicación:</h2>
          <p className="text-gray-700">{propiedadData.ubicacion || "No ingresada"}</p>
        </div>

        <div>
          <h2 className="text-lg font-semibold">Área Total:</h2>
          <p className={`${!propiedadData.areaTotal ? 'text-red-500' : 'text-gray-700'}`}>
            {propiedadData.areaTotal || "No ingresada"} (m²)
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold">Área Construida:</h2>
          <p className="text-gray-700">
            {propiedadData.areaConstruida || "No ingresada"} (m²)
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold">Estado:</h2>
          <p className="text-gray-700">{propiedadData.estado || "No seleccionado"}</p>
        </div>

        <div>
          <h2 className="text-lg font-semibold">Etiquetas:</h2>
          {propiedadData.etiquetas.length > 0 ? (
            <ul className="list-disc pl-4 text-gray-700">
              {propiedadData.etiquetas.map((etiqueta, index) => (
                <li key={index}>{etiqueta}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-700">No seleccionadas</p>
          )}
        </div>

        <div>
          <h2 className="text-lg font-semibold">Imágenes y Videos:</h2>
          {propiedadData.archivos.length > 0 ? (
            <ul className="list-disc pl-4 text-gray-700">
              {propiedadData.archivos.map((archivo, index) => (
                <li key={index}>{archivo.name || "Archivo subido"}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-700">No subidos</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumenForm;