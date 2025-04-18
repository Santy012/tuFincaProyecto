import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import { useGlobalContext } from "../../context/GlobalContext";
import { useEffect } from "react";
import Cookies from 'js-cookie';
import MessageDialog from "../../components/MessageDialog";

const LoginPage = () => {
  const navigate = useNavigate();
  const { admin, loginAdmin, logoutAdmin, loadingAdmins } = useGlobalContext();
  const [showErrorDialog, setShowErrorDialog] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Redirige al usuario si ya está autenticado
  useEffect(() => {
    if (admin === null) {
      // No redirijas aquí, permite que el usuario vea el formulario de inicio de sesión
    } else if (admin) {
      navigate("/admin"); // Redirige al admin si ya está autenticado
    }
  }, [admin, navigate]);

  // Maneja el inicio de sesión
  const handleLogin = async (authObject) => {
    try {
      const { credentials } = authObject;
      const response = await loginAdmin(credentials);
      if (response && response.token) {
        Cookies.set('authToken', response.token, { expires: 1 });
        navigate("/admin");
        return { success: true };
      } else {
        setErrorMessage("Credenciales inválidas");
        setShowErrorDialog(true);
        return { success: false, error: "Credenciales inválidas" };
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      let errorMessage = "Error al iniciar sesión";
      if (error.response) {
        // Captura la respuesta del backend
        errorMessage = error.response.data || "Error al iniciar sesión";
      }
      setErrorMessage(errorMessage);
      setShowErrorDialog(true);
      return { success: false, error: errorMessage };
    }
  };

  // Maneja el cierre de sesión
  const handleLogout = () => {
    logoutAdmin();
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
      <MessageDialog
        isOpen={showErrorDialog}
        message={errorMessage}
        type="error"
        onConfirm={() => setShowErrorDialog(false)}
        confirmText="Aceptar"
      />
    </div>
  );
};

export default LoginPage;