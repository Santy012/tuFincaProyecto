import { useState, useEffect } from "react";

const MultimediaForm = ({ propiedadData, handleChange }) => {
  const [archivos, setArchivos] = useState(propiedadData.archivos || []);

  const isVideo = (file) => {
    if (!file) return false;
    if (file instanceof File || file instanceof Blob) {
      return file.type.startsWith("video/");
    }
    if (typeof file === "string") {
      return file.match(/\.(mp4|webm|ogg|mov)$/i);
    }
    if (file.url) {
      return file.tipo === "video";
    }
    return false;
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const nuevosArchivos = Array.from(e.target.files);
      setArchivos((prev) => [...prev, ...nuevosArchivos]);
    }
  };

  const removeFile = (index) => {
    setArchivos((prev) => prev.filter((_, i) => i !== index));
  };

  useEffect(() => {
    // Actualizar el estado del padre con los archivos
    handleChange("archivos", archivos);
  }, [archivos]);

  const getMediaSource = (file) => {
    const baseUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:8080";

    if (typeof file === "string") {
      return file;
    } else if (file instanceof File || file instanceof Blob) {
      return URL.createObjectURL(file);
    } else if (file.url) {
      return file.url.startsWith("/uploads") ? `${baseUrl}${file.url}` : file.url;
    }
    return "";
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold">Sube Imágenes o Videos</h2>
        <p className="text-gray-600 mt-1">Formatos soportados: JPG, PNG, MP4, WEBM</p>
      </div>

      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
        <label className="flex flex-col items-center justify-center cursor-pointer">
          <svg
            className="w-12 h-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            ></path>
          </svg>
          <input
            type="file"
            accept="image/*, video/*"
            multiple
            onChange={handleFileChange}
            className="hidden"
          />
          <span className="mt-2 text-sm font-medium text-gray-700">
            Haz clic para seleccionar archivos
          </span>
        </label>
      </div>

      {archivos.length > 0 && (
        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Vista previa de archivos</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {archivos.map((archivo, index) => (
              <div
                key={index}
                className="relative aspect-square rounded-md overflow-hidden border border-gray-200 group"
              >
                {isVideo(archivo) ? (
                  <div className="w-full h-full bg-black flex items-center justify-center">
                    <video
                      src={getMediaSource(archivo)}
                      className="max-w-full max-h-full"
                      muted
                      loop
                    />
                  </div>
                ) : (
                  <img
                    src={getMediaSource(archivo)}
                    alt="Vista previa"
                    className="w-full h-full object-cover"
                  />
                )}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(index);
                  }}
                  className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
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