// src/hooks/useAdmins.js
import { useState, useEffect } from 'react';
import { useAsyncHandler } from './useAsyncHandler';
import { 
  getAdmins,
  getAdminById,
  createAdmin,
  updateAdmin,
  deleteAdmin,
  login
} from '../api/admin';

export const useAdmins = () => {
  const [admins, setAdmins] = useState([]);
  const [adminCache, setAdminCache] = useState({});
  
  const asyncHandler = useAsyncHandler();

  // Obtener todos los administradores
  const fetchAdmins = async () => {
    return asyncHandler.execute(async () => {
      const response = await getAdmins();
      setAdmins(response || []);
      return response;
    });
  };

  // Obtener un administrador por ID con caché
const fetchAdminById = async (id) => {
  // Verifica si el administrador ya está en caché
  if (adminCache[id]) {
    return adminCache[id]; // Devuelve el administrador desde el caché
  }

  // Si no está en caché, realiza la solicitud al backend
  return asyncHandler.execute(async () => {
    const response = await getAdminById(id);
    setAdminCache((prevCache) => ({ ...prevCache, [id]: response })); // Guarda en caché
    return response;
  });
};

  // Crear nuevo administrador
  const saveAdmin = async (adminData) => {
    return asyncHandler.execute(async () => {
      const response = await createAdmin(adminData);
      setAdmins(prev => [...prev, response]);
      return response;
    });
  };

  // Actualizar administrador
  const updateAdminData = async (id, adminData) => {
    return asyncHandler.execute(async () => {
      const response = await updateAdmin(id, adminData);
      setAdmins(prev => 
        prev.map(admin => admin.id === id ? response : admin)
      );
      return response;
    });
  };

  // Eliminar administrador
  const deleteAdminData = async (id) => {
    return asyncHandler.execute(async () => {
      await deleteAdmin(id);
      setAdmins(prev => prev.filter(admin => admin.id !== id));
      return id;
    });
  };

  const loginAdmin = async (authData) => {
    return asyncHandler.execute(async () => {
      try {
        const response = await login(authData); // Llama al endpoint de login
        return response; // Devuelve la respuesta del backend
      } catch (error) {
        console.error('Error en loginAdmin:', error.message || error);
        throw error; // Lanza el error para que sea manejado en el cliente
      }
    });
  };

  // Cargar administradores al iniciar
  useEffect(() => {
    fetchAdmins();
  }, []);

  return {
    admins,
    setAdmins,
    fetchAdmins,
    fetchAdminById,
    saveAdmin,
    loginAdmin,
    updateAdmin: updateAdminData,
    deleteAdmin: deleteAdminData,
    loading: asyncHandler.loading,
    error: asyncHandler.error,
    resetError: asyncHandler.resetError
  };
};