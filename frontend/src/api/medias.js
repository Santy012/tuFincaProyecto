import apiClient from './apiClient';

export const saveMedia = async (mediaData) => {
  const response = await apiClient.post('/media/save', mediaData);
  return response;
};

export const getMedia = async (id) => {
  const response = await apiClient.get(`/media/${id}`);
  return response;
};

export const getAllMedia = async () => {
  const response = await apiClient.get('/media/all');
  return response;
};

export const deleteMedia = async (id) => {
  const response = await apiClient.delete(`/media/delete/${id}`);
  return response;
};

// En tu archivo api/medias.js
export const uploadMedia = async (files, propiedadId) => {
  try {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file);
    });
    formData.append("propiedadId", propiedadId);

    const response = await apiClient.post("/media/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("Respuesta del backend en uploadMedia:", response); // Depuración
    return response; // Asegúrate de devolver la respuesta directamente
  } catch (error) {
    console.error("Error al subir los archivos multimedia:", error);
    throw error;
  }
};