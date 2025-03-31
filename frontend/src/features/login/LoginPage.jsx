import { useNavigate } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import { useGlobalContext } from "../../context/GlobalContext";
import { useEffect } from "react";

const LoginPage = () => {
    
    const navigate = useNavigate();
    const { admin, setAdmin, administradores, setAdministradores } = useGlobalContext();

    useEffect(() => {
        if (admin) {
            navigate('/admin');
        }
    }, [admin, navigate]);

    const handleLogin = (credentials) => {
        const { usuario, contrasena } = credentials;
        const adminEncontrado = administradores.find(
            a => a.usuario === usuario && a.contraseña === contrasena
        );
        
        if (adminEncontrado) {
            console.log("hola, admin encontrado")
            setAdmin(adminEncontrado);
            navigate('/admin'); // Redirección aquí
            return { success: true };
        } else {
            return { success: false, error: "Usuario o contraseña incorrectos" };
        }
    };
    
    const handleRegister = (newAdminData) => {
        if (administradores.some(a => a.usuario === newAdminData.usuario)) {
            return { success: false, error: "Este nombre de usuario ya está en uso" };
        }
        
        if (administradores.some(a => a.correo === newAdminData.correo)) {
            return { success: false, error: "Este correo ya está registrado" };
        }
        
        const nuevoId = Math.max(...administradores.map(a => a.id), 0) + 1;
        const adminRegistrado = {
            id: nuevoId,
            ...newAdminData,
            contraseña: newAdminData.contrasena
        };
        
        setAdministradores([...administradores, adminRegistrado]);
        setAdmin(adminRegistrado);
        navigate('/admin'); // Redirección después de registro exitoso
        
        return { success: true };
    };
    
    const handleLogout = () => {
        setAdmin(null);
        navigate('/login'); // Redirección al logout
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <LoginForm 
                onLogin={handleLogin} 
                onRegister={handleRegister} 
                onLogout={handleLogout}
                admin={admin} 
                administradores={administradores}
            />
        </div>
    );
};

export default LoginPage;