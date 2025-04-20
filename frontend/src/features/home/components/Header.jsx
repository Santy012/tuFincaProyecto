import { useState } from 'react';
import { Link } from "react-router-dom";
import logo from '../../../assets/imgs/TuFincaLogo.jpeg';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-white p-4 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img
            src={logo}
            alt="TuFinca Logo"
            className="h-10 w-auto mr-2" // Reduje un poco la altura del logo y agregué margen derecho
          />
          <span className="text-xl md:text-2xl font-bold text-blue-800">
            TU<span className="text-green-800">FINCA</span>
            <span className="hidden sm:inline text-blue-800">Inmobiliaria</span> {/* Ocultar en pantallas muy pequeñas */}
          </span>
        </Link>

        {/* Navegación principal (oculta en móvil) */}
        <nav className="hidden md:flex space-x-6 lg:space-x-8 text-lg">
          <Link
            to="/"
            className="text-gray-700 hover:text-blue-600 font-medium transition-colors relative group"
          >
            Inicio
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
          <Link to="/mensaje" className="hidden md:block">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
              Contacto
            </button>
          </Link>

          {/* Botón de menú móvil */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden text-gray-700 focus:outline-none"
            aria-label="Menú"
            aria-expanded={isMobileMenuOpen}
          >
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
                d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Menú móvil */}
      <div className={`md:hidden bg-white py-2 px-4 shadow-lg ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
        <Link to="/" className="block py-2 text-gray-700 hover:text-blue-600 font-medium">Inicio</Link>
        <Link to="/servicios" className="block py-2 text-gray-700 hover:text-blue-600 font-medium">Servicios</Link>
        <Link to="/sobre-nosotros" className="block py-2 text-gray-700 hover:text-blue-600 font-medium">Sobre Nosotros</Link>
        <Link to="/mensaje" className="block py-2 text-blue-600 font-medium bg-blue-50 rounded-md text-center">Contacto</Link>
      </div>
    </header>
  );
};

export default Header;