import { useState, useEffect } from "react";
import { CheckCircle } from "lucide-react";
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
  const { propiedades, etiquetas, admin, crearPropiedad, loadingPropiedades } =
    useGlobalContext();
  const [propiedadData, setPropiedadData] = useState({
    titulo: "",
    descripcion: "",
    codigo: "",
    ubicacion: "",
    estado: "Disponible",
    etiquetas: [],
    archivos: [],
    areaTotal: "",
    areaConstruida: "",
  });
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [codigoExistente, setCodigoExistente] = useState(false);

  const requiredFields = {
    titulo: "Título",
    descripcion: "Descripción",
    codigo: "Código",
    areaTotal: "Área Total",
  };

  const requiredFieldsByStep = {
    0: ["titulo", "descripcion", "codigo"], // TítuloForm
    1: ["areaTotal"], // UbicacionForm
    // Los demás pasos no tienen campos requeridos
  };

  const [formValido, setFormValido] = useState(false);

  // Validación en tiempo real
  useEffect(() => {
    const currentRequiredFields = requiredFieldsByStep[activeStep] || [];
    const newErrors = {};
    let hasErrors = false;

    currentRequiredFields.forEach((field) => {
      if (
        !propiedadData[field] ||
        (typeof propiedadData[field] === "string" &&
          propiedadData[field].trim() === "")
      ) {
        newErrors[field] = `${requiredFields[field]} es requerido`;
        hasErrors = true;
      }
    });

    if (
      activeStep === 0 &&
      propiedadData.codigo &&
      propiedadData.codigo.trim() !== ""
    ) {
      // Validar que sea numérico
      if (isNaN(propiedadData.codigo)) {
        newErrors.codigo = "El código debe ser un número";
        hasErrors = true;
      }

      // Validar que no exista (comparando como número)
      const codigoEnUso = propiedades.some(
        (propiedad) => propiedad.codigo === parseInt(propiedadData.codigo)
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
    setFormValido(!hasErrors);
  }, [propiedadData, propiedades, activeStep]);

  const nextStep = () => {
    if (!formValido) {
      window.scrollTo({ top: 0, behavior: "smooth" });
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

  const guardarPropiedad = async () => {
    if (Object.keys(errors).length > 0 || codigoExistente) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    try {
      // Preparar las etiquetas como objetos con id y nombre
      const etiquetasCompletas = propiedadData.etiquetas
        .map((nombre) => {
          const etiqueta = etiquetas.find((e) => e.nombre === nombre);
          return etiqueta ? { id: etiqueta.id, nombre: etiqueta.nombre } : null;
        })
        .filter((etq) => etq !== null);

      // Preparar los medios (imágenes/videos)
      const medias = propiedadData.archivos.map((url, index) => ({
        id: index,
        url,
        tipo: url.match(/\.(jpg|jpeg|png|gif)$/i) ? "imagen" : "video",
      }));

      // Crear el objeto para la API
      const propiedadParaAPI = {
        titulo: propiedadData.titulo,
        codigo: parseInt(propiedadData.codigo) || 0,
        descripcion: propiedadData.descripcion,
        areaTotal: parseFloat(propiedadData.areaTotal) || 0,
        areaConst: parseFloat(propiedadData.areaConstruida) || 0,
        ubicacion: propiedadData.ubicacion,
        estado: propiedadData.estado.toLowerCase(),
        administradorId: admin?.id || 0,  // Solo enviamos el ID
        etiquetas: etiquetasCompletas,
        medias: medias,
        mensajes: [] // Inicialmente vacío
      };

      // Llamar a la función del contexto
      await crearPropiedad(propiedadParaAPI);

      // Mostrar mensaje de éxito
      setShowSuccess(true);

      // Resetear el formulario
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
          areaConstruida: "",
        });
        setErrors({});
        setShowSuccess(false);
      }, 3000);
    } catch (error) {
      console.error("Error al guardar la propiedad:", error);
      setErrors({
        general:
          "Ocurrió un error al guardar la propiedad. Por favor intenta nuevamente.",
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
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
          <ResumenForm propiedadData={propiedadData} errors={errors} />
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
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-800 hover:bg-blue-600 cursor-pointer"
              } text-white px-6 py-3 rounded-md transition-all`}
              disabled={!formValido || (activeStep === 0 && codigoExistente)}
            >
              Siguiente
            </button>
          ) : (
            <button
              onClick={guardarPropiedad}
              disabled={!formValido || codigoExistente || loadingPropiedades}
              className={`${
                !formValido || codigoExistente || loadingPropiedades
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-500 cursor-pointer"
              } text-white px-6 py-3 rounded-md transition-all flex items-center justify-center`}
            >
              {loadingPropiedades ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Guardando...
                </span>
              ) : (
                "Guardar Propiedad"
              )}
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
              <p className="text-sm">
                La propiedad se ha agregado correctamente.
              </p>
            </div>
          </div>
        </div>
      )}
      {errors.general && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-md">
          {errors.general}
        </div>
      )}
    </div>
  );
};

export default PropiedadForm;
