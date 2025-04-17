import { useNavigate } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import { useGlobalContext } from "../../context/GlobalContext";
import { useEffect } from "react";
import Cookies from 'js-cookie';
const LoginPage = () => {
  const navigate = useNavigate();
  const { admin, loginAdmin, logoutAdmin, loadingAdmins } = useGlobalContext();

  // Redirige al usuario si ya está autenticado
  useEffect(() => {
    if (admin === null) {
      navigate("/login"); // Redirige al login si admin es null (cerró sesión)
    } else if (admin) {
      navigate("/admin"); // Redirige al admin si ya está autenticado
    }
  }, [admin, navigate]);

  // Maneja el inicio de sesión
  const handleLogin = async (authObject) => { // Recibe el objeto { credentials: ... }
    try {
      const { credentials } = authObject; // Extrae la propiedad 'credentials'
      const response = await loginAdmin(credentials); // Pasa el objeto 'credentials' a loginAdmin
      if (response && response.token) {
        // Guarda el token en cookies
        Cookies.set('authToken', response.token, { expires: 1 }); // Expira en 1 día
        navigate("/admin");
        return { success: true };
      }
      return { success: false, error: "Credenciales inválidas" };
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      let errorMessage = "Error al iniciar sesión";
      if (error.response) {
        if (error.response.status === 403) {
          errorMessage = "Acceso denegado. Verifica tus credenciales";
        } else if (error.response.status === 401) {
          errorMessage = "Usuario o contraseña incorrectos";
        }
      }
      return { success: false, error: errorMessage };
    }
  };

  // Maneja el cierre de sesión
  const handleLogout = () => {
    logoutAdmin(); // Llama a logoutAdmin
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
        onLogout={handleLogout}
        admin={admin}
      />
    </div>
  );
};

export default LoginPage;