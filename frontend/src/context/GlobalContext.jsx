import { useState } from "react";
import { createContext, useContext } from "react";
import { usePropiedades } from "../hooks/usePropiedades";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {

  const propiedades = usePropiedades();
  
  // Estados globales
  const [etiquetas, setEtiquetas] = useState([
    { id: 1, nombre: "Finca", tipoEtiqueta: "propiedad" },
    { id: 2, nombre: "Casa", tipoEtiqueta: "propiedad" },
    { id: 3, nombre: "Departamento", tipoEtiqueta: "propiedad" },
    { id: 4, nombre: "Apto", tipoEtiqueta: "propiedad" },
    { id: 5, nombre: "3 baños", tipoEtiqueta: "categoria" },
    { id: 6, nombre: "5 habitaciones", tipoEtiqueta: "categoria" },
    { id: 7, nombre: "Piscina", tipoEtiqueta: "categoria" },
    { id: 8, nombre: "Asador", tipoEtiqueta: "categoria" }
  ]);

  const [mensajes, setMensajes] = useState([]);
  const [admin, setAdmin] = useState(null);
  const [administradores, setAdministradores] = useState([
    {id: 1, contraseña: "123", correo: "admin1@mail.com", nombre: "Juan Perez", usuario: "aadmin1"},
    {id: 2, contraseña: "123", correo: "admin2@mail.com", nombre: "Jhon Doe", usuario: "admin2"},
    {id: 3, contraseña: "123", correo: "admin3@mail.com", nombre: "Petro Presidente", usuario: "petro"}
  ]);

  // Función para agregar etiquetas
  const agregarEtiqueta = (nombreEtiqueta, tipoEtiqueta) => {
    const nuevaId = Math.max(...etiquetas.map(e => e.id), 0) + 1;
    const nuevaEtiqueta = { id: nuevaId, nombre: nombreEtiqueta, tipoEtiqueta };
    setEtiquetas(prev => [...prev, nuevaEtiqueta]);
    return nuevaEtiqueta;
  };

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
      etiquetas,
      setEtiquetas,
      agregarEtiqueta,
      
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