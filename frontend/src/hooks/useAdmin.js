// src/hooks/useAdmins.js
import { useState, useEffect } from 'react';
import { useAsyncHandler } from './useAsyncHandler';
import { 
  getAdmins,
  getAdminById,
  createAdmin,
  updateAdmin,
  deleteAdmin
} from '../api/admin';

export const useAdmins = () => {
  const [admins, setAdmins] = useState([]);
  const asyncHandler = useAsyncHandler();

  // Obtener todos los administradores
  const fetchAdmins = async () => {
    return asyncHandler.execute(async () => {
      const response = await getAdmins();
      setAdmins(response || []);
      return response;
    });
  };

  // Obtener un administrador por ID
  const fetchAdminById = async (id) => {
    return asyncHandler.execute(async () => {
      const response = await getAdminById(id);
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
    updateAdmin: updateAdminData,
    deleteAdmin: deleteAdminData,
    loading: asyncHandler.loading,
    error: asyncHandler.error,
    resetError: asyncHandler.resetError
  };
};