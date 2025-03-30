import { useState } from "react";
import ListaTotalEtiquetas from "../propiedades/subcomponents/ListaTotalEtiquetas";
import ListaEtiquetas from "../propiedades/subcomponents/ListaEtiquetas";

const EtiquetasEstadoForm = ({ propiedadData, handleChange }) => {
  const etiquetasDisponibles = [
    "3 habitaciones", "2 baños", "Cerca del mar", "En Venta", "En Arriendo"
  ];

  const [etiquetasSeleccionadas, setEtiquetasSeleccionadas] = useState([]);

  const agregarEtiqueta = (etiqueta) => {
    setEtiquetasSeleccionadas((prev) => 
      prev.includes(etiqueta) ? prev : [...prev, etiqueta]
    );
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold">Etiquetas</h2>
      
      {/* Nuevo componente para mostrar y agregar etiquetas */}
      <ListaTotalEtiquetas 
        etiquetasDisponibles={etiquetasDisponibles.filter((e) => !etiquetasSeleccionadas.includes(e))} 
        agregarEtiqueta={agregarEtiqueta} 
      />

      {/* Sección de etiquetas seleccionadas */}
      <h3 className="text-lg font-semibold mt-4"></h3>    
      <ListaEtiquetas etiquetas={etiquetasSeleccionadas} setEtiquetas={setEtiquetasSeleccionadas} editando={true} mostrarAgregar={false} />
    </div>
  );
};

export default EtiquetasEstadoForm;
