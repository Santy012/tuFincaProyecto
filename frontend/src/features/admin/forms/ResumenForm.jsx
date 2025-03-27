const ResumenForm = ({ propiedadData }) => {
    return (
      <div className="p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold">Resumen de la Propiedad</h1>
        <p className="text-gray-600 mt-2">Verifica la información antes de enviar.</p>
  
        <div className="mt-4 space-y-4">
          <div>
            <h2 className="text-lg font-semibold">Título:</h2>
            <p className="text-gray-700">{propiedadData.titulo || "No ingresado"}</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold">Código:</h2>
            <p className="text-gray-700">{propiedadData.codigo || "No ingresado"}</p>
          </div>
  
          <div>
            <h2 className="text-lg font-semibold">Descripción:</h2>
            <p className="text-gray-700">{propiedadData.descripcion || "No ingresada"}</p>
          </div>
  
          <div>
            <h2 className="text-lg font-semibold">Ubicación:</h2>
            <p className="text-gray-700">{propiedadData.ubicacion || "No ingresada"}</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold">Area Total</h2>
            <p className="text-gray-700">{propiedadData.areaTotal || "No ingresada"} (m²)</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold">Area Construida</h2>
            <p className="text-gray-700">{propiedadData.areaConstruida || "No ingresada"} (m²)</p>
          </div>
  
          <div>
            <h2 className="text-lg font-semibold">Estado:</h2>
            <p className="text-gray-700">{propiedadData.estado || "No seleccionado"}</p>
          </div>
  
          <div>
            <h2 className="text-lg font-semibold">Etiquetas:</h2>
            {propiedadData.etiquetas.length > 0 ? (
              <ul className="list-disc pl-4 text-gray-700">
                {propiedadData.etiquetas.map((etiqueta, index) => (
                  <li key={index}>{etiqueta}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-700">No seleccionadas</p>
            )}
          </div>
  
          <div>
            <h2 className="text-lg font-semibold">Imágenes y Videos:</h2>
            {propiedadData.archivos.length > 0 ? (
              <ul className="list-disc pl-4 text-gray-700">
                {propiedadData.archivos.map((archivo, index) => (
                  <li key={index}>{archivo.name || "Archivo subido"}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-700">No subidos</p>
            )}
          </div>
        </div>
      </div>
    );
  };
  
  export default ResumenForm;
  