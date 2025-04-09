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