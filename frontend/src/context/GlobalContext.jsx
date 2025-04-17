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

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const propiedades = usePropiedades();
  const etiquetas = useEtiquetas();
  const admins = useAdmins();
  const medias = useMedias();
  const mensajes = useMensajes();
  const [_, forceUpdate] = useState({});

  const [admin, setAdmin] = useState(null);

  const loginAdmin = async (authData) => {
    try {
      const response = await admins.loginAdmin(authData);
      const { token, ...adminData } = response;
      Cookies.set('authToken', token, { expires: 1 });
      setAdmin({ ...adminData, token });
      return response;
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      throw error;
    }
  };

  useEffect(() => {
    const token = Cookies.get("authToken");
    if (token) {
      apiClient
        .get("/auth/validate-token")
        .then((res) => {
          setAdmin({ token });
        })
        .catch((err) => {
          Cookies.remove("authToken");
          setAdmin(null);
        });
    } else {
      console.log("No se encontró token al cargar."); // <--- Añade este log
    }
  }, []);

  const logoutAdmin = () => {
    Cookies.remove("authToken"); // Elimina la cookie del token
    setAdmin(null); // Limpia el estado del admin
    forceUpdate({});
  };

  return (
    <GlobalContext.Provider
      value={{
        // Propiedades
        propiedades: propiedades.propiedades,
        setPropiedades: propiedades.setPropiedades,
        crearPropiedad: propiedades.crearPropiedad,
        actualizarPropiedad: propiedades.actualizarPropiedad,
        eliminarPropiedad: propiedades.eliminarPropiedad,
        loadingPropiedades: propiedades.loading,
        errorPropiedades: propiedades.error,
        reloadPropiedades: propiedades.reloadData,
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
        createAdmin: admins.createAdmin,
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
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
