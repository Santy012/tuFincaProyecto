import apiClient from './apiClient';

export const getEtiquetas = async () => {
  const response = await apiClient.get('/etiqueta/all');
  return response;
};

export const createEtiqueta = async (etiquetaData) => {
  const response = await apiClient.post('/etiqueta/save', etiquetaData);
  return response;
};

export const updateEtiqueta = async (id, etiquetaData) => {
  const response = await apiClient.put(`/etiqueta/update/${id}`, etiquetaData);
  return response;
};

export const deleteEtiqueta = async (id) => {
  const response = await apiClient.delete(`/etiqueta/delete/${id}`);
  return response;
};