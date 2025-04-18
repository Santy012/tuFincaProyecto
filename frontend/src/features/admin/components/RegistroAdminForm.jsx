import { useState } from "react";
import { motion } from "framer-motion";
import { useGlobalContext } from "../../../context/GlobalContext";
import LoadingSpinner from "../../../components/LoadingSpinner";
import ErrorMessage from "../../../components/ErrorMessage";
import MessageDialog from "../../../components/MessageDialog";
const RegistroAdminForm = () => {
  const { registerAdmin, errorAuth, loadingAuth } = useGlobalContext();
  const [formData, setFormData] = useState({
    nombre: "",
    usuario: "",
    correo: "",
    contraseña: "",
  });
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [showErrorDialog, setShowErrorDialog] = useState(false);
  const [customErrorMessage, setCustomErrorMessage] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.nombre.trim()) newErrors.nombre = "Nombre es requerido";
    if (!formData.usuario.trim()) newErrors.usuario = "Usuario es requerido";
    if (!formData.correo.trim()) {
      newErrors.correo = "Correo es requerido";
    } else if (!/\S+@\S+\.\S+/.test(formData.correo)) {
      newErrors.correo = "Correo no válido";
    }
    if (formData.contraseña.length < 4) {
      newErrors.contraseña = "Mínimo 4 caracteres";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
  
    try {
      await registerAdmin(formData);
      setFormData({ nombre: "", usuario: "", correo: "", contraseña: "" });
      setErrors({});
      setShowSuccessDialog(true); // <-- Aquí falta esta línea
    } catch (error) {
      setCustomErrorMessage("Error al registrar el administrador. Por favor intente nuevamente.");
      setShowErrorDialog(true);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-white p-6 sm:p-8 lg:p-10 rounded-xl shadow-lg mt-4 w-full max-w-5xl mx-auto"
    >
      <form onSubmit={handleSubmit} className="space-y-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
          {/* Campo Nombre */}
          <div>
            <label className="block text-base font-medium text-gray-800 mb-3">
              Nombre Completo
            </label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className={`w-full px-5 py-3 rounded-xl border-2 text-lg ${
                errors.nombre 
                  ? "border-red-500 focus:ring-red-200" 
                  : "border-gray-200 focus:ring-blue-200"
              } focus:ring-4 focus:border-transparent placeholder-gray-400`}
              placeholder="Ej: Juan Pérez"
              autoComplete="name"
            />
            {errors.nombre && (
              <p className="mt-2 text-base text-red-600">{errors.nombre}</p>
            )}
          </div>

          {/* Campo Usuario */}
          <div>
            <label className="block text-base font-medium text-gray-800 mb-3">
              Nombre de Usuario
            </label>
            <input
              type="text"
              name="usuario"
              value={formData.usuario}
              onChange={handleChange}
              className={`w-full px-5 py-3 rounded-xl border-2 text-lg ${
                errors.usuario 
                  ? "border-red-500 focus:ring-red-200" 
                  : "border-gray-200 focus:ring-blue-200"
              } focus:ring-4 focus:border-transparent placeholder-gray-400`}
              placeholder="Ej: juan.admin"
              autoComplete="username"
            />
            {errors.usuario && (
              <p className="mt-2 text-base text-red-600">{errors.usuario}</p>
            )}
          </div>

          {/* Campo Correo */}
          <div>
            <label className="block text-base font-medium text-gray-800 mb-3">
              Correo Electrónico
            </label>
            <input
              type="email"
              name="correo"
              value={formData.correo}
              onChange={handleChange}
              className={`w-full px-5 py-3 rounded-xl border-2 text-lg ${
                errors.correo 
                  ? "border-red-500 focus:ring-red-200" 
                  : "border-gray-200 focus:ring-blue-200"
              } focus:ring-4 focus:border-transparent placeholder-gray-400`}
              placeholder="Ej: juan@empresa.com"
              autoComplete="email"
            />
            {errors.correo && (
              <p className="mt-2 text-base text-red-600">{errors.correo}</p>
            )}
          </div>

          {/* Campo Contraseña */}
          <div>
            <label className="block text-base font-medium text-gray-800 mb-3">
              Contraseña
            </label>
            <input
              type="password"
              name="contraseña"
              value={formData.contraseña}
              onChange={handleChange}
              className={`w-full px-5 py-3 rounded-xl border-2 text-lg ${
                errors.contraseña 
                  ? "border-red-500 focus:ring-red-200" 
                  : "border-gray-200 focus:ring-blue-200"
              } focus:ring-4 focus:border-transparent placeholder-gray-400`}
              placeholder="Mínimo 4 caracteres"
              autoComplete="new-password"
            />
            {errors.contraseña && (
              <p className="mt-2 text-base text-red-600">{errors.contraseña}</p>
            )}
          </div>
        </div>

        {/* Mensajes de error */}
        {errorAuth && (
          <ErrorMessage 
            message={errorAuth} 
            className="mt-6 text-lg py-3"
          />
        )}

        {/* Botón de Registro */}
        <div className="mt-10">
          <button
            type="submit"
            disabled={loadingAuth}
            className="w-full bg-blue-600 text-white text-lg py-4 rounded-xl font-semibold hover:bg-blue-700 transition-all disabled:bg-blue-300 hover:shadow-lg focus:ring-4 focus:ring-blue-200 focus:ring-offset-2"
          >
            {loadingAuth ? (
              <LoadingSpinner size="medium" className="mx-auto" />
            ) : (
              "Registrar Administrador"
            )}
          </button>
        </div>
      </form>
    </motion.div>
    <MessageDialog
        isOpen={showSuccessDialog}
        type="success"
        message="¡Administrador registrado exitosamente!"
        confirmText="Aceptar"
        onConfirm={() => setShowSuccessDialog(false)}
      />

<MessageDialog
        isOpen={showErrorDialog || !!errorAuth}
        type="error"
        message={customErrorMessage || errorAuth}
        confirmText="Reintentar"
        cancelText="Cancelar"
        onConfirm={() => {
          setShowErrorDialog(false);
          handleSubmit(); // Reintentar envío del formulario
        }}
        onCancel={() => {
          setShowErrorDialog(false);
          // Si usas el error del contexto, necesitarías limpiarlo aquí
        }}
      />
    </>
  );
};

export default RegistroAdminForm;