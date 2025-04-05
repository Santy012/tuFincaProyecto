import { useState } from "react";
import Header from "../home/components/Header";
import Footer from "../home/components/Footer";
import { Link } from "react-router-dom";
import {
  FaBalanceScale,
  FaFileContract,
  FaNotEqual,
  FaHome,
} from "react-icons/fa";

const ServiciosJuridicosPage = () => {
  const [activeService, setActiveService] = useState(0);

  const servicios = [
    {
      id: 1,
      titulo: "Asesoría en compra y venta de propiedades",
      icono: <FaHome className="text-3xl text-blue-600" />,
      descripcion:
        "Brindamos asesoramiento legal integral en todas las etapas de transacciones inmobiliarias para garantizar operaciones seguras y transparentes.",
      detalles: [
        "Revisión y elaboración de contratos de compraventa",
        "Verificación de antecedentes de la propiedad",
        "Asesoría en negociaciones y acuerdos",
        "Protección de derechos del comprador/vendedor",
        "Coordinación con notarías y registros públicos",
      ],
      proceso: [
        "Evaluación inicial de la transacción",
        "Due diligence legal",
        "Elaboración de documentos",
        "Acompañamiento en firma de escrituras",
        "Seguimiento post-venta",
      ],
    },
    {
      id: 2,
      titulo: "Estudio de títulos y seguridad jurídica",
      icono: <FaFileContract className="text-3xl text-green-600" />,
      descripcion:
        "Análisis exhaustivo de la historia jurídica de propiedades para identificar riesgos y garantizar la legitimidad de los derechos.",
      detalles: [
        "Verificación de cadena de titularidad",
        "Identificación de gravámenes o embargos",
        "Análisis de posibles litigios o controversias",
        "Revisión de licencias urbanísticas",
        "Confirmación de deudas municipales o tributarias",
      ],
      proceso: [
        "Obtención de certificados registrales",
        "Análisis documental completo",
        "Elaboración de informe de titularidad",
        "Recomendaciones para saneamiento",
        "Certificación de seguridad jurídica",
      ],
    },
    {
      id: 3,
      titulo: "Trámites notariales y registros públicos",
      icono: <FaNotEqual className="text-3xl text-purple-600" />,
      descripcion:
        "Gestión profesional de todos los procedimientos ante notarías y el Registro de Predios para garantizar la validez legal de sus documentos.",
      detalles: [
        "Inscripción de escrituras públicas",
        "Actualización de registros de propiedad",
        "Legalización de poderes y autorizaciones",
        "Tramitación de certificados registrales",
        "Gestión de rectificaciones registrales",
      ],
      proceso: [
        "Revisión de requisitos documentarios",
        "Elaboración de memoriales y solicitudes",
        "Presentación ante entidades competentes",
        "Seguimiento de trámites",
        "Entrega de documentos finalizados",
      ],
    },
    {
      id: 4,
      titulo: "Legalización de propiedades",
      icono: <FaBalanceScale className="text-3xl text-orange-600" />,
      descripcion:
        "Regularización de propiedades informales o con documentación incompleta para obtener reconocimiento legal y registral.",
      detalles: [
        "Procedimientos de saneamiento físico legal",
        "Obtención de licencias de edificación",
        "Tramitación de declaratorias de fábrica",
        "Solución de controversias de linderos",
        "Procesos de prescripción adquisitiva",
      ],
      proceso: [
        "Diagnóstico de situación jurídica",
        "Elaboración de plan de regularización",
        "Recopilación y organización de evidencias",
        "Presentación ante municipalidades y SUNARP",
        "Obtención de título de propiedad",
      ],
    },
  ];

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Encabezado */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
              Servicios Jurídicos Inmobiliarios
            </h1>
            <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
              Soluciones legales especializadas para proteger sus inversiones
              inmobiliarias
            </p>
          </div>

          {/* Versión móvil - Selector */}
          <div className="lg:hidden mb-8">
            <label htmlFor="servicio-select" className="sr-only">
              Selecciona un servicio
            </label>
            <select
              id="servicio-select"
              className="block w-full pl-3 pr-10 py-3 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-lg"
              value={activeService}
              onChange={(e) => setActiveService(Number(e.target.value))}
            >
              {servicios.map((servicio, index) => (
                <option key={servicio.id} value={index}>
                  {servicio.titulo}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Navegación lateral - Desktop */}
            <div className="hidden lg:block w-80 flex-shrink-0">
              <nav className="space-y-2">
                {servicios.map((servicio, index) => (
                  <button
                    key={servicio.id}
                    onClick={() => setActiveService(index)}
                    className={`w-full text-left px-6 py-4 rounded-lg text-md font-medium transition-colors flex items-center ${
                      activeService === index
                        ? "bg-blue-50 border-l-4 border-blue-600 text-blue-700"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <span className="mr-4">{servicio.icono}</span>
                    {servicio.titulo}
                  </button>
                ))}
              </nav>
            </div>

            {/* Contenido del servicio seleccionado */}
            <div className="flex-1 bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-8">
                <div className="flex items-center mb-6">
                  <div className="mr-4 p-3 bg-blue-50 rounded-full">
                    {servicios[activeService].icono}
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900">
                    {servicios[activeService].titulo}
                  </h2>
                </div>

                <p className="text-lg text-gray-600 mb-8">
                  {servicios[activeService].descripcion}
                </p>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b">
                      Servicios Incluidos
                    </h3>
                    <ul className="space-y-3">
                      {servicios[activeService].detalles.map((detalle, i) => (
                        <li key={i} className="flex items-start">
                          <svg
                            className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0"
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
                          <span className="text-gray-700">{detalle}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b">
                      Nuestro Proceso
                    </h3>
                    <ol className="space-y-3 list-decimal list-inside">
                      {servicios[activeService].proceso.map((paso, i) => (
                        <li key={i} className="text-gray-700">
                          <span className="ml-2">{paso}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>

                <div className="mt-12 bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg p-8 text-white">
                  <div className="text-center">
                    <h3 className="text-2xl font-semibold mb-4">
                      ¿Necesitas más información?
                    </h3>
                    <p className="text-blue-100 mb-6">
                      Contáctanos directamente y nuestro equipo te responderá a
                      la brevedad.
                    </p>
                    <Link
                      to="/mensaje"
                      className="inline-block bg-white text-blue-700 hover:bg-blue-50 font-medium py-3 px-8 rounded-lg transition-colors"
                    >
                      Contáctanos
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ServiciosJuridicosPage;
