import { useState } from "react";
import { createContext, useContext } from "react";
import { usePropiedades } from "../hooks/usePropiedades";
import { useEtiquetas } from "../hooks/useEtiquetas";
import { useAdmins } from "../hooks/useAdmin";
import { useMedias } from "../hooks/useMedias";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const propiedades = usePropiedades();
  const etiquetas = useEtiquetas();
  const admins = useAdmins();
  const medias = useMedias();

  const [mensajes, setMensajes] = useState([]);
  const [admin, setAdmin] = useState(null);

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
        mensajes,
        setMensajes,

        // Autenticación
        admin,
        setAdmin,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
