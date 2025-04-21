import { useState, useEffect } from "react";
import {
  getPropiedades,
  createPropiedad,
  updatePropiedad,
  deletePropiedad,
  getPaginatedPropiedades,
} from "../api/propiedades";
import { useAsyncHandler } from "./useAsyncHandler";

export const usePropiedades = () => {
  const [propiedades, setPropiedades] = useState([]);
  const [allProperties, setAllProperties] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 0,
    totalPages: 1,
    totalItems: 0,
    pageSize: 12,
  });
  const [currentFilters, setCurrentFilters] = useState({});
  const { execute, loading, error, resetError } = useAsyncHandler();
  const [defaultFilters, setDefaultFilters] = useState({ estado: 'disponible' }); 

  // Función de formateo mejorada
  const formatPropiedad = (prop) => {
    // Normalizar imágenes (incluyendo videos si es necesario)
    const imagenes = Array.isArray(prop?.imagenes)
      ? prop.imagenes
          .filter((img) => {
            if (typeof img === "string") return img;
            if (img?.url) return img.url;
            return false;
          })
          .map((img) => (typeof img === "string" ? { url: img } : img))
      : prop?.medias?.filter((m) => m?.tipo?.toLowerCase() === "imagen" || m?.tipo?.toLowerCase() === "video") || []; // Incluye imágenes y videos
  
    // Normalizar etiquetas
    const etiquetas = Array.isArray(prop?.etiquetas)
      ? prop.etiquetas.map((e) => e?.id || e).filter((e) => e)
      : [];
  
    const etiquetasNombres = Array.isArray(prop?.etiquetas)
      ? prop.etiquetas.map((e) => e?.nombre || e.nombre)
      : [];
  
    return {
      id: prop?.id || 0,
      titulo: prop?.titulo || "Sin título",
      codigo: prop?.codigo?.toString() || "0",
      descripcion: prop?.descripcion || "",
      areaTotal: prop?.areaTotal || 0,
      areaConstruida: prop?.areaConst || 0,
      ubicacion: prop?.ubicacion || "Desconocida",
      estado: prop?.estado?.toLowerCase() || "desconocido",
      imagenes, // Incluye imágenes y videos
      etiquetas, // IDs de etiquetas
      etiquetasNombres, // Nombres de etiquetas
      administradorId: prop?.administrador?.id || null, // ID del administrador
    };
  };

  // Cargar todas las propiedades (para filtrado)
  const loadAllProperties = async () => {
    try {
      const response = await execute(() => getPropiedades());
      if (!response || !Array.isArray(response))
        throw new Error("Respuesta inválida");

      const formatted = response.map(formatPropiedad);
      setAllProperties(formatted);
      return formatted;
    } catch (err) {
      console.error("Error loading all properties:", err);
      throw err;
    }
  };


  const loadPaginatedData = async (page = 0, size = 12, filters = currentFilters, useDefaultFilters = true) => {
    try {
      console.log("Filtros iniciales:", filters);

      const combinedFilters = useDefaultFilters ? { ...defaultFilters, ...filters } : filters;
  
      // Preparar los parámetros de consulta
      const queryParams = new URLSearchParams();
      queryParams.append('page', page);
      queryParams.append('size', size);

      // Aplicar filtros combinados
      if (combinedFilters.nombre) queryParams.append('nombre', combinedFilters.nombre);
      if (combinedFilters.codigo) queryParams.append('codigo', combinedFilters.codigo);
      if (combinedFilters.ubicacion) queryParams.append('ubicacion', combinedFilters.ubicacion);
      if (combinedFilters.estado) queryParams.append('estado', combinedFilters.estado);
      
      if (combinedFilters.etiquetas?.length > 0) {
        combinedFilters.etiquetas.forEach(etiqueta => {
          queryParams.append('etiquetas', etiqueta);
        });
      }
  
      console.log("Query params:", queryParams.toString());
  
      // Llamar al API con los parámetros correctamente formados
      const response = await execute(() => 
        getPaginatedPropiedades(queryParams)
      );
  
      if (!response) throw new Error("Respuesta inválida");
  
      // Procesar respuesta...
      const formatted = response.content?.map(formatPropiedad) || [];
      setPropiedades(formatted);
  
      setPagination({
        currentPage: response.number || 0,
        totalPages: response.totalPages || 1,
        totalItems: response.totalElements || 0,
        pageSize: response.size || size
      });
  
      return { propiedades: formatted, pagination: response };
    } catch (err) {
      console.error("Error loading paginated data:", err);
      throw err;
    }
  };
  
  // Función applyFilters actualizada
  const applyFilters = async (filters, defaultFilters = true) => {
    try {
      console.log("Aplicando filtros:", filters);
      // Limpiar filtros - eliminar valores vacíos/undefined
      const cleanFilters = {
        nombre: filters.nombre || undefined,
        codigo: filters.codigo || undefined,
        ubicacion: filters.ubicacion || undefined,
        estado: filters.estado || undefined,
        etiquetas: filters.etiquetas || undefined
      };

      setCurrentFilters(filters);
      await loadPaginatedData(0, pagination.pageSize, cleanFilters, defaultFilters);
    } catch (err) {
      console.error("Error applying filters:", err);
      throw err;
    }
  };

  // Crear nueva propiedad
  const crearPropiedad = async (propiedadData) => {
    try {
      const response = await execute(() => createPropiedad(propiedadData));
      const nuevaPropiedad = formatPropiedad(response);
      setPropiedades((prev) => [...prev, nuevaPropiedad]);
      return nuevaPropiedad;
    } catch (err) {
      console.error("Error en crearPropiedad:", err);
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
      setPropiedades((prev) => prev.filter((prop) => prop.id !== id));
      return id;
    } catch (err) {
      console.error("Error en eliminarPropiedad:", err);
      throw err;
    }
  };

  // Cargar datos al montar el componente
  useEffect(() => {
    loadAllProperties();
    loadPaginatedData(0);
  }, []);

  return {
    propiedades,
    pagination,
    currentFilters,
    allProperties,
    setPropiedades,
    crearPropiedad,
    actualizarPropiedad,
    eliminarPropiedad,
    loading,
    error,
    reloadData: loadAllProperties,
    loadPaginatedData,
    setDefaultFilters, // Expone la función para modificar filtros por defecto
    defaultFilters, // Expone los filtros por defecto actuales
    applyFilters, // Nueva función de filtrado
    resetError,
  };
};
