import { useNavigate } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import { useGlobalContext } from "../../context/GlobalContext";
import { useEffect } from "react";

const LoginPage = () => {
    const navigate = useNavigate();
    const { 
        admin, 
        setAdmin, 
        admins,              // Reemplaza administradores
        createAdmin,         // Nueva función del contexto
        loadingAdmins        // Estado de carga
    } = useGlobalContext();

    useEffect(() => {
        if (admin) {
            navigate('/admin');
        }
    }, [admin, navigate]);

    const handleLogin = (credentials) => {
        const { usuario, contrasena } = credentials;
        const adminEncontrado = admins.find(
          (a) => a.usuario === usuario && a.contraseña === contrasena
        );
      
        if (adminEncontrado) {
          setAdmin(adminEncontrado);
          localStorage.setItem("admin", JSON.stringify(adminEncontrado)); // Guardar en localStorage
          navigate("/admin");
          return { success: true };
        } else {
          return { success: false, error: "Usuario o contraseña incorrectos" };
        }
      };
    
      const handleRegister = async (newAdminData) => {
        try {
          const response = await createAdmin({
            ...newAdminData,
            contraseña: newAdminData.contrasena,
          });
      
          setAdmin(response);
          localStorage.setItem("admin", JSON.stringify(response)); // Guardar en localStorage
          navigate("/admin");
      
          return { success: true };
        } catch (error) {
          return {
            success: false,
            error: error.message || "Error al registrar el administrador",
          };
        }
      };
    
    const handleLogout = () => {
        setAdmin(null);
        navigate('/login');
    };

    if (loadingAdmins) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p>Cargando datos de administradores...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <LoginForm 
                onLogin={handleLogin} 
                onRegister={handleRegister} 
                onLogout={handleLogout}
                admin={admin} 
                administradores={admins}  // Cambiado a admins
            />
        </div>
    );
};

export default LoginPage;