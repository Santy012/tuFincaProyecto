import { FaUserCircle } from "react-icons/fa";
const AdminHeader = () => {
    return (
      <header className="bg-blue-800 text-white w-full py-2 sm:py-3">
        <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center px-4 gap-2 sm:gap-4">
          <h1 className="text-base sm:text-lg md:text-xl">Panel de Administración</h1>
  
          <div className="flex items-center gap-2 sm:gap-4">
            <h1 className="text-sm sm:text-base md:text-lg">Hola, Admin</h1>
            <FaUserCircle size={30}/>
          </div>
        </div>
      </header>
    );
  };
  
  export default AdminHeader;
  