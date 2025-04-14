import Etiqueta from "../../components/etiquetas/Etiqueta";

const PropiedadCard = ({ propiedad, onClick }) => {
  const isVideo = (media) => {
    if (!media) return false;
    
    // Si es un objeto File/Blob
    if (media instanceof File || media instanceof Blob) {
      return media.type.startsWith('video/');
    }
    
    // Si es un string (URL o DataURL)
    if (typeof media === 'string') {
      // Para DataURLs
      if (media.startsWith('data:')) {
        return media.split(';')[0].includes('video');
      }
      // Para URLs normales
      return media.match(/\.(mp4|webm|ogg|mov)$/i);
    }
    
    return false;
  };

  const getMediaSource = (media) => {
    const baseUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:8080";
    if (typeof media === "string") {
      return media.startsWith("/uploads") ? `${baseUrl}${media}` : media;
    }
    return URL.createObjectURL(media);
  };

  const firstMedia = propiedad.imagenes?.[0];

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
            <Etiqueta key={index} etiqueta={etiqueta}/>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PropiedadCard;