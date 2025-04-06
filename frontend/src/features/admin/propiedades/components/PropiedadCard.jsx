import Etiqueta from "../../components/etiquetas/Etiqueta";

const PropiedadCard = ({ propiedad, onClick }) => {
  const isVideo = (url) => {
    return typeof url === 'string' && url.match(/\.(mp4|webm|ogg)$/i);
  };

  const firstMedia = propiedad.imagenes?.[0];

  return (
    <div
      className="w-full max-w-sm rounded-xl overflow-hidden border border-gray-300 cursor-pointer drop-shadow-lg"
      onClick={onClick}
    >
      {firstMedia ? (
        isVideo(firstMedia) ? (
          <video
            src={firstMedia}
            className="w-full h-64 object-cover"
            autoPlay
            loop
            muted
            playsInline
          />
        ) : (
          <img
            src={firstMedia}
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
          {propiedad.etiquetas.map((etiqueta, index) => (
            <Etiqueta key={index} etiqueta={etiqueta}/>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PropiedadCard;