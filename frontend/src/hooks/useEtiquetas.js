import { useState, useEffect } from 'react';
import { useAsyncHandler } from './useAsyncHandler';
import { 
  getEtiquetas, 
  createEtiqueta as apiCreateEtiqueta,
  updateEtiqueta as apiUpdateEtiqueta,
  deleteEtiqueta as apiDeleteEtiqueta
} from '../api/etiquetas';

export const useEtiquetas = () => {
  const [etiquetas, setEtiquetas] = useState([]);
  const asyncHandler = useAsyncHandler();

  // Obtener todas las etiquetas
  const fetchEtiquetas = async () => {
    return asyncHandler.execute(async () => {
      const data = await getEtiquetas(); // Ya es el array directo, gracias al interceptor
      console.log('Datos recibidos:', data); // Verificación
      setEtiquetas(Array.isArray(data) ? data : []);
      return data;
    });
  };

  // Crear nueva etiqueta
  const crearEtiqueta = async (nuevaEtiqueta) => {
    return asyncHandler.execute(async () => {
      const data = await apiCreateEtiqueta(nuevaEtiqueta);
      setEtiquetas(prev => [...prev, data]);
      return data;
    });
  };

  // Actualizar etiqueta
  const actualizarEtiqueta = async (id, datosActualizados) => {
    return asyncHandler.execute(async () => {
      const data = await apiUpdateEtiqueta(id, datosActualizados);
      setEtiquetas(prev => 
        prev.map(etq => etq.id === id ? data : etq)
      );
      return data;
    });
  };

  // Eliminar etiqueta
  const eliminarEtiqueta = async (id) => {
    return asyncHandler.execute(async () => {
      await apiDeleteEtiqueta(id);
      setEtiquetas(prev => prev.filter(etq => etq.id !== id));
      return id;
    });
  };

  // Cargar etiquetas al iniciar
  useEffect(() => {
    fetchEtiquetas();
  }, []);

  return {
    etiquetas,
    setEtiquetas,
    fetchEtiquetas,
    crearEtiqueta,
    actualizarEtiqueta,
    eliminarEtiqueta,
    loading: asyncHandler.loading,
    error: asyncHandler.error,
    resetError: asyncHandler.resetError
  };
};