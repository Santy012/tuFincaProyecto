import { useState } from "react";
import PopUpMensaje from "../subcomponents/PopUpMensajes";
import PopUpConfirmar from "../../perfil/subcomponents/PopUpConfirmar";

const MensajeCard = ({ mensaje, setMensajes, propiedades, isSelected, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const propiedadRelacionada = mensaje.propiedad_id 
    ? propiedades.find(p => p.id === mensaje.propiedad_id)
    : null;

  const handleCardClick = (e) => {
    // Evitar que el click en el checkbox abra el popup
    if (e.target.type !== 'checkbox') {
      setIsOpen(true);
    }
  };

  const eliminarMensaje = () => {
    setMensajes(prev => prev.filter(msg => msg.id !== mensaje.id));
    setShowDeleteConfirm(false);
  };

  return (
    <>
      <div 
        className={`bg-white rounded-xl border overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer group relative ${
          isSelected ? "border-blue-500 border-2" : "border-gray-200"
        }`}
        onClick={handleCardClick}
      >
        <div className="absolute top-2 left-2">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={(e) => {
              e.stopPropagation();
              onSelect();
            }}
            className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
        
        <div className="p-5 pl-10">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                {mensaje.nombreCliente} {mensaje.apellidoCliente}
              </h3>
              <div className="flex gap-3 mt-1 text-sm text-gray-500">
                <span className="flex items-center">
                  <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/></svg>
                  {mensaje.celular}
                </span>
                {propiedadRelacionada && (
                  <span className="flex items-center bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full text-xs">
                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/></svg>
                    Prop: {propiedadRelacionada.codigo}
                  </span>
                )}
              </div>
            </div>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              mensaje.gestion === "porLeer" 
                ? "bg-red-100 text-red-800" 
                : "bg-green-100 text-green-800"
            }`}>
              {mensaje.gestion === "porLeer" ? "Por leer" : "Leído"}
            </span>
          </div>
          
          <p className="mt-3 text-gray-600 line-clamp-2">{mensaje.detalle}</p>
          
          <div className="mt-4 flex justify-between items-center">
            {propiedadRelacionada && (
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                Relacionado con: {propiedadRelacionada.titulo}
              </span>
            )}
            <button className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center">
              Ver completo
              <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"/></svg>
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <PopUpMensaje 
          mensaje={mensaje} 
          onClose={() => setIsOpen(false)} 
          setMensajes={setMensajes}
          propiedades={propiedades}
          onDelete={() => setShowDeleteConfirm(true)}
        />
      )}

      {showDeleteConfirm && (
        <PopUpConfirmar
          mensaje="¿Estás seguro que deseas eliminar este mensaje?"
          onConfirm={eliminarMensaje}
          onCancel={() => setShowDeleteConfirm(false)}
        />
      )}
    </>
  );
};

export default MensajeCard;