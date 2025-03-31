// ConfirmarIdentidad.jsx
import { useState } from "react";

const ConfirmarIdentidad = ({ onVerify }) => {
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = () => {
    const error = onVerify(password);
    if (error) {
      setErrorMessage(error);
    }
  };

  return (
    <div className="text-center">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Confirmar identidad</h2>
      <p className="text-gray-600 mb-4">Ingresa tu contraseña para continuar.</p>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full px-4 py-2 border rounded-lg mb-2"
        placeholder="Contraseña"
      />
      {errorMessage && <p className="text-red-500 text-sm mb-2">{errorMessage}</p>}
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-500 transition w-full"
        onClick={handleSubmit}
      >
        Aceptar
      </button>
    </div>
  );
};

export default ConfirmarIdentidad;
