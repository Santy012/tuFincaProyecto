import apiClient from './apiClient';

export const getMensajes = async () => {
  try {
    const response = await apiClient.get('/mensajes/all');
    
    // Verifica que la respuesta tenga datos y sea un array
    if (!response || !Array.isArray(response)) {
      throw new Error("La respuesta de la API no es válida");
    }
    
    return response;
  } catch (error) {
    console.error('Error fetching mensajes:', error);
    throw error;
  }
};

export const updateMensaje = async (id, mensajeData) => {
  return apiClient.put(`/mensajes/update/${id}`, mensajeData);
};

export const createMensaje = async (mensajeData) => {
  return apiClient.post('/mensajes/save', mensajeData);
};

export const deleteMensaje = async (id) => {
  return apiClient.delete(`/mensajes/delete/${id}`);
};