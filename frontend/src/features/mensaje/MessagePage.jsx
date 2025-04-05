import { useMessageForm } from "../../hooks/useMessageForm";
import Header from "../home/components/Header";
import Footer from "../home/components/Footer";
import FormInput from "./components/FormInput";
import FormTextarea from "./components/FormTextArea";
import UserIcon from "./components/UserIcon";


const MessagePage = () => {
  const {
    formData,
    formErrors,
    isSubmitting,
    submitSuccess,
    handleChange,
    handleSubmit
  } = useMessageForm();

  if (submitSuccess) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-xl shadow-2xl overflow-hidden transition-all duration-500 transform hover:scale-[1.01]">
            <div className="p-8 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-12 h-12 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                ¡Mensaje enviado!
              </h2>
              <p className="text-gray-600 mb-6">
                Gracias por contactarnos. Te responderemos pronto.
              </p>
              <div className="h-1 bg-gradient-to-r from-green-400 to-blue-500 rounded-full mx-auto w-24 mb-6"></div>
              <p className="text-sm text-gray-500">
                Serás redirigido automáticamente
              </p>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
            {/* Encabezado con degradado */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 sm:p-8 text-white">
              <h1 className="text-2xl sm:text-3xl font-bold">Contáctanos</h1>
              <p className="mt-2 opacity-90">
                Envíanos tus consultas y te responderemos a la brevedad
              </p>
            </div>

            {/* Formulario */}
            <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormInput
                  label="Nombre"
                  type="text"
                  id="nombreCliente"
                  name="nombreCliente"
                  value={formData.nombreCliente}
                  onChange={handleChange}
                  required
                  icon={<UserIcon />}
                  error={formErrors.nombreCliente}
                />

                <FormInput
                  label="Apellido"
                  type="text"
                  id="apellidoCliente"
                  name="apellidoCliente"
                  value={formData.apellidoCliente}
                  onChange={handleChange}
                  required
                  error={formErrors.apellidoCliente}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormInput
                  label="Celular"
                  type="tel"
                  id="celular"
                  name="celular"
                  value={formData.celular}
                  onChange={handleChange}
                  required
                  prepend={<span className="text-gray-500">+51</span>}
                  error={formErrors.celular}
                />

                <FormInput
                  label="Correo electrónico"
                  type="email"
                  id="correo"
                  name="correo"
                  value={formData.correo}
                  onChange={handleChange}
                  required
                  error={formErrors.correo}
                />
              </div>

              <FormInput
                label="Código de propiedad (opcional)"
                type="text"
                id="propiedad_id"
                name="propiedad_id"
                value={formData.propiedad_id}
                onChange={handleChange}
                placeholder="Ej: PROD-12345"
                error={formErrors.propiedad_id}
              />

              <FormTextarea
                label="Tu mensaje"
                id="detalle"
                name="detalle"
                value={formData.detalle}
                onChange={handleChange}
                required
                placeholder="Describe tu consulta con detalles..."
                error={formErrors.detalle}
              />

              {/* Botón de submit permanece igual */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full flex justify-center items-center py-3 px-6 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 ${
                    isSubmitting ? "opacity-80" : ""
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                      Enviando...
                    </>
                  ) : (
                    "Enviar mensaje"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MessagePage;
