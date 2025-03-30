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
      imagenes: ["https://picsum.photos/300/200?random=1", "https://picsum.photos/300/200?random=2", "https://picsum.photos/300/200?random=1", "https://picsum.photos/300/200?random=2", "https://picsum.photos/300/200?random=2"],
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

  const [mensajes, setMensajes] = useState([
    { id: 1, nombreCliente: "santi", apellidoCliente: "gay", celular: "123", correo: "q@gay", detalle: "aaaaaaaa aaaaa aaaaaaaaaaaaa aa aaaaa aaaaaa", gestion: "porLeer" },
    { id: 2, nombreCliente: "cata", apellidoCliente: "linda", celular: "123", correo: "aa@gay", detalle: "bb bbb aaaaa aaaaaaaaaaaaa aa aaaaa aaaaaa", gestion: "porLeer" },
    { id: 3, nombreCliente: "millis", apellidoCliente: "gay", celular: "123", correo: "cc@gay", detalle: "aaaa aaaaa aaaaaaaaaaaaa aa aaaaa aaaaaa", gestion: "realizado" },
    { id: 1, nombreCliente: "nicooo", apellidoCliente: "pro", celular: "123", correo: "q@gay", detalle: "aaaaaaaa aaaaa aaaa zzzz zzz aaaaaaaaa aa aaaaa aaaaaa", gestion: "realizado" },
  ]);

  const actualizarPropiedad = (id, nuevaPropiedad) => {
    setPropiedades((prev) =>
      prev.map((prop) => (prop.id === id ? { ...prop, ...nuevaPropiedad } : prop))
    );
  };

  return (
    <GlobalContext.Provider value={{ propiedades, setPropiedades, etiquetas, setEtiquetas, actualizarPropiedad, mensajes, setMensajes }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
