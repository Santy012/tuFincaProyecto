import axios from 'axios';
import Cookies from 'js-cookie';

const apiClient = axios.create({
  baseURL: 'http://localhost:8080/',
  timeout: 10000, // 10 segundos
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true
});

// Interceptor para agregar el token de autorización
apiClient.interceptors.request.use(
  (config) => {
    if (!config.url.includes('/auth/login')) {
    const token = Cookies.get('authToken'); // Recupera el token de las cookies
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Agrega el token al encabezado Authorization
    }
  }
    return config;
  },
  (error) => {
    // Manejo de errores en la solicitud
    return Promise.reject(error);
  }
);

// Interceptor para manejar respuestas y errores globales
apiClient.interceptors.response.use(
  (response) => {
    // Devuelve los datos directamente si la respuesta es exitosa
    return response.data;
  },
  (error) => {
    if (error.response) {
      console.error('Error de API:', {
        status: error.response.status,
        data: error.response.data,
        headers: error.response.headers,
      });

      // Manejo de errores específicos según el código de estado
      if (error.response.status === 401) {
        console.error('No autorizado. Redirigiendo al login...');
        // Opcional: Redirige al usuario al login si el token es inválido
        return Promise.reject({
          message: 'No autorizado. Por favor, inicia sesión nuevamente.',
        });
      }

      if (error.response.status === 403) {
        return Promise.reject({
          message: 'No tienes permisos para acceder a este recurso',
        });
        
      }

      if (error.response && error.response.status === 401) {
        Cookies.remove("authToken"); // Elimina el token
        window.location.href = "/login"; // Redirige al login
      }
      
      return Promise.reject(error.response.data);
    } else {
      // Manejo de errores de red u otros errores
      return Promise.reject({
        message: error.message || 'Error en la conexión',
      });
    }
  }
);

export default apiClient;