import { CheckCircle, XCircle } from "lucide-react";

const ResumenForm = ({ propiedadData, errors }) => {
  const hasErrors = Object.keys(errors).length > 0;

  const getFileName = (file) => {
    if (!file) return "Archivo sin nombre";
    if (typeof file === "string") {
      const parts = file.split("/");
      return parts[parts.length - 1] || "Archivo subido";
    }
    return file.name || "Archivo subido";
  };

  const isVideo = (file) => {
    if (!file) return false;
    if (file instanceof File || file instanceof Blob) {
      return file.type.startsWith("video/");
    }
    if (typeof file === "string") {
      if (file.startsWith("data:")) {
        return file.split(";")[0].includes("video");
      }
      return file.match(/\.(mp4|webm|ogg|mov)$/i);
    }
    if (file.url) {
      return file.tipo === "video";
    }
    return false;
  };

  const getMediaSource = (file) => {
    const baseUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:8080";

    if (file instanceof File || file instanceof Blob) {
      // Si es un archivo, usa URL.createObjectURL
      return URL.createObjectURL(file);
    } else if (file.url) {
      // Si ya tiene una URL, úsala directamente
      return file.url.startsWith("/uploads") ? `${baseUrl}${file.url}` : file.url;
    } else if (typeof file === "string") {
      // Si es una cadena, úsala directamente
      return file;
    }

    return ""; // Retorna una cadena vacía si no es válido
  };

  const renderField = (label, value, required = true) => (
    <div className="py-2 border-b border-gray-100">
      <h2 className="text-sm font-semibold text-gray-600">
        {label}
        {required && "*"}
      </h2>
      <p className={`mt-1 ${!value && required ? "text-red-500" : "text-gray-800"}`}>
        {value || (required ? "No ingresado" : "No especificado")}
      </p>
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-800">Resumen de la Propiedad</h1>
        <p className="text-gray-600 mt-1">Revisa toda la información antes de guardar.</p>
      </div>

      <div className="p-6">
        {hasErrors ? (
          <div className="mb-6 p-4 bg-red-50 rounded-lg border border-red-200">
            <div className="flex items-center text-red-700">
              <XCircle className="mr-2 flex-shrink-0" size={20} />
              <h3 className="font-medium">Faltan campos obligatorios</h3>
            </div>
            <ul className="mt-2 pl-7 space-y-1 text-red-600">
              {Object.entries(errors).map(([field, error]) => (
                <li key={field} className="list-disc">
                  {error}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center text-green-700">
              <CheckCircle className="mr-2 flex-shrink-0" size={20} />
              <h3 className="font-medium">Todos los campos obligatorios están completos</h3>
            </div>
          </div>
        )}

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              {renderField("Título", propiedadData.titulo)}
              {renderField("Código", propiedadData.codigo)}
              {renderField("Ubicación", propiedadData.ubicacion)}
            </div>
            <div className="space-y-2">
              {renderField("Estado", propiedadData.estado)}
              {renderField("Área Total (m²)", propiedadData.areaTotal)}
              {renderField("Área Construida (m²)", propiedadData.areaConstruida, false)}
            </div>
          </div>

          {renderField("Descripción", propiedadData.descripcion)}

          <div className="pt-2">
            <h2 className="text-sm font-semibold text-gray-600 mb-2">Etiquetas</h2>
            {propiedadData.etiquetas?.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {propiedadData.etiquetas.map((etiqueta, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-800 text-xs px-2.5 py-0.5 rounded-full"
                  >
                    {etiqueta}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No se han agregado etiquetas</p>
            )}
          </div>

          <div className="pt-2">
            <h2 className="text-sm font-semibold text-gray-600 mb-2">Multimedia</h2>
            {propiedadData.archivos?.length > 0 ? (
              <div>
                <p className="text-gray-700 mb-3">{propiedadData.archivos.length} archivos adjuntos</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {propiedadData.archivos.map((archivo, index) => (
                    <div
                      key={index}
                      className="relative h-28 rounded-md overflow-hidden border border-gray-200"
                    >
                      {isVideo(archivo) ? (
                        <video
                          src={getMediaSource(archivo)}
                          className="w-full h-full object-cover"
                          muted
                          loop
                        />
                      ) : (
                        <img
                          src={getMediaSource(archivo)}
                          alt="Vista previa"
                          className="w-full h-full object-cover"
                        />
                      )}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-1.5">
                        <p className="text-white text-xs truncate px-1">{getFileName(archivo)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-gray-500">No se han subido archivos</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumenForm;