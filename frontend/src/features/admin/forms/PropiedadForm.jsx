import { useState, useEffect } from "react";
import TituloForm from "./TituloForm";
import UbicacionForm from "./UbicacionForm";
import EtiquetasEstadoForm from "./EtiquetaEstadoForm";
import MultimediaForm from "./MultiMediaForm";
import ResumenForm from "./ResumenForm";
import { useGlobalContext } from "../../../context/GlobalContext";

const steps = [
  "Título y Descripción",
  "Ubicación",
  "Etiquetas",
  "Imagenes y Videos",
  "Resumen",
];

const PropiedadForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const { setPropiedades, etiquetas } = useGlobalContext();
  const [propiedadData, setPropiedadData] = useState({
    titulo: "",
    descripcion: "",
    codigo: "",
    ubicacion: "",
    estado: "Disponible",
    etiquetas: [],
    archivos: [],
    areaTotal: "",
    areaConstruida: ""
  });

  const nextStep = () => {
    if (activeStep < steps.length - 1) setActiveStep(activeStep + 1);
  };

  const prevStep = () => {
    setActiveStep((prev) => Math.max(prev - 1, 0));
  };

  const handleChange = (campo, valor) => {
    setPropiedadData((prev) => ({ ...prev, [campo]: valor }));
  };

  const guardarPropiedad = () => {
    // Validación básica de campos requeridos
    if (!propiedadData.titulo || !propiedadData.descripcion || !propiedadData.codigo || !propiedadData.areaTotal) {
      alert("Por favor complete los campos obligatorios (Título, Descripción, Código y Área Total)");
      setActiveStep(0);
      return;
    }

    const etiquetasIds = propiedadData.etiquetas
      .map(nombre => {
        const etiqueta = etiquetas.find(e => e.nombre === nombre);
        return etiqueta ? etiqueta.id : null;
      })
      .filter(id => id !== null);

    // Crear objeto de propiedad con todos los datos
    const nuevaPropiedad = {
      ...propiedadData,
      id: Date.now(),
      imagenes: propiedadData.archivos.map(file => 
        typeof file === 'string' ? file : URL.createObjectURL(file)
      ),
      etiquetas: etiquetasIds,
      areaTotal: parseFloat(propiedadData.areaTotal) || 0,
      areaConstruida: parseFloat(propiedadData.areaConstruida) || null,
      estado: propiedadData.estado || "Disponible",
    };

    // Agregar al contexto global
    setPropiedades(prev => [...prev, nuevaPropiedad]);
    
    // Resetear el formulario
    alert("Propiedad guardada exitosamente!");
    setActiveStep(0);
    setPropiedadData({
      titulo: "",
      descripcion: "",
      codigo: "",
      ubicacion: "",
      estado: "Disponible",
      etiquetas: [],
      archivos: [],
      areaTotal: "",
      areaConstruida: ""
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Barra de navegación */}
      <div className="grid grid-cols-4 md:grid-cols-8 gap-2 bg-gray-100 p-4 rounded-lg shadow-md text-gray-600 text-sm">
        {steps.map((step, index) => (
          <button
            key={index}
            onClick={() => setActiveStep(index)}
            className={`py-2 px-3 rounded-md transition-all ${
              activeStep === index 
                ? "bg-blue-800 font-semibold text-white" 
                : "hover:bg-gray-200 font-medium cursor-pointer"
            }`}
          >
            {step}
          </button>
        ))}
      </div>

      {/* Contenido dinámico */}
      <div className="bg-white p-6 mt-4 rounded-lg shadow-md">
        {activeStep === 0 && (
          <TituloForm 
            propiedadData={propiedadData} 
            handleChange={handleChange} 
          />
        )}
        {activeStep === 1 && (
          <UbicacionForm 
            propiedadData={propiedadData} 
            handleChange={handleChange} 
          />
        )}
        {activeStep === 2 && (
          <EtiquetasEstadoForm 
            propiedadData={propiedadData} 
            handleChange={handleChange} 
          />
        )}
        {activeStep === 3 && (
          <MultimediaForm 
            propiedadData={propiedadData} 
            handleChange={handleChange} 
          />
        )}
        {activeStep === 4 && (
          <ResumenForm 
            propiedadData={propiedadData} 
          />
        )}

        <div className="flex justify-between mt-4">
          {/* Botón Anterior */}
          {activeStep > 0 && (
            <button
              onClick={prevStep}
              className="bg-gray-400 text-white px-6 py-3 rounded-md hover:bg-gray-500 cursor-pointer transition-all"
            >
              Anterior
            </button>
          )}

          {/* Espacio vacío para mantener el layout cuando no hay botón anterior */}
          {activeStep === 0 && <div></div>}

          {/* Botón Siguiente o Guardar */}
          {activeStep < steps.length - 1 ? (
            <button
              onClick={nextStep}
              className="bg-blue-800 text-white px-6 py-3 rounded-md hover:bg-blue-400 cursor-pointer transition-all"
            >
              Siguiente
            </button>
          ) : (
            <button
              onClick={guardarPropiedad}
              className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-500 cursor-pointer transition-all"
            >
              Guardar Propiedad
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropiedadForm;