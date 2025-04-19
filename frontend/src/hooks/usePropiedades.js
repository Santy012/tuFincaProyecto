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
  const [filteredProperties, setFilteredProperties] = useState([]); // Mover el estado aquí
  const [pagination, setPagination] = useState({
    currentPage: 0,
    totalPages: 1,
    totalItems: 0,
    pageSize: 12,
  });
  const { execute, loading, error, resetError } = useAsyncHandler();

  // Función de formateo mejorada
  const formatPropiedad = (prop) => {
    // Normalizar imágenes
    const imagenes = Array.isArray(prop?.imagenes)
      ? prop.imagenes
          .filter((img) => {
            if (typeof img === "string") return img;
            if (img?.url) return img.url;
            return false;
          })
          .map((img) => (typeof img === "string" ? { url: img } : img))
      : prop?.medias?.filter((m) => m?.tipo?.toLowerCase() === "imagen") || [];

    // Normalizar etiquetas
    const etiquetas = Array.isArray(prop?.etiquetas)
      ? prop.etiquetas.map((e) => e?.id || e).filter((e) => e)
      : [];

      const etiquetasNombres = Array.isArray(prop?.etiquetas)
    ? prop.etiquetas.map(e => e?.nombre || e.nombre)
    : [];

    return {
      id: prop?.id || 0,
      titulo: prop?.titulo || "Sin título",
      codigo: prop?.codigo?.toString() || "0",
      descripcion: prop?.descripcion || "",
      areaTotal: prop?.areaTotal || 0,
      areaConstruida: prop?.areaConst || 0,
      ubicacion: prop?.ubicacion || "Desconocida",
      estado: (prop?.estado || "").toLowerCase(),
      imagenes,
      etiquetas,
      etiquetasNombres,
      administradorId: prop?.administrador?.id || null,
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

  const loadPaginatedData = async (page = 0, size = 7, filters = {}) => {
    try {
      const response = await execute(() =>
        getPaginatedPropiedades(page, size, filters)
      );

      if (!response?.content) throw new Error("Respuesta paginada inválida");

      const formatted = response.content.map(formatPropiedad);
      setPropiedades(formatted);
      setFilteredProperties(formatted);

      setPagination({
        currentPage: Number(response.number) || 0,
        totalPages: Number(response.totalPages) || 1,
        totalItems: Number(response.totalElements) || 0,
        pageSize: Number(response.size) || 7
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
        etiquetas: filters.etiquetas?.join(',') // Cambiar nombre del parámetro
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
    filteredProperties, // Mover este estado aquí
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
