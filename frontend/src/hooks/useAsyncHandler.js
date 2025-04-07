// useAsyncHandler mejorado
import { useState } from "react";

export const useAsyncHandler = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = async (asyncFunction, ...args) => {
    try {
      setLoading(true);
      setError(null);
      console.log('Iniciando petición...'); // Log de depuración
      const result = await asyncFunction(...args);
      console.log('Petición completada:', result); // Log de depuración
      return result;
    } catch (err) {
      console.error('Error en petición:', err); // Log de depuración
      setError(err.message || 'Ocurrió un error');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { execute, loading, error, resetError: () => setError(null) };
};
