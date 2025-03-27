import Etiqueta from "../subcomponents/Etiqueta";
const PropiedadCard = ({ propiedad, onClick }) => {
  return (
    <div
      className="w-full max-w-sm rounded-xl overflow-hidden border border-gray-300 cursor-pointer drop-shadow-lg"
      onClick={onClick}
    >
      <img
        src={propiedad.imagenes[0]}
        alt={propiedad.nombre}
        className="w-full h-64 object-cover"
      />
      <div className="p-4">
        <h2 className="text-lg font-semibold">{propiedad.nombre}</h2>
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
