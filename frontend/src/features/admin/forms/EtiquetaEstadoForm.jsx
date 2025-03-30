import { useState, useEffect } from "react";
import ListaTotalEtiquetas from "../components/etiquetas/ListaTotalEtiquetas";
import ListaEtiquetas from "../components/etiquetas/ListaEtiquetas";
import { useGlobalContext } from "../../../context/GlobalContext";

const EtiquetasEstadoForm = ({ propiedadData, handleChange }) => {
  const { etiquetas, setEtiquetas } = useGlobalContext();
  const etiquetasDisponibles = etiquetas.map(e => e.nombre);
  
  // Estado local para las etiquetas seleccionadas
  const [etiquetasSeleccionadas, setEtiquetasSeleccionadas] = useState(
    propiedadData.etiquetas || []
  );

  // Sincronizar con propiedadData cuando cambian las etiquetas seleccionadas
  useEffect(() => {
    handleChange('etiquetas', etiquetasSeleccionadas);
  }, [etiquetasSeleccionadas]);

  const agregarEtiqueta = (etiqueta) => {
    setEtiquetasSeleccionadas((prev) => 
      prev.includes(etiqueta) ? prev : [...prev, etiqueta]
    );
  };

  const eliminarEtiqueta = (etiqueta) => {
    setEtiquetasSeleccionadas((prev) => 
      prev.filter(e => e !== etiqueta)
    );
  };

  const agregarNuevaEtiqueta = (nombreEtiqueta) => {
    // Validar que no exista ya
    if (etiquetas.some(e => e.nombre.toLowerCase() === nombreEtiqueta.toLowerCase())) {
      alert("Esta etiqueta ya existe");
      return false; // Retorna false si ya existe
    }
  
    // Agregar al contexto global
    const nuevaEtiqueta = {
      id: Math.max(...etiquetas.map(e => e.id), 0) + 1,
      nombre: nombreEtiqueta
    };
    setEtiquetas([...etiquetas, nuevaEtiqueta]);
    
    // Agregar a las seleccionadas
    setEtiquetasSeleccionadas(prev => [...prev, nombreEtiqueta]);
    
    return true; // Retorna true si se agregó correctamente
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold">Etiquetas</h2>
      
      <ListaTotalEtiquetas 
        etiquetasDisponibles={etiquetasDisponibles.filter((e) => !etiquetasSeleccionadas.includes(e))} 
        agregarEtiqueta={agregarEtiqueta}
        agregarNuevaEtiqueta={agregarNuevaEtiqueta}
      />

      <h3 className="text-lg font-semibold mt-4">Etiquetas seleccionadas</h3>    
      <ListaEtiquetas 
        etiquetas={etiquetasSeleccionadas} 
        onRemove={eliminarEtiqueta}
        editando={true} 
        mostrarAgregar={false} 
      />
    </div>
  );
};

export default EtiquetasEstadoForm;