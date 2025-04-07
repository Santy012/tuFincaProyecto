import { useState, useEffect } from "react";
import { CheckCircle, XCircle } from "lucide-react";
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
  const { propiedades, setPropiedades, etiquetas } = useGlobalContext();
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
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [codigoExistente, setCodigoExistente] = useState(false);

  const requiredFields = {
    titulo: "Título",
    descripcion: "Descripción",
    codigo: "Código",
    areaTotal: "Área Total"
  };

  const requiredFieldsByStep = {
    0: ['titulo', 'descripcion', 'codigo'], // TítuloForm
    1: ['areaTotal'], // UbicacionForm
    // Los demás pasos no tienen campos requeridos
  };

  const [formValido, setFormValido] = useState(false);

  // Validación en tiempo real
  useEffect(() => {
    const currentRequiredFields = requiredFieldsByStep[activeStep] || [];
    const newErrors = {};
    let hasErrors = false;

    // Validar campos requeridos del paso actual
    currentRequiredFields.forEach(field => {
      if (!propiedadData[field] || (typeof propiedadData[field] === 'string' && propiedadData[field].trim() === '')) {
        newErrors[field] = `${requiredFields[field]} es requerido`;
        hasErrors = true;
      }
    });

    // Validación especial para el código (solo en paso 0)
    if (activeStep === 0 && propiedadData.codigo && propiedadData.codigo.trim() !== '') {
      const codigoEnUso = propiedades.some(
        propiedad => propiedad.codigo === propiedadData.codigo
      );
      if (codigoEnUso) {
        newErrors.codigo = "Este código ya está en uso por otra propiedad";
        setCodigoExistente(true);
        hasErrors = true;
      } else {
        setCodigoExistente(false);
      }
    }

    setErrors(newErrors);
    setFormValido(!hasErrors && 
      (activeStep !== 0 || (propiedadData.codigo && propiedadData.codigo.trim() !== '')));
  }, [propiedadData, propiedades, activeStep]);

  const nextStep = () => {
    if (!formValido) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (activeStep < steps.length - 1) setActiveStep(activeStep + 1);
  };

  const prevStep = () => {
    setActiveStep((prev) => Math.max(prev - 1, 0));
  };

  const handleChange = (campo, valor) => {
    setPropiedadData((prev) => ({ ...prev, [campo]: valor }));
  };

  const guardarPropiedad = () => {
    if (Object.keys(errors).length > 0 || codigoExistente) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const etiquetasIds = propiedadData.etiquetas
      .map(nombre => {
        const etiqueta = etiquetas.find(e => e.nombre === nombre);
        return etiqueta ? etiqueta.id : null;
      })
      .filter(id => id !== null);

    const nuevaPropiedad = {
      ...propiedadData,
      id: Date.now(),
      imagenes: propiedadData.archivos,
      etiquetas: etiquetasIds,
      areaTotal: parseFloat(propiedadData.areaTotal) || 0,
      areaConstruida: parseFloat(propiedadData.areaConstruida) || null,
      estado: propiedadData.estado || "Disponible",
    };

    setPropiedades(prev => [...prev, nuevaPropiedad]);
    setShowSuccess(true);
    
    setTimeout(() => {
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
      setErrors({});
      setShowSuccess(false);
    }, 3000);
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
            errors={errors}
          />
        )}
        {activeStep === 1 && (
          <UbicacionForm 
            propiedadData={propiedadData} 
            handleChange={handleChange}
            errors={errors}
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
            errors={errors}
          />
        )}

        <div className="flex justify-between mt-4">
          {activeStep > 0 && (
            <button
              onClick={prevStep}
              className="bg-gray-400 text-white px-6 py-3 rounded-md hover:bg-gray-500 cursor-pointer transition-all"
            >
              Anterior
            </button>
          )}
          {activeStep === 0 && <div></div>}
          {activeStep < steps.length - 1 ? (
            <button
              onClick={nextStep}
              className={`${
                !formValido || (activeStep === 0 && codigoExistente)
                  ? 'bg-blue-400 cursor-not-allowed'
                  : 'bg-blue-800 hover:bg-blue-600 cursor-pointer'
              } text-white px-6 py-3 rounded-md transition-all`}
              disabled={!formValido || (activeStep === 0 && codigoExistente)}
            >
              Siguiente
            </button>
          ) : (
            <button
              onClick={guardarPropiedad}
              className={`${
                !formValido || codigoExistente
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-green-600 hover:bg-green-500 cursor-pointer'
              } text-white px-6 py-3 rounded-md transition-all`}
              disabled={!formValido || codigoExistente}
            >
              Guardar Propiedad
            </button>
          )}
        </div>
      </div>

      {/* Notificación de éxito */}
      {showSuccess && (
        <div className="fixed bottom-4 right-4 animate-fade-in-up">
          <div className="bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg flex items-center">
            <CheckCircle className="mr-2" size={24} />
            <div>
              <p className="font-semibold">¡Propiedad guardada!</p>
              <p className="text-sm">La propiedad se ha agregado correctamente.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropiedadForm;