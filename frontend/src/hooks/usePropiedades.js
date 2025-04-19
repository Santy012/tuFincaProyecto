import { useState, useEffect } from 'react';
import { 
  getPropiedades,
  createPropiedad,
  updatePropiedad,
  deletePropiedad
} from "../api/propiedades";
import { useAsyncHandler } from "./useAsyncHandler";

export const usePropiedades = () => {
  const [propiedades, setPropiedades] = useState([]);
  const { execute, loading, error, resetError } = useAsyncHandler();

  // Función para formatear una propiedad según el formato interno
  const formatPropiedad = (prop) => ({
    id: prop?.id || 0,
    titulo: prop?.titulo || "Sin título",
    codigo: prop?.codigo?.toString() || "0",
    descripcion: prop?.descripcion || "",
    areaTotal: prop?.areaTotal || 0,
    areaConstruida: prop?.areaConst || 0,
    ubicacion: prop?.ubicacion || "Desconocida",
    estado: prop?.estado?.toLowerCase() || "desconocido",
    imagenes: prop?.medias?.filter((m) => (m?.tipo === "imagen"||m?.tipo === "video")) || [], // Guarda los objetos completos
    etiquetas: prop?.etiquetas?.map((e) => e?.id || 0) || [],
    administradorId: prop?.administrador?.id || null, // Extrae el ID del administrador
  });

  // Cargar propiedades iniciales
  const loadInitialData = async () => {
    try {
      const response = await execute(() => getPropiedades());
      
      if (!response || !Array.isArray(response)) {
        throw new Error("La respuesta de la API no es válida");
      }
      
      const propiedadesFormateadas = response.map(formatPropiedad);
      setPropiedades(propiedadesFormateadas);
      return propiedadesFormateadas;
    } catch (err) {
      console.error('Error en loadInitialData:', err);
      throw err;
    }
  };

  // Crear nueva propiedad
  const crearPropiedad = async (propiedadData) => {
    try {
      const response = await execute(() => createPropiedad(propiedadData));
      const nuevaPropiedad = formatPropiedad(response);
      setPropiedades(prev => [...prev, nuevaPropiedad]);
      return nuevaPropiedad;
    } catch (err) {
      console.error('Error en crearPropiedad:', err);
      throw err;
    }
  };

  // Actualizar propiedad existente
  const actualizarPropiedad = async (id, propiedadData) => {
    try {
      const response = await execute(() => updatePropiedad(id, propiedadData));
      const propiedadActualizada = formatPropiedad(response);
  
      // Actualiza el estado local con la propiedad actualizada
      setPropiedades((prev) =>
        prev.map((prop) => (prop.id === id ? propiedadActualizada : prop))
      );
  
      return propiedadActualizada;
    } catch (err) {
      console.error("Error en actualizarPropiedad:", err);
      throw err;
    }
  };

  // Eliminar propiedad
  const eliminarPropiedad = async (id) => {
    try {
      await execute(() => deletePropiedad(id));
      setPropiedades(prev => prev.filter(prop => prop.id !== id));
      return id;
    } catch (err) {
      console.error('Error en eliminarPropiedad:', err);
      throw err;
    }
  };

  // Cargar datos al montar el componente
  useEffect(() => {
    loadInitialData();
  }, []);

  return {
    propiedades,
    setPropiedades,
    crearPropiedad,
    actualizarPropiedad,
    eliminarPropiedad,
    loading,
    error,
    reloadData: loadInitialData,
    resetError
  };
};