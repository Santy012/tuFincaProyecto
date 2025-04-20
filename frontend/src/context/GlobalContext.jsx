import { useState } from "react";
import { useEffect } from "react";
import { createContext, useContext } from "react";
import Cookies from "js-cookie";
import { usePropiedades } from "../hooks/usePropiedades";
import { useEtiquetas } from "../hooks/useEtiquetas";
import { useAdmins } from "../hooks/useAdmin";
import { useMedias } from "../hooks/useMedias";
import { useMensajes } from "../hooks/useMensajes";
import apiClient from "../api/apiClient";
import { jwtDecode } from 'jwt-decode';

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const propiedades = usePropiedades();
  const etiquetas = useEtiquetas();
  const admins = useAdmins();
  const medias = useMedias();
  const mensajes = useMensajes();
  const [_, forceUpdate] = useState({});

  const [admin, setAdmin] = useState(null);
  const [authLoading, setAuthLoading] = useState(true); // Nuevo estado de carga

  const loginAdmin = async (authData) => {
  try {
    const response = await admins.loginAdmin(authData);
    // Asegúrate de que la respuesta del backend incluya el ID
    const { token, id, usuario, nombre, correo } = response; 

    const expirationDate = new Date(Date.now() + 60 * 60 * 1000);

    Cookies.set('authToken', token, { expires: expirationDate });

    // Espera a que fetchAdminById obtenga los datos del administrador
    const admin_temp = await admins.fetchAdminById(id); // Usa await aquí

    const decodedToken = jwtDecode(token);
    const expiresIn = decodedToken.exp * 1000 - Date.now(); // Milisegundos restantes

    setTimeout(() => {
      logoutAdmin();
    }, expiresIn);

    // Ahora puedes acceder a admin_temp.contraseña
    setAdmin({ 
      id, 
      usuario, 
      nombre, 
      correo, 
      contraseña: admin_temp.contraseña, // Incluye la contraseña
      mensajes: admin_temp.mensajes // Incluye los mensajes
    });

    return response;
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    throw error;
  } finally {
    setAuthLoading(false);
  }
};


useEffect(() => {
  const token = Cookies.get("authToken");
  if (token) {

    const decoded = jwtDecode(token);
    const expiresIn = decoded.exp * 1000 - Date.now();
    if (expiresIn <= 0) {
      logoutAdmin();
    } else {
      setTimeout(logoutAdmin, expiresIn);
      // además podrías volver a cargar los datos de admin aquí
    }

    apiClient
      .get("/auth/validate-token")
      .then(async (res) => {
        // Usa fetchAdminById para obtener los datos completos del administrador
        const admin_temp = await admins.fetchAdminById(res.id);

        // Guarda los datos completos del administrador en el estado global
        setAdmin({
          id: admin_temp.id,
          usuario: admin_temp.usuario,
          nombre: admin_temp.nombre,
          correo: admin_temp.correo,
          contraseña: admin_temp.contraseña, // Incluye la contraseña
          mensajes: admin_temp.mensajes, // Incluye los mensajes
        });
      })
      .catch((err) => {
        Cookies.remove("authToken");
        setAdmin(null);
      })
      .finally(() => {
        setAuthLoading(false);
      });
  } else {
    setAuthLoading(false);
  }
}, []);

  const logoutAdmin = () => {
    Cookies.remove("authToken");
    setAdmin(null);
    forceUpdate({});
  };

  return (
    <GlobalContext.Provider
      value={{
        // Propiedades
        propiedades: propiedades.propiedades,
        allProperties: propiedades.allProperties,
        setPropiedades: propiedades.setPropiedades,
        crearPropiedad: propiedades.crearPropiedad,
        actualizarPropiedad: propiedades.actualizarPropiedad,
        eliminarPropiedad: propiedades.eliminarPropiedad,
        loadingPropiedades: propiedades.loading,
        errorPropiedades: propiedades.error,
        reloadPropiedades: propiedades.reloadData,
        loadPaginatedData: propiedades.loadPaginatedData,
        applyFilters: propiedades.applyFilters,
        currentFilters: propiedades.currentFilters,
        pagination: propiedades.pagination,
        resetErrorPropiedades: propiedades.resetError,

        // Etiquetas
        etiquetas: etiquetas.etiquetas,
        setEtiquetas: etiquetas.setEtiquetas,
        crearEtiqueta: etiquetas.crearEtiqueta,
        actualizarEtiqueta: etiquetas.actualizarEtiqueta,
        eliminarEtiqueta: etiquetas.eliminarEtiqueta,
        loadingEtiquetas: etiquetas.loading,
        errorEtiquetas: etiquetas.error,
        reloadEtiquetas: etiquetas.fetchEtiquetas,

        // Admins
        admins: admins.admins,
        setAdmins: admins.setAdmins,
        fetchAdmins: admins.fetchAdmins,
        fetchAdminById: admins.fetchAdminById,
        registerAdmin: admins.saveAdmin,
        updateAdmin: admins.updateAdmin,
        deleteAdmin: admins.deleteAdmin,
        loadingAdmins: admins.loading,
        errorAdmins: admins.error,
        resetErrorAdmins: admins.resetError,

        //Medias
        medias: medias.medias,
        setMedias: medias.setMedias,
        uploadMedia: medias.uploadMedia,
        fetchAllMedia: medias.fetchAllMedia,
        fetchMediaById: medias.fetchMediaById,
        createMedia: medias.createMedia,
        deleteMedia: medias.deleteMedia,
        loadingMedias: medias.loading,
        errorMedias: medias.error,
        resetErrorMedias: medias.resetError,

        // Mensajes
        mensajes: mensajes.mensajes,
        loadingMensajes: mensajes.loading,
        errorMensajes: mensajes.error,
        crearMensaje: mensajes.crearMensaje,
        actualizarMensaje: mensajes.actualizarMensaje,
        eliminarMensaje: mensajes.eliminarMensaje,
        fetchMensajes: mensajes.fetchMensajes,
        reloadMensajes: mensajes.reloadData,

        // Autenticación
        admin,
        setAdmin,
        loginAdmin,
        logoutAdmin,
        authLoading, // Exponemos el estado authLoading
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);