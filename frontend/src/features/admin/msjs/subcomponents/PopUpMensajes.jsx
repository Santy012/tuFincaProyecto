import { useState } from "react";

const PopUpMensaje = ({ mensaje, onClose }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [gestion, setGestion] = useState(mensaje.gestion); // Estado local para reflejar cambios

  const toggleEstado = () => {
    setIsProcessing(true);

    setTimeout(() => {
      const nuevoEstado = gestion === "porLeer" ? "realizado" : "porLeer";
      setGestion(nuevoEstado);
      
      // 🚀 Aquí debe ir la función para actualizar el estado en el backend
      // actualizarEstadoMensaje(mensaje.id, nuevoEstado);

      setIsProcessing(false);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-md z-50 p-4">
      <div className="bg-white rounded-lg p-6 max-w-lg w-full shadow-xl">
        <h2 className="text-xl font-bold">{mensaje.nombreCliente} {mensaje.apellidoCliente}</h2>
        <p className="text-gray-600">{mensaje.celular} - {mensaje.correo}</p>
        <p className="text-black mt-4">{mensaje.detalle}</p>

        {/* Botones */}
        <div className="mt-6 flex justify-end space-x-4">
          <button 
            onClick={onClose} 
            className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
          >
            Cerrar
          </button>

          <button 
            onClick={toggleEstado} 
            disabled={isProcessing}
            className={`px-4 py-2 rounded-lg text-white transition 
              ${isProcessing ? "bg-gray-400 cursor-not-allowed" : "bg-green-500 hover:bg-green-600 active:scale-95"}`}
          >
            {isProcessing ? "Procesando..." : gestion === "porLeer" ? "Leído" : "Por leer"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopUpMensaje;
