import { useState } from "react";
const LoginForm = ({ onLogin, onLogout, admin }) => {
  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!usuario || !contrasena) {
      setError("Por favor ingresa usuario y contraseña");
      return;
    }

    const credentials = {
      usuario: usuario, 
      contrasena: contrasena 
    };

    const result = await onLogin({ credentials });
    console.log("Resultado de onLogin:", result);
    if (!result.success) {
      setError(result.error || "Usuario o contraseña incorrectos");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Inicio de Sesión
      </h2>

      {error && (
        <div className="mb-4 px-4 py-3 bg-red-50 text-red-600 rounded-lg">
          <p className="text-center">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmitLogin} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Usuario
          </label>
          <input
            type="text"
            autoComplete="username"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            placeholder="Tu nombre de usuario"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Contraseña
          </label>
          <input
            type="password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            placeholder="••••••••"
            required
            autoComplete="current-password"
          />
        </div>
        <div className="flex space-x-4 pt-2">
          <button
            type="submit"
            className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-medium shadow-md"
          >
            Iniciar sesión
          </button>
        </div>
      </form>

      {admin && (
        <div className="mt-4">
          <button
            onClick={onLogout}
            className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition font-medium shadow-md"
          >
            Cerrar sesión
          </button>
        </div>
      )}
    </div>
  );
};

export default LoginForm;
