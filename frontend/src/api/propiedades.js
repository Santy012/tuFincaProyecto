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

export const getPaginatedPropiedades = async (page = 0, size = 7, filters = {}) => {
  try {
    const params = {
      page,
      size,
      ...filters,
      etiqueta: filters.etiqueta?.join(','), // Convertir arrays a strings
    };

    const response = await apiClient.get(`/propiedades/paginate`, { params });
    
    if (!response?.content) throw new Error("Respuesta paginada inválida");
    
    return {
      content: response.content,
      currentPage: response.number,
      totalPages: response.totalPages,
      totalItems: response.totalElements,
      pageSize: response.size
    };
  } catch (error) {
    console.error('Error fetching paginated properties:', error);
    throw error;
  }
}

export const updatePropiedad = async (id, propiedadData) => {
  return apiClient.put(`/propiedades/update/${id}`, propiedadData);
};

export const createPropiedad = async (propiedadData) => {
  return apiClient.post('/propiedades/save', propiedadData);
};

export const deletePropiedad = async (id) => {
  return apiClient.delete(`/propiedades/delete/${id}`);
};