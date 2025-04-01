import { useState, useEffect } from "react";
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
  const [errorCorreo, setErrorCorreo] = useState("");

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  useEffect(() => {
    setError("");
    setErrorCorreo("");
  }, [mostrarRegistro]);

  const handleChangeCorreo = (e) => {
    const valor = e.target.value;
    setNuevoAdmin({...nuevoAdmin, correo: valor});
    
    if (valor && !isValidEmail(valor)) {
      setErrorCorreo("Ingresa un correo válido (ejemplo@dominio.com)");
    } else {
      setErrorCorreo("");
    }
  };

  const handleMostrarRegistro = () => {
    setError("");
    setErrorCorreo("");
    setMostrarRegistro(true);
    setUsuario("");
    setContrasena("");
  };

  const handleVolverALogin = () => {
    setError("");
    setErrorCorreo("");
    setMostrarRegistro(false);
    setNuevoAdmin({
      nombre: "",
      usuario: "",
      correo: "",
      contrasena: ""
    });
  };

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    setError("");
    
    if (!usuario || !contrasena) {
      setError("Por favor ingresa usuario y contraseña");
      return;
    }

    const result = await onLogin({ usuario, contrasena });
    if (!result.success) {
      setError(result.error || "Usuario o contraseña incorrectos");
    }
  };

  const handleSubmitRegister = async (e) => {
    e.preventDefault();
    setError("");
    
    // Validar campos vacíos
    if (!nuevoAdmin.nombre || !nuevoAdmin.usuario || !nuevoAdmin.correo || !nuevoAdmin.contrasena) {
      setError("Por favor completa todos los campos");
      return;
    }

    // Validar formato de correo
    if (!isValidEmail(nuevoAdmin.correo)) {
      setErrorCorreo("Ingresa un correo válido");
      return;
    }

    // Verificar si el usuario ya existe
    if (administradores.some(a => a.usuario === nuevoAdmin.usuario)) {
      setError("Este nombre de usuario ya está en uso");
      return;
    }

    // Verificar si el correo ya existe
    if (administradores.some(a => a.correo === nuevoAdmin.correo)) {
      setError("Este correo electrónico ya está registrado");
      return;
    }

    if (administradores.length > 0) {
      setMostrarConfirmacion(true);
      return;
    }

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
        onCancel={() => {
          setMostrarConfirmacion(false);
          setError("");
        }}
      />
    );
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg">
      <div className="flex justify-center mb-2">
        <div className="w-16 h-1 bg-gray-200 rounded-full"></div>
      </div>
      
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        {mostrarRegistro ? "Registro de Administrador" : "Inicio de Sesión"}
      </h2>

      {error && (
        <div className="mb-4 px-4 py-3 bg-red-50 text-red-600 rounded-lg animate-fadeIn">
          <p className="text-center">{error}</p>
        </div>
      )}

      {mostrarRegistro ? (
        <form onSubmit={handleSubmitRegister} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre completo</label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              value={nuevoAdmin.nombre}
              onChange={(e) => setNuevoAdmin({...nuevoAdmin, nombre: e.target.value})}
              placeholder="Ej: Juan Pérez"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre de usuario</label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              value={nuevoAdmin.usuario}
              onChange={(e) => setNuevoAdmin({...nuevoAdmin, usuario: e.target.value})}
              placeholder="Ej: juanperez"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Correo electrónico</label>
            <input
              type="email"
              className={`w-full px-4 py-2 border ${
                errorCorreo ? "border-red-300" : "border-gray-300"
              } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition`}
              value={nuevoAdmin.correo}
              onChange={handleChangeCorreo}
              placeholder="Ej: juan@email.com"
              required
            />
            {errorCorreo && (
              <p className="text-red-500 text-sm mt-1 animate-fadeIn">{errorCorreo}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              value={nuevoAdmin.contrasena}
              onChange={(e) => setNuevoAdmin({...nuevoAdmin, contrasena: e.target.value})}
              placeholder="••••••••"
              required
              minLength="6"
            />
          </div>
          <div className="flex space-x-4 pt-2">
            <button
              type="button"
              onClick={handleVolverALogin}
              className="flex-1 bg-gray-100 text-gray-800 py-2 rounded-lg hover:bg-gray-200 transition font-medium"
            >
              Volver
            </button>
            <button
              type="submit"
              disabled={!!errorCorreo || !nuevoAdmin.correo}
              className={`flex-1 py-2 rounded-lg font-medium shadow-md transition ${
                errorCorreo || !nuevoAdmin.correo
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              Registrar
            </button>
          </div>
        </form>
      ) : (
        <form onSubmit={handleSubmitLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Usuario</label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              placeholder="Tu nombre de usuario"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>
          <div className="flex space-x-4 pt-2">
            <button
              type="button"
              onClick={handleMostrarRegistro}
              className="flex-1 bg-gray-100 text-gray-800 py-2 rounded-lg hover:bg-gray-200 transition font-medium"
            >
              Registrarse
            </button>
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-medium shadow-md"
            >
              Iniciar sesión
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default LoginForm;