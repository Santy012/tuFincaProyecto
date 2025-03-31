import { FaUserCircle } from "react-icons/fa";
import { useGlobalContext } from "../../../context/GlobalContext";

const AdminHeader = ({ onSectionChange }) => {
    const { admin } = useGlobalContext(); 

    return (
      <header className="bg-blue-800 text-white w-full py-2 sm:py-3">
        <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center px-4 gap-2 sm:gap-4">
          <h1 className="text-base sm:text-lg md:text-xl">Panel de Administración</h1>
  
          <div 
            className="flex items-center gap-2 sm:gap-4 cursor-pointer hover:bg-blue-700 p-2 rounded transition"
            onClick={() => onSectionChange("Mi Perfil")}
          >
            <h1 className="text-sm sm:text-base md:text-lg">
              Hola, {admin?.usuario || "yo"}
            </h1>
            <FaUserCircle size={30}/>
          </div>
        </div>
      </header>
    );
};

export default AdminHeader;