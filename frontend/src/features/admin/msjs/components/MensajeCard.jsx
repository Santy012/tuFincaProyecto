const MensajeCard = ({ mensaje }) => {
    return (
      <div className="w-full max-w-sm rounded-xl overflow-hidden border border-gray-300 shadow-lg p-4">
        <h2 className="text-lg font-semibold">{mensaje.nombreCliente} {mensaje.apellidoCliente}</h2>
        <p className="text-gray-600">{mensaje.celular}</p>
        <p className="text-gray-600">{mensaje.correo}</p>
        <p className="text-black mt-2">{mensaje.detalle}</p>
        
        {/* Indicador de estado */}
        <p className={`mt-4 text-sm font-bold ${mensaje.gestion === "porLeer" ? "text-red-500" : "text-green-500"}`}>
          {mensaje.gestion === "porLeer" ? "Por Leer" : "Realizado"}
        </p>
      </div>
    );
  };
  
  export default MensajeCard;
  