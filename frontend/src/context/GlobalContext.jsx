import { useState } from "react";
import { createContext, useContext } from "react";
import { usePropiedades } from "../hooks/usePropiedades";
import { useEtiquetas } from "../hooks/useEtiquetas";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {

  const propiedades = usePropiedades();
  const etiquetas = useEtiquetas();

  const [mensajes, setMensajes] = useState([]);
  const [admin, setAdmin] = useState(null);
  const [administradores, setAdministradores] = useState([
    {id: 1, contraseña: "123", correo: "admin1@mail.com", nombre: "Juan Perez", usuario: "aadmin1"},
    {id: 2, contraseña: "123", correo: "admin2@mail.com", nombre: "Jhon Doe", usuario: "admin2"},
    {id: 3, contraseña: "123", correo: "admin3@mail.com", nombre: "Petro Presidente", usuario: "petro"}
  ]);

  return (
    <GlobalContext.Provider value={{ 
      // Propiedades
      propiedades: propiedades.propiedades,
      setPropiedades: propiedades.setPropiedades,
      actualizarPropiedad: propiedades.actualizarPropiedad,
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
      
      // Mensajes
      mensajes,
      setMensajes,
      
      // Autenticación
      admin,
      setAdmin,
      administradores,
      setAdministradores
    }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);