import { useState, useEffect } from 'react';
import { getPropiedades } from "../api/propiedades";
import { useAsyncHandler } from "./useAsyncHandler";

export const usePropiedades = () => {
  const [propiedades, setPropiedades] = useState([]);
  const { execute, loading, error, resetError } = useAsyncHandler();

  const loadInitialData = async () => {
    try {
      console.log('Cargando propiedades...');
      const response = await execute(() => getPropiedades());
      
      if (!response || !Array.isArray(response)) {
        throw new Error("La respuesta de la API no es válida");
      }
      
      const propiedadesFormateadas = response.map(prop => ({
        id: prop?.id || 0,
        titulo: prop?.titulo || "Sin título",
        codigo: prop?.codigo?.toString() || "0",
        descripcion: prop?.descripcion || "",
        areaTotal: prop?.areaTotal || 0,
        areaConstruida: prop?.areaConst || 0,
        ubicacion: prop?.ubicacion || "Desconocida",
        estado: prop?.estado?.toLowerCase() || "desconocido",
        imagenes: prop?.medias?.filter(m => m?.tipo === 'imagen').map(m => m?.url || "") || [],
        etiquetas: prop?.etiquetas?.map(e => e?.id || 0) || []
      }));

      setPropiedades(propiedadesFormateadas);
      return propiedadesFormateadas;
    } catch (err) {
      console.error('Error en loadInitialData:', err);
      throw err;
    }
  };

  useEffect(() => {
    loadInitialData();
  }, []);

  const actualizarPropiedad = (id, nuevaPropiedad) => {
    setPropiedades(prev =>
      prev.map(prop => (prop.id === id ? { ...prop, ...nuevaPropiedad } : prop))
    );
  };

  return {
    propiedades,
    setPropiedades,
    actualizarPropiedad,
    loading,
    error,
    reloadData: loadInitialData,
    resetError
  };
};