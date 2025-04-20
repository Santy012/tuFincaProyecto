import apiClient from './apiClient';

export const getPropiedades = async () => {
  try {
    const response = await apiClient.get('/propiedades/all');
    
    // Verifica que la respuesta tenga datos y sea un array
    if (!response || !Array.isArray(response)) {
      throw new Error("La respuesta de la API no es válida");
    }
    
    return response;
  } catch (error) {
    console.error('Error fetching propiedades:', error);
    throw error;
  }
};

// En tu archivo de API (api/propiedades.js)
export const getPaginatedPropiedades = async (queryParams) => {
  const response = await apiClient.get(`/propiedades/paginate?${queryParams.toString()}`);
  return response;
};

export const updatePropiedad = async (id, propiedadData) => {
  return apiClient.put(`/propiedades/update/${id}`, propiedadData);
};

export const createPropiedad = async (propiedadData) => {
  return apiClient.post('/propiedades/save', propiedadData);
};

export const deletePropiedad = async (id) => {
  return apiClient.delete(`/propiedades/delete/${id}`);
};