import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8080/',
  timeout: 10000, // 10 segundos
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

apiClient.interceptors.response.use(
  response => response.data,
  error => {
    if (error.response) {
      console.error('Error de API:', {
        status: error.response.status,
        data: error.response.data,
        headers: error.response.headers
      });
      
      if (error.response.status === 403) {
        // Redirigir a login o mostrar mensaje específico
        return Promise.reject({ 
          message: 'No tienes permisos para acceder a este recurso' 
        });
      }
      
      return Promise.reject(error.response.data);
    } else {
      // Mantener el manejo existente para otros errores
      return Promise.reject({ 
        message: error.message || 'Error en la conexión' 
      });
    }
  }
);

export default apiClient;