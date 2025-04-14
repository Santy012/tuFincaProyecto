import Etiqueta from "../../components/etiquetas/Etiqueta";

const PropiedadCard = ({ propiedad, onClick }) => {
  const isVideo = (media) => {
    return media?.tipo === "video";
  };

  const getMediaSource = (media) => {
    const baseUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:8080";

    if (media?.url) {
      return media.url.startsWith("/uploads") ? `${baseUrl}${media.url}` : media.url;
    }

    console.error("Media no tiene una URL válida:", media);
    return null;
  };

  const firstMedia = propiedad.imagenes?.[0]; // Ahora es un objeto completo

  return (
    <div
      className="w-full max-w-sm rounded-xl overflow-hidden border border-gray-300 cursor-pointer drop-shadow-lg hover:shadow-lg transition-shadow"
      onClick={onClick}
    >
      {firstMedia ? (
        isVideo(firstMedia) ? (
          <div className="w-full h-64 bg-gray-900 flex items-center justify-center">
            <video
              src={getMediaSource(firstMedia)}
              className="max-w-full max-h-full"
              autoPlay
              loop
              muted
              playsInline
            />
          </div>
        ) : (
          <img
            src={getMediaSource(firstMedia)}
            alt={propiedad.titulo}
            className="w-full h-64 object-cover"
          />
        )
      ) : (
        <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
          <span className="text-gray-500">Sin medios</span>
        </div>
      )}
      <div className="p-4">
        <h2 className="text-lg font-semibold">{propiedad.titulo}</h2>
        <p className="text-gray-600">{propiedad.ubicacion}</p>
        <p className="text-black text-sm">{propiedad.estado}</p>
        <p className="text-black font-bold text-lg">{propiedad.precio}</p>
        <div className="flex flex-wrap gap-2 mt-3">
          {propiedad.etiquetas?.map((etiqueta, index) => (
            <Etiqueta key={index} etiqueta={etiqueta} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PropiedadCard;
