import { useState } from "react";

const PopUpMensaje = ({ mensaje, onClose, setMensajes, propiedades, onDelete }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [gestion, setGestion] = useState(mensaje.gestion);

  const propiedadRelacionada = mensaje.propiedad_id 
    ? propiedades.find(p => p.id === mensaje.propiedad_id)
    : null;

  // Función para formatear la fecha más detallada
  const formatFechaDetallada = (fechaString) => {
    const fecha = new Date(fechaString);
    return fecha.toLocaleDateString('es-ES', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const toggleEstado = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const nuevoEstado = gestion === "porLeer" ? "realizado" : "porLeer";
      setGestion(nuevoEstado);
      setMensajes(prev => prev.map(msg => 
        msg.id === mensaje.id ? { ...msg, gestion: nuevoEstado } : msg
      ));
      setIsProcessing(false);
    }, 500);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50 p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl p-6 max-w-lg w-full shadow-2xl border border-gray-100 transform transition-all duration-300 scale-95 hover:scale-100">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{mensaje.nombreCliente} {mensaje.apellidoCliente}</h2>
            <div className="flex flex-wrap gap-4 mt-1">
              <span className="flex items-center text-gray-500">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/></svg>
                {mensaje.celular}
              </span>
              <span className="flex items-center text-gray-500">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/></svg>
                {mensaje.correo}
              </span>
              <p className="text-sm text-gray-500 mt-1">
                Mensaje enviado el: {formatFechaDetallada(mensaje.fecha)}
              </p>
            </div>
           
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        {propiedadRelacionada && (
          <div className="mb-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
            <h3 className="font-medium text-gray-700 mb-1">Propiedad relacionada:</h3>
            <p className="text-gray-600">
              <span className="font-semibold">{propiedadRelacionada.codigo}</span> - {propiedadRelacionada.titulo}
            </p>
          </div>
        )}

        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h3 className="font-medium text-gray-700 mb-2">Mensaje:</h3>
          <p className="text-gray-700 whitespace-pre-line">{mensaje.detalle}</p>
        </div>

        <div className="flex justify-between">
          <button
            onClick={onDelete}
            className="px-4 py-2 rounded-lg text-white font-medium bg-red-600 hover:bg-red-700 transition shadow-md"
          >
            Eliminar mensaje
          </button>
          
          <button 
            onClick={toggleEstado} 
            disabled={isProcessing}
            className={`px-5 py-2.5 rounded-full text-white font-medium flex items-center transition-all
              ${isProcessing ? 'bg-gray-400' : gestion === 'porLeer' ? 'bg-emerald-500 hover:bg-emerald-600' : 'bg-amber-500 hover:bg-amber-600'}
              ${!isProcessing && 'shadow-md hover:shadow-lg'}`}
          >
            {isProcessing ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Procesando...
              </>
            ) : gestion === 'porLeer' ? (
              <>
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                Marcar como leído
              </>
            ) : (
              <>
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"/></svg>
                Marcar como no leído
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopUpMensaje;