import { createContext, useContext, useState } from "react";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [propiedades, setPropiedades] = useState([
    {
      id: 1,
      titulo: "Casa en la Playa",
      codigo: "0001",
      descripcion: "Casa espectacular en la playa con muchas lindas vistas",
      areaTotal: 25.0,
      ubicacion: "Cancún, México",
      estado: "Disponible",
      imagenes: ["https://picsum.photos/300/200?random=1", "https://picsum.photos/300/200?random=2"],
      etiquetas: [1, 2, 3],
    },
    {
      id: 2,
      titulo: "Departamento en CDMX",
      codigo: "0002",
      descripcion: "Lindo Departamento en la ciudad de México",
      areaTotal: 30.0,
      ubicacion: "CDMX, México",
      estado: "En venta",
      imagenes: ["https://picsum.photos/300/200?random=2"],
      etiquetas: [4, 5],
    },
  ]);

  const [etiquetas, setEtiquetas] = useState([
    { id: 1, nombre: "3 habitaciones" },
    { id: 2, nombre: "2 baños" },
    { id: 3, nombre: "Cerca del mar" },
    { id: 4, nombre: "1 baño" },
    { id: 5, nombre: "Cerca del metro" },
  ]);

  return (
    <GlobalContext.Provider value={{ propiedades, setPropiedades, etiquetas, setEtiquetas }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
