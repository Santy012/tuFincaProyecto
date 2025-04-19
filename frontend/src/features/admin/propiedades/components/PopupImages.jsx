import { motion } from "framer-motion";
import { X, Plus } from "lucide-react";
import { useGlobalContext } from "../../../../context/GlobalContext";
import { useState, useEffect } from "react";
import MessageDialog from "../../../../components/MessageDialog";

const PopupImages = ({
  imagenes,
  onClose,
  onAddImage,
  onRemoveImage,
  propiedadSeleccionada,
}) => {
  const { uploadMedia, deleteMedia } = useGlobalContext();
  const [localImages, setLocalImages] = useState(imagenes);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [mediaToDelete, setMediaToDelete] = useState({ index: null, id: null });

  useEffect(() => {
    setLocalImages(imagenes);
  }, [imagenes]);

  const isVideo = (file) => {
    if (!file) return false;

    // Si es un objeto File o Blob
    if (file instanceof File || file instanceof Blob) {
      return file.type.includes("video");
    }

    // Si es una cadena (URL)
    if (typeof file === "string") {
      return file.match(/\.(mp4|webm|ogg|mov)$/i);
    }

    // Si es un objeto con propiedad tipo o url
    if (typeof file === "object") {
      if (file.tipo) {
        return file.tipo === "video";
      }
      if (file.url) {
        return file.url.match(/\.(mp4|webm|ogg|mov)$/i);
      }
      if (file.mimeType) {
        return file.mimeType.includes("video");
      }
    }

    return false;
  };

  const getMediaSource = (media) => {
    const baseUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:8080";

    // Si es una cadena (URL)
    if (typeof media === "string") {
      return media.startsWith("/uploads") ? `${baseUrl}${media}` : media;
    }

    // Si es un objeto File o Blob
    if (media instanceof File || media instanceof Blob) {
      return URL.createObjectURL(media);
    }

    // Si es un objeto con propiedad url
    if (typeof media === "object" && media.url) {
      return media.url.startsWith("/uploads")
        ? `${baseUrl}${media.url}`
        : media.url;
    }

    console.error("Tipo de media no válido:", media);
    return null;
  };

  const renderMedia = (media) => {
    const source = getMediaSource(media);
    if (!source) {
      return (
        <div className="w-full h-40 bg-gray-200 rounded-lg flex items-center justify-center">
          <span className="text-gray-500">Media no disponible</span>
        </div>
      );
    }

    if (isVideo(media)) {
      return (
        <div className="w-full h-40 bg-gray-900 rounded-lg flex items-center justify-center">
          <video
            src={source}
            className="max-w-full max-h-full"
            controls
            autoPlay
            loop
            muted
            playsInline
          />
        </div>
      );
    } else {
      return (
        <img
          src={source}
          alt="Media"
          className="w-full h-40 object-cover rounded-lg shadow"
        />
      );
    }
  };

  const handleAddImages = async (files) => {
    if (!files || files.length === 0) return;

    try {
      setIsUploading(true);
      setUploadProgress(0);

      const propiedadId = propiedadSeleccionada.id;
      const responses = await uploadMedia(files, propiedadId, (progress) => {
        setUploadProgress(progress);
      });

      setLocalImages((prev) => [...prev, ...responses]);
      responses.forEach((response) => onAddImage(response));
      setSuccessMessage("Archivos subidos exitosamente!");
      setShowSuccess(true);
    } catch (error) {
      setErrorMessage(
        "Error al subir los archivos. Por favor, inténtalo de nuevo."
      );
      setShowError(true);
      console.error("Error al subir los archivos:", error);
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const handleDeleteImage = async (mediaId, index) => {
    try {
      await deleteMedia(mediaId);
      setLocalImages((prev) => prev.filter((_, i) => i !== index));
      onRemoveImage(index);
      setSuccessMessage("Imagen eliminada exitosamente.");
      setShowSuccess(true);
    } catch (error) {
      setErrorMessage(
        "Error al eliminar la imagen. Por favor, inténtalo de nuevo."
      );
      setShowError(true);
      console.error("Error al eliminar la imagen:", error);
    }
  };

  const confirmDelete = (mediaId, index) => {
    setMediaToDelete({ id: mediaId, index });
    setShowConfirmDelete(true);
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

        <h2 className="text-xl font-semibold mb-4">Galería de medios</h2>

        {/* Barra de progreso durante la subida */}
        {isUploading && (
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
            <div
              className="bg-blue-600 h-2.5 rounded-full"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          {localImages.length > 0 ? (
            localImages.map((media, index) => (
              <div key={index} className="relative group">
                {renderMedia(media)}
                <button
                  onClick={() => confirmDelete(media.id, index)}
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

          <label className="w-full h-40 flex flex-col items-center justify-center border-2 border-dashed border-gray-400 text-gray-600 rounded-lg shadow hover:bg-gray-100 transition cursor-pointer">
            <Plus size={40} />
            <span className="mt-2 text-sm">Subir archivos</span>
            <input
              type="file"
              accept="image/*,video/*"
              className="hidden"
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  handleAddImages(Array.from(e.target.files));
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
            disabled={isUploading}
          >
            {isUploading ? "Subiendo..." : "Guardar"}
          </button>
        </div>

        {/* Diálogos de mensajes */}
        <MessageDialog
          isOpen={showConfirmDelete}
          type="confirmation"
          message="¿Estás seguro de que deseas eliminar este archivo?"
          confirmText="Eliminar"
          cancelText="Cancelar"
          onConfirm={() => {
            setShowConfirmDelete(false);
            handleDeleteImage(mediaToDelete.id, mediaToDelete.index);
          }}
          onCancel={() => setShowConfirmDelete(false)}
        />

        <MessageDialog
          isOpen={showSuccess}
          type="success"
          message={successMessage}
          confirmText="Aceptar"
          onConfirm={() => setShowSuccess(false)}
        />

        <MessageDialog
          isOpen={showError}
          type="error"
          message={errorMessage}
          confirmText="Entendido"
          onConfirm={() => setShowError(false)}
        />
      </motion.div>
    </div>
  );
};

export default PopupImages;