import { useState, useEffect } from "react";
import ListaTotalEtiquetas from "../components/etiquetas/ListaTotalEtiquetas";
import ListaEtiquetas from "../components/etiquetas/ListaEtiquetas";
import PopUpEtiqueta from "../components/etiquetas/PopUpEtiqueta";
import { useGlobalContext } from "../../../context/GlobalContext";

const EtiquetasEstadoForm = ({ propiedadData, handleChange }) => {
  const { etiquetas, setEtiquetas } = useGlobalContext();
  const [etiquetasSeleccionadas, setEtiquetasSeleccionadas] = useState(
    propiedadData.etiquetas || []
  );
  const [mostrarPopup, setMostrarPopup] = useState(false);
  const etiquetasDisponibles = etiquetas.map(e => e.nombre);

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

  const eliminarEtiquetaDisponible = (nombreEtiqueta) => {
    setEtiquetas(prev => prev.filter(e => e.nombre !== nombreEtiqueta));
  };

  const agregarNuevaEtiqueta = async (nombreEtiqueta) => {
    // Validar que no exista ya
    if (etiquetas.some(e => e.nombre.toLowerCase() === nombreEtiqueta.toLowerCase())) {
      alert("Esta etiqueta ya existe");
      return false;
    }
  
    // Agregar al contexto global
    const nuevaEtiqueta = {
      id: Math.max(...etiquetas.map(e => e.id), 0) + 1,
      nombre: nombreEtiqueta
    };
    setEtiquetas([...etiquetas, nuevaEtiqueta]);
    
    // Agregar a las seleccionadas
    setEtiquetasSeleccionadas(prev => [...prev, nombreEtiqueta]);
    
    return true;
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold">Etiquetas</h2>
      
      <ListaTotalEtiquetas 
        etiquetasDisponibles={etiquetasDisponibles.filter((e) => !etiquetasSeleccionadas.includes(e))} 
        agregarEtiqueta={agregarEtiqueta}
        onAgregarNueva={() => setMostrarPopup(true)}
        eliminarEtiqueta={eliminarEtiquetaDisponible}
      />

      <h3 className="text-lg font-semibold mt-4">Etiquetas seleccionadas</h3>    
      <ListaEtiquetas 
        etiquetas={etiquetasSeleccionadas} 
        onRemove={eliminarEtiqueta}
        editando={true} 
        mostrarAgregar={false} 
      />

      {mostrarPopup && (
        <PopUpEtiqueta 
          cerrar={() => setMostrarPopup(false)}
          guardarEtiqueta={agregarNuevaEtiqueta}
        />
      )}
    </div>
  );
};

export default EtiquetasEstadoForm;