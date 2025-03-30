import { useState } from "react";
import PopUpMensaje from "../subcomponents/PopUpMensajes";

const MensajeCard = ({ mensaje }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Tarjeta del mensaje */}
      <div 
        className="w-full max-w-sm rounded-xl overflow-hidden border border-gray-300 shadow-lg p-4 cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        <h2 className="text-lg font-semibold">{mensaje.nombreCliente} {mensaje.apellidoCliente}</h2>
        <p className="text-gray-600">{mensaje.celular}</p>
        <p className="text-gray-600">{mensaje.correo}</p>
        
        {/* Texto truncado (máx. 2 líneas) */}
        <p className="text-black mt-2 line-clamp-2">{mensaje.detalle}</p>
        
        {/* Estado del mensaje */}
        <p className={`mt-4 text-sm font-bold ${mensaje.gestion === "porLeer" ? "text-red-500" : "text-green-500"}`}>
          {mensaje.gestion === "porLeer" ? "Por Leer" : "Realizado"}
        </p>
      </div>

      {/* Popup del mensaje */}
      {isOpen && <PopUpMensaje mensaje={mensaje} onClose={() => setIsOpen(false)} />}
    </>
  );
};

export default MensajeCard;
