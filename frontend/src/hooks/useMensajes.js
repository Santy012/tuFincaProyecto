import { useState, useEffect } from 'react';
import { 
  getMensajes,
  createMensaje,
  updateMensaje,
  deleteMensaje
} from "../api/mensajes";
import { useAsyncHandler } from "./useAsyncHandler";

export const useMensajes = () => {
  const [mensajes, setMensajes] = useState([]);
  const { execute, loading, error, resetError } = useAsyncHandler();

  // Función para formatear un mensaje según el formato interno
  const formatMensaje = (msg) => ({
    id: msg?.id || 0,
    nombreCliente: msg?.nombreCliente || "Sin nombre",
    apellidoCliente: msg?.apellidoCliente || "Sin nombre",
    correo: msg?.correo || "",
    celular: msg?.celular || "",
    detalle: msg?.detalle || "",
    gestion: msg?.gestion || "porLeer",
    propiedad: msg?.propiedad || null,
    administradorId: msg?.administradorId || null,
    fecha: msg?.fecha || new Date().toISOString()
  });

  // Cargar mensajes iniciales
  const fetchMensajes = async () => {
    try {
      const response = await execute(() => getMensajes());
      console.log("Respuesta del backend:", response);
      if (!response || !Array.isArray(response)) {
        throw new Error("La respuesta de la API no es válida");
      }
      
      const mensajesFormateados = response.map(formatMensaje);
      setMensajes(mensajesFormateados);
      return mensajesFormateados;
    } catch (err) {
      console.error('Error en fetchMensajes:', err);
      throw err;
    }
  };

  // Crear nuevo mensaje
  const crearMensaje = async (mensajeData) => {
    try {
      const response = await execute(() => createMensaje(mensajeData));
      const nuevoMensaje = formatMensaje(response);
      setMensajes(prev => [...prev, nuevoMensaje]);
      return nuevoMensaje;
    } catch (err) {
      console.error('Error en crearMensaje:', err);
      throw err;
    }
  };

  // Actualizar mensaje existente
  const actualizarMensaje = async (id, mensajeData) => {
    try {
      const response = await execute(() => updateMensaje(id, mensajeData));
      const mensajeActualizado = formatMensaje(response);
      setMensajes(prev => 
        prev.map(msg => msg.id === id ? mensajeActualizado : msg)
      );
      return mensajeActualizado;
    } catch (err) {
      console.error('Error en actualizarMensaje:', err);
      throw err;
    }
  };

  // Eliminar mensaje
  const eliminarMensaje = async (id) => {
    try {
      await execute(() => deleteMensaje(id));
      setMensajes(prev => prev.filter(msg => msg.id !== id));
      return id;
    } catch (err) {
      console.error('Error en eliminarMensaje:', err);
      throw err;
    }
  };

  // Cargar datos al montar el componente
  useEffect(() => {
    fetchMensajes();
  }, []);

  return {
    mensajes,
    setMensajes,
    crearMensaje,
    actualizarMensaje,
    eliminarMensaje,
    fetchMensajes,
    reloadData: fetchMensajes,
    loading,
    error,
    resetError
  };
};