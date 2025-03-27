import { useState, useEffect } from "react";

const MultimediaForm = ({ propiedadData, handleChange }) => {
  const [archivos, setArchivos] = useState(propiedadData.archivos || []);

  // Manejo de selección de archivos
  const handleFileChange = (e) => {
    const nuevosArchivos = Array.from(e.target.files);
    setArchivos((prev) => [...prev, ...nuevosArchivos]);
  };

  // Eliminar archivo de la lista
  const removeFile = (index) => {
    setArchivos((prev) => prev.filter((_, i) => i !== index));
  };

  // Sincronizar cambios en propiedadData
  useEffect(() => {
    handleChange("archivos", archivos);
  }, [archivos]);

  return (
    <div>
      <h2 className="text-xl font-semibold">Sube Imágenes o Videos</h2>
      <p className="text-gray-600 mt-2">Adjunta archivos para mostrar tu propiedad.</p>

      {/* Input para subir archivos */}
      <input
        type="file"
        accept="image/png, image/jpeg, video/mp4, video/quicktime"
        multiple
        onChange={handleFileChange}
        className="w-full border border-gray-300 px-4 py-2 rounded-md mt-2 cursor-pointer"
      />

      {/* Vista previa de archivos */}
      {archivos.length > 0 && (
        <div className="mt-4">
          <p className="text-gray-700 font-semibold">Vista previa:</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
            {archivos.map((archivo, index) => (
              <div key={index} className="relative">
                {archivo.type.startsWith("image/") ? (
                  <img
                    src={URL.createObjectURL(archivo)}
                    alt="Vista previa"
                    className="w-full h-32 object-cover rounded-md shadow-md"
                  />
                ) : (
                  <video controls className="w-full h-32 rounded-md shadow-md">
                    <source src={URL.createObjectURL(archivo)} type={archivo.type} />
                  </video>
                )}
                <button
                  onClick={() => removeFile(index)}
                  className="absolute top-0 cursor-pointer right-1 bg-red-600 text-white text-xs px-2 py-1 rounded-full"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MultimediaForm;
