import { motion } from "framer-motion";
import { X, Plus } from "lucide-react";
import { useGlobalContext } from "../../../../context/GlobalContext";
import { useState, useEffect } from "react";

const PopupImages = ({ imagenes, onClose, onAddImage, onRemoveImage, propiedadSeleccionada }) => {
  const { uploadMedia, deleteMedia } = useGlobalContext();
  const [localImages, setLocalImages] = useState(imagenes); // Estado local para manejar las imágenes

  useEffect(() => {
    setLocalImages(imagenes); // Sincroniza el estado local con las imágenes recibidas como prop
  }, [imagenes]);

  const isVideo = (file) => {
    if (!file) return false;

    if (file instanceof File || file instanceof Blob) {
      return file.type.includes("video");
    }

    if (typeof file === "string") {
      if (file.startsWith("data:")) {
        return file.split(";")[0].includes("video");
      }
      return file.match(/\.(mp4|webm|ogg|mov)$/i);
    }

    return false;
  };

  const getMediaSource = (media) => {
    const baseUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:8080";

    if (typeof media === "string") {
      return media.startsWith("/uploads") ? `${baseUrl}${media}` : media;
    }

    if (media instanceof File || media instanceof Blob) {
      return URL.createObjectURL(media);
    }

    if (typeof media === "object" && media.url) {
      return media.url.startsWith("/uploads") ? `${baseUrl}${media.url}` : media.url;
    }

    console.error("Tipo de media no válido:", media);
    return null;
  };

  const handleAddImage = async (archivo) => {
    if (archivo instanceof File || archivo instanceof Blob) {
      try {
        const propiedadId = propiedadSeleccionada.id;
        const response = await uploadMedia([archivo], propiedadId);

        setLocalImages((prev) => [...prev, response[0]]); // Actualiza el estado local
        onAddImage(response[0]); // Propaga el cambio al componente padre
      } catch (error) {
        console.error("Error al subir el archivo:", error);
        alert("Hubo un error al subir el archivo. Por favor, inténtalo de nuevo.");
      }
    } else {
      console.error("Archivo no válido:", archivo);
    }
  };

  const handleDeleteImage = async (mediaId, index) => {
    const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar esta imagen?");
    if (!confirmDelete) return;

    try {
      await deleteMedia(mediaId); // Llama a la función para eliminar la media en el backend
      setLocalImages((prev) => prev.filter((_, i) => i !== index)); // Actualiza el estado local
      onRemoveImage(index); // Propaga el cambio al componente padre
      alert("Imagen eliminada exitosamente.");
    } catch (error) {
      console.error("Error al eliminar la imagen:", error);
      alert("Hubo un error al eliminar la imagen. Por favor, inténtalo de nuevo.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-md z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="relative bg-white p-6 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[80vh] overflow-y-auto"
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 cursor-pointer z-10 transition"
        >
          <X size={24} />
        </button>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          {localImages.length > 0 ? (
            localImages.map((media, index) => (
              <div key={index} className="relative group">
                {isVideo(media) ? (
                  <video
                    src={getMediaSource(media)}
                    className="w-full h-40 object-cover rounded-lg shadow"
                    controls
                    autoPlay
                    loop
                    muted
                  />
                ) : (
                  <img
                    src={getMediaSource(media)}
                    alt={`Media ${index + 1}`}
                    className="w-full h-40 object-cover rounded-lg shadow"
                  />
                )}
                <button
                  onClick={() => handleDeleteImage(media.id, index)}
                  className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
                >
                  <X size={16} />
                </button>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">
              No hay medios disponibles
            </p>
          )}

          <label className="w-full h-40 flex items-center justify-center border-2 border-dashed border-gray-400 text-gray-600 rounded-lg shadow hover:bg-gray-100 transition cursor-pointer">
            <Plus size={40} />
            <input
              type="file"
              accept="image/*,video/*"
              className="hidden"
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  handleAddImage(e.target.files[0]);
                }
              }}
              multiple
            />
          </label>
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
          >
            Guardar
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default PopupImages;