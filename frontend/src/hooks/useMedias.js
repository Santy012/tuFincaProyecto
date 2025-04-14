import { useState, useEffect } from 'react';
import { useAsyncHandler } from './useAsyncHandler';
import { 
  saveMedia,
  getMedia,
  getAllMedia,
  deleteMedia,
  uploadMedia as uploadMediaAPI
} from '../api/medias';

export const useMedias = () => {
  const [medias, setMedias] = useState([]);
  const asyncHandler = useAsyncHandler();

  const fetchAllMedia = async () => {
    return asyncHandler.execute(async () => {
      const response = await getAllMedia();
      setMedias(response || []);
      return response;
    });
  };

  const fetchMediaById = async (id) => {
    return asyncHandler.execute(async () => {
      const response = await getMedia(id);
      return response;
    });
  };

  const createMedia = async (mediaData) => {
    return asyncHandler.execute(async () => {
      const response = await saveMedia(mediaData);
      setMedias(prev => [...prev, response]);
      return response;
    });
  };

  const removeMedia = async (id) => {
    return asyncHandler.execute(async () => {
      await deleteMedia(id);
      setMedias(prev => prev.filter(media => media.id !== id));
      return id;
    });
  };

  const uploadMedia = async (files, propiedadId) => {
    return asyncHandler.execute(async () => {
      const response = await uploadMediaAPI(files, propiedadId);
      console.log("Medias subidas:", response); // Depuración
  
      // Verifica si la respuesta es un array
      if (!Array.isArray(response)) {
        throw new Error("La respuesta del backend no es un array");
      }
  
      setMedias((prev) => [...prev, ...response]); // Agregar las medias subidas al estado
      return response;
    });
  };

  useEffect(() => {
    fetchAllMedia();
  }, []);

  return {
    medias,
    setMedias,
    uploadMedia,
    fetchAllMedia,
    fetchMediaById,
    createMedia,
    deleteMedia: removeMedia,
    loading: asyncHandler.loading,
    error: asyncHandler.error,
    resetError: asyncHandler.resetError
  };
};