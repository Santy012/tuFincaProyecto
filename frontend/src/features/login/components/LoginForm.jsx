import { useState } from "react";
import ConfirmarIdentidad from "../../admin/perfil/components/ConfirmarIdentidad";

const LoginForm = ({ onLogin, onRegister, onLogout, admin, administradores }) => {
    const [usuario, setUsuario] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [error, setError] = useState("");
    const [mostrarRegistro, setMostrarRegistro] = useState(false);
    const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
    const [nuevoAdmin, setNuevoAdmin] = useState({
        nombre: "",
        usuario: "",
        correo: "",
        contrasena: ""
    });

    const handleSubmitLogin = async () => {
        setError("");
        if (!usuario || !contrasena) {
            setError("Por favor ingresa usuario y contraseña");
            return;
        }

        const result = await onLogin({ usuario, contrasena });
        if (!result.success) {
            setError(result.error || "Error al iniciar sesión");
        }
    };

    const handleSubmitRegister = async () => {
        setError("");
        if (!nuevoAdmin.nombre || !nuevoAdmin.usuario || !nuevoAdmin.correo || !nuevoAdmin.contrasena) {
            setError("Por favor completa todos los campos");
            return;
        }

        // Si hay administradores registrados, pedir confirmación
        if (administradores.length > 0) {
            setMostrarConfirmacion(true);
            return;
        }

        // Si no hay administradores, registrar directamente
        const result = await onRegister(nuevoAdmin);
        if (!result.success) {
            setError(result.error || "Error al registrar");
        }
    };

    const confirmarRegistro = async (password) => {
        const adminVerificador = administradores.find(a => a.contraseña === password);
        if (!adminVerificador) {
            return "Contraseña de verificación incorrecta";
        }

        const result = await onRegister(nuevoAdmin);
        if (result.success) {
            setMostrarRegistro(false);
            setMostrarConfirmacion(false);
            setNuevoAdmin({
                nombre: "",
                usuario: "",
                correo: "",
                contrasena: ""
            });
            return null;
        } else {
            return result.error || "Error al registrar";
        }
    };


    if (mostrarConfirmacion) {
        return (
            <ConfirmarIdentidad 
                onVerify={confirmarRegistro}
                onCancel={() => setMostrarConfirmacion(false)}
            />
        );
    }

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center">
                {mostrarRegistro ? "Registro de Administrador" : "Inicio de Sesión"}
            </h2>

            {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

            {mostrarRegistro ? (
                <div className="space-y-4">
                    <div>
                        <label className="block text-gray-700 mb-1">Nombre completo</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 border rounded-lg"
                            value={nuevoAdmin.nombre}
                            onChange={(e) => setNuevoAdmin({...nuevoAdmin, nombre: e.target.value})}
                            placeholder="Nombre completo"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-1">Nombre de usuario</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 border rounded-lg"
                            value={nuevoAdmin.usuario}
                            onChange={(e) => setNuevoAdmin({...nuevoAdmin, usuario: e.target.value})}
                            placeholder="Nombre de usuario"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-1">Correo electrónico</label>
                        <input
                            type="email"
                            className="w-full px-4 py-2 border rounded-lg"
                            value={nuevoAdmin.correo}
                            onChange={(e) => setNuevoAdmin({...nuevoAdmin, correo: e.target.value})}
                            placeholder="Correo electrónico"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-1">Contraseña</label>
                        <input
                            type="password"
                            className="w-full px-4 py-2 border rounded-lg"
                            value={nuevoAdmin.contrasena}
                            onChange={(e) => setNuevoAdmin({...nuevoAdmin, contrasena: e.target.value})}
                            placeholder="Contraseña"
                        />
                    </div>
                    <div className="flex space-x-4">
                        <button
                            onClick={() => setMostrarRegistro(false)}
                            className="flex-1 bg-gray-300 text-gray-800 py-2 rounded-lg hover:bg-gray-400 transition"
                        >
                            Volver
                        </button>
                        <button
                            onClick={handleSubmitRegister}
                            className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                        >
                            Registrar
                        </button>
                    </div>
                </div>
            ) : (
                <div className="space-y-4">
                    <div>
                        <label className="block text-gray-700 mb-1">Usuario</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 border rounded-lg"
                            value={usuario}
                            onChange={(e) => setUsuario(e.target.value)}
                            placeholder="Nombre de usuario"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-1">Contraseña</label>
                        <input
                            type="password"
                            className="w-full px-4 py-2 border rounded-lg"
                            value={contrasena}
                            onChange={(e) => setContrasena(e.target.value)}
                            placeholder="Contraseña"
                        />
                    </div>
                    <div className="flex space-x-4">
                        <button
                            onClick={() => setMostrarRegistro(true)}
                            className="flex-1 bg-gray-300 text-gray-800 py-2 rounded-lg hover:bg-gray-400 transition"
                        >
                            Registrarse
                        </button>
                        <button
                            onClick={handleSubmitLogin}
                            className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                        >
                            Iniciar sesión
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LoginForm;