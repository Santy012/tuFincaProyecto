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
  const [allProperties, setAllProperties] = useState([]); // Nuevo estado para todas las propiedades
  const [pagination, setPagination] = useState({
    currentPage: 0,
    totalPages: 1,
    totalItems: 0,
    pageSize: 12,
  });
  const { execute, loading, error, resetError } = useAsyncHandler();

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


  const loadPaginatedData = async (page = 0, size = 2, filters = {}) => {

    try {
      console.log("Cargando propiedades paginadas con filtros:", filters.etiquetas);
      const etiquetasNombres = filters.etiquetas?.map(
        (id) =>
          allProperties
            .flatMap((propiedad) => propiedad.etiquetasNombres || [])
            .find((nombre) =>
              allProperties.some((prop) => prop.etiquetas.includes(id) && prop.etiquetasNombres.includes(nombre))
            )
      ).filter(Boolean); // Filtrar valores nulos o indefinidos
  
      // Actualizar los filtros con los nombres de las etiquetas
      const backendFilters = {
        ...filters,
        etiquetas: etiquetasNombres, // Reemplazar IDs con nombres
      };
      
      const response = await execute(() =>
        getPaginatedPropiedades(page, size, backendFilters)
      );
  
      if (!response) throw new Error("Respuesta inválida");
  
      // Extraer datos de paginación directamente de la respuesta
      const totalElements = response.totalItems || 0;
      const totalPages = response.totalPages || 1;
      const currentPage = response.currentPage || 0;
      const pageSize = response.size || size;
  
      const formatted = response.content?.map(formatPropiedad) || [];
      setPropiedades(formatted);
  
      // Actualizar estado de paginación
      setPagination({
        currentPage,
        totalPages,
        totalItems: totalElements,
        pageSize
      });
  
      return { propiedades: formatted, pagination: response };
    } catch (err) {
      console.error("Error loading paginated data:", err);
      throw err;
    }
  };

  // Actualizar applyFilters para usar paginación con filtros
  const applyFilters = async (filters) => {
    try {

      
      const backendFilters = {
        nombre: filters.nombre || undefined,
        codigo: filters.codigo || undefined,
        ubicacion: filters.ubicacion || undefined,
        estado: filters.estado || undefined,
        etiquetas: filters.etiquetas || undefined
      };
  
      await loadPaginatedData(0, pagination.pageSize, backendFilters);
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
    allProperties,
    setPropiedades,
    crearPropiedad,
    actualizarPropiedad,
    eliminarPropiedad,
    loading,
    error,
    reloadData: loadAllProperties,
    loadPaginatedData,
    applyFilters, // Nueva función de filtrado
    resetError,
  };
};
