import { FaBalanceScale, FaHandshake, FaChartLine, FaMapMarkedAlt, FaUsers } from 'react-icons/fa';
import Header from '../home/components/Header';
import Footer from '../home/components/Footer';
import { Link } from 'react-router-dom';

const SobreNosotrosPage = () => {

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-700 to-blue-900 text-white py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Sobre Tu Finca Inmobiliaria</h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto">
              Más de una década brindando seguridad jurídica y soluciones inmobiliarias integrales en Guatavita y sus alrededores
            </p>
          </div>
        </div>

        {/* Nuestra Historia */}
        <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Nuestra Historia</h2>
            <div className="h-1 w-20 bg-blue-600 mx-auto mb-8"></div>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto">
              Fundada en 2010, Tu Finca Inmobiliaria nació con el propósito de transformar el mercado inmobiliario regional,
              combinando expertise legal con un profundo conocimiento del territorio. Lo que comenzó como un pequeño despacho
              especializado en regularización de propiedades, hoy es un referente en transacciones seguras y desarrollo
              inmobiliario en Guatavita. Nuestro crecimiento se ha basado en la confianza de cientos de clientes que han
              encontrado en nosotros un aliado para materializar sus proyectos.
            </p>
          </div>

          {/* Misión y Visión */}
          <div className="grid md:grid-cols-2 gap-12 mb-20">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="flex items-center mb-6">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <FaHandshake className="text-blue-600 text-2xl" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Nuestra Misión</h3>
              </div>
              <p className="text-gray-600 mb-4">
                En Tu Finca Inmobiliaria, nos especializamos en la compra, venta y gestión de propiedades, brindando asesoría legal experta para garantizar transacciones seguras y transparentes.
              </p>
              <p className="text-gray-600 mb-4">
                Nuestro equipo de abogados altamente calificados ofrece acompañamiento integral en estudios de títulos, subdivisiones y trámites notariales, asegurando que cada proceso inmobiliario sea ágil, confiable y libre de complicaciones.
              </p>
              <p className="text-gray-600">
                Nos comprometemos a proporcionar un servicio personalizado, basado en la confianza, el profesionalismo y la seguridad jurídica.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="flex items-center mb-6">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <FaChartLine className="text-blue-600 text-2xl" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Nuestra Visión</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Ser la empresa inmobiliaria de referencia en Guatavita y sus alrededores, destacándonos por la excelencia en el servicio, la seguridad jurídica y la innovación digital.
              </p>
              <p className="text-gray-600 mb-4">
                Queremos ser reconocidos por nuestro equipo de abogados altamente calificados y por nuestra capacidad para ofrecer soluciones integrales que faciliten el desarrollo y la inversión en la región.
              </p>
              <p className="text-gray-600">
                Aspiramos a contribuir al crecimiento sostenible del sector inmobiliario, promoviendo un entorno seguro y confiable para nuestros clientes.
              </p>
            </div>
          </div>

          {/* Valores */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Nuestros Valores</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaBalanceScale className="text-blue-600 text-2xl" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Seguridad Jurídica</h3>
                <p className="text-gray-600">Garantizamos transacciones respaldadas por un exhaustivo análisis legal</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaHandshake className="text-blue-600 text-2xl" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Transparencia</h3>
                <p className="text-gray-600">Practicamos la honestidad en cada proceso y comunicación</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaMapMarkedAlt className="text-blue-600 text-2xl" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Conocimiento Local</h3>
                <p className="text-gray-600">Dominio profundo del mercado inmobiliario de Guatavita</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaUsers className="text-blue-600 text-2xl" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Enfoque Humano</h3>
                <p className="text-gray-600">Relaciones basadas en el respeto y comprensión de necesidades</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-r from-blue-700 to-blue-900 rounded-xl p-8 md:p-12 text-white text-center">
            <h2 className="text-3xl font-bold mb-6">¿Listo para iniciar tu proyecto inmobiliario?</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Nuestro equipo está listo para brindarte la asesoría personalizada que necesitas.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/mensaje">
              <button className="bg-white text-blue-700 hover:bg-blue-50 font-medium py-3 px-8 rounded-lg transition-colors">
                Contáctanos
              </button>
              </Link>
              <Link to="/">
              <button className="border border-white text-white hover:bg-white hover:text-blue-700 font-medium py-3 px-8 rounded-lg transition-colors">
                Ver propiedades
              </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SobreNosotrosPage;