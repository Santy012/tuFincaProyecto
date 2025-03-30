import {
  FaHome,
  FaComments,
  FaPlus,
  FaRegUser,
  FaUserSlash,
} from "react-icons/fa";
import { BsHousesFill } from "react-icons/bs";

const Navbar = ({ onSectionChange }) => {
  return (
    <>
      {/* Navbar lateral para pantallas grandes */}
      <aside className="hidden sm:flex w-64 min-h-screen bg-white shadow-md flex-col p-4">
        <NavContent onSectionChange={onSectionChange} />
      </aside>

      {/* Navbar inferior para pantallas pequeñas */}
      <nav className="sm:hidden fixed bottom-0 left-0 w-full bg-white shadow-md flex justify-around p-2 border-t z-10">
        <a
          href="#"
          className="flex flex-col items-center text-gray-700 hover:text-yellow-500"
        >
          <FaHome className="text-xl" />
          <span className="text-xs">Propiedades</span>
        </a>
        <a
          href="#"
          className="flex flex-col items-center text-gray-700 hover:text-yellow-500"
        >
          <FaComments className="text-xl" />
          <span className="text-xs">Comentarios</span>
        </a>
        <a
          href="#"
          className="flex flex-col items-center text-gray-700 hover:text-yellow-500"
        >
          <FaPlus className="text-xl" />
          <span className="text-xs">Agregar</span>
        </a>
        <a
          href="#"
          className="flex flex-col items-center text-gray-700 hover:text-yellow-500"
        >
          <FaUserSlash className="text-xl" />
          <span className="text-xs">Cerrar Sesión</span>
        </a>
      </nav>
    </>
  );
};

// Componente reutilizable para el menú de navegación
const NavContent = ({ onSectionChange }) => {
  const navItemClass =
    "flex items-center text-gray-700 cursor-pointer hover:text-emerald-600";
  return (
    <div className="flex flex-col h-full">
      {/* Logo y Título */}
      <img
        src="src/assets/TuFincaLogo.jpeg"
        alt="TuFincaLogo"
        className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 object-contain mx-auto m-5"
      />

      {/* Sección Administración */}
      <h2 className="text-lg font-semibold text-gray-700 mb-2">
        Administración
      </h2>
      <nav className="flex flex-col space-y-4 mb-4">
        <button
          onClick={() => onSectionChange("propiedades")}
          className={navItemClass}
        >
          <BsHousesFill className="mr-3" /> Mis Propiedades
        </button>
        <button
          onClick={() => onSectionChange("mensajes")}
          className={navItemClass}
        >
          <FaComments className="mr-3" /> Comentarios
        </button>
        <button
          onClick={() => onSectionChange("+propiedad")}
          className={navItemClass}
        >
          <FaPlus className="mr-3" /> Agregar Propiedad
        </button>
      </nav>

      {/* Línea separadora */}
      <hr className="border-t border-gray-300 my-4" />

      {/* Sección Administrar Cuentas */}
      <h2 className="text-lg font-semibold text-gray-700 mb-2">
        Administrar La Cuenta
      </h2>
      <nav className="flex flex-col space-y-4 mb-4">
        {/* Botón de ver cuenta */}

        <button
          onClick={() => onSectionChange("Mi Perfil")}
          className={navItemClass}
        >
          <FaPlus className="mr-3" /> Mi Perfil
        </button>

      </nav>
    </div>
  );
};

export default Navbar;
