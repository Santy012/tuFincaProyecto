import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img
            src="src\assets\TuFincaLogo.jpeg" // Asegúrate de que la ruta sea correcta
            alt="TuFinca Logo"
            className="h-25 w-auto" // Ajusta la altura según necesites
          />
          <span className="text-2xl font-bold text-blue-800">
            Tu<span className="text-green-800">Finca WEB</span>
          </span>
        </Link>

        {/* Navegación para desktop */}
        <nav className="hidden md:flex space-x-8">
          <Link
            to="/"
            className="text-gray-700 hover:text-blue-600 font-medium transition-colors relative group"
          >
            Inicio
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
          </Link>
          <Link
            to="/propiedades"
            className="text-gray-700 hover:text-blue-600 font-medium transition-colors relative group"
          >
            Propiedades
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
          </Link>
          <Link
            to="/servicios"
            className="text-gray-700 hover:text-blue-600 font-medium transition-colors relative group"
          >
            Servicios
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
          </Link>
          <Link
            to="/sobre-nosotros"
            className="text-gray-700 hover:text-blue-600 font-medium transition-colors relative group"
          >
            Sobre Nosotros
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
          </Link>
        </nav>

        {/* Botón de contacto y menú móvil */}
        <div className="flex items-center space-x-4">
          <button className="hidden md:block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
            Contacto
          </button>

          {/* Botón de menú móvil */}
          <button className="md:hidden text-gray-700 focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Menú móvil (opcional, necesitarías estado para controlarlo) */}
      {/* <div className="md:hidden bg-white py-2 px-4 shadow-lg">
        <Link to="/" className="block py-2 text-gray-700 hover:text-blue-600">Inicio</Link>
        <Link to="/propiedades" className="block py-2 text-gray-700 hover:text-blue-600">Propiedades</Link>
        <Link to="/servicios" className="block py-2 text-gray-700 hover:text-blue-600">Servicios</Link>
        <Link to="/sobre-nosotros" className="block py-2 text-gray-700 hover:text-blue-600">Sobre Nosotros</Link>
      </div> */}
    </header>
  );
};

export default Header;
