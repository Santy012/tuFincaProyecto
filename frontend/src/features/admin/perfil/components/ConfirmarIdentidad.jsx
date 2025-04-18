import { useState } from "react";

const ConfirmarIdentidad = ({ onVerify }) => {
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => { // Receive the event object
    e.preventDefault(); // Prevent the default form submission
    const error = onVerify(password);
    if (error) {
      setErrorMessage(error);
    }
  };

  return (
    <div className="text-center">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Confirmar identidad</h2>
      <p className="text-gray-600 mb-4">Ingresa tu contraseña para continuar.</p>
      <form onSubmit={handleSubmit}> {/* Changed to a form */}
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg mb-2"
          placeholder="Contraseña"
        />
        {errorMessage && <p className="text-red-500 text-sm mb-2">{errorMessage}</p>}
        <button
          type="submit" // Changed button type to submit
          className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-500 transition w-full"
        >
          Aceptar
        </button>
      </form>
    </div>
  );
};

export default ConfirmarIdentidad;