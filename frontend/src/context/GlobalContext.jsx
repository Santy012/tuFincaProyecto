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
      areaConstruida:null,
      ubicacion: "Cancún, México",
      estado: "Disponible",
      imagenes: ["https://picsum.photos/1200/800?random=1", "https://picsum.photos/1200/800?random=2", "https://picsum.photos/1200/800?random=3", "https://picsum.photos/1200/800?random=4", "https://picsum.photos/1200/800?random=5"],
      etiquetas: [1, 2, 3],
    },
    {
      id: 2,
      titulo: "Departamento en CDMX",
      codigo: "0002",
      descripcion: "Lindo Departamento en la ciudad de México",
      areaTotal: 30.0,
      areaConstruida:10.5,
      ubicacion: "CDMX, México",
      estado: "En venta",
      imagenes: ["https://picsum.photos/1200/800?random=6", "https://picsum.photos/1200/800?random=7"],
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
    { id: 1, nombreCliente: "santi", apellidoCliente: "gay", celular: "123", correo: "q@gay", propiedad_id: 1, detalle: "This is the very last song on the album, and these are the very last lyrics in that song. I believe this lyric sums up the album and Taylor’s discography as a whole. If you think about it, you’ll understand just what this song is about.To me, this lyric means that once Taylor has written about her experiences and put her records out, the story becomes all of ours as well. I’m sure there’s more pages missing from the manuscript than we know, but I consider it a great privilege to have been given as much as we have.", gestion: "porLeer" },
    { id: 2, nombreCliente: "cata", apellidoCliente: "linda", celular: "123", correo: "aa@gay", propiedad_id: 2, detalle: "bb bbb aaaaa aaaaaaaaaaaaa aa aaaaa aaaaaa", gestion: "porLeer" },
    { id: 3, nombreCliente: "millis", apellidoCliente: "gay", celular: "123", correo: "cc@gay", propiedad_id: null, detalle: "This is the very last song on the album, and these are the very last lyrics in that song. I believe this lyric sums up the album and Taylor’s discography as a whole. If you think about it, you’ll understand just what this song is about.To me, this lyric means that once Taylor has written about her experiences and put her records out, the story becomes all of ours as well. I’m sure there’s more pages missing from the manuscript than we know, but I consider it a great privilege to have been given as much as we have.", gestion: "realizado" },
    { id: 4, nombreCliente: "nicooo", apellidoCliente: "pro", celular: "123", correo: "q@gay", propiedad_id: 1,detalle: "aaaaaaaa aaaaa aaaa zzzz zzz aaaaaaaaa aa aaaaa aaaaaa", gestion: "realizado" },
  ]);

  const [admin, setAdmin] = useState(null); 

  const [administradores, setAdministradores] = useState([
    {id: 1, contraseña: "123", correo: "q@gay", nombre: "user", usuario: "tu_usuario"},
    {id: 2, contraseña: "123", correo: "xxs@xd", nombre: "cata", usuario: "cata"},
    {id: 3, contraseña: "123", correo: "camiloesgay@xd", nombre: "camilo", usuario: "camilo"}
  ]);
  

  const actualizarPropiedad = (id, nuevaPropiedad) => {
    setPropiedades((prev) =>
      prev.map((prop) => (prop.id === id ? { ...prop, ...nuevaPropiedad } : prop))
    );
  };

  // Función para agregar una nueva etiqueta globalmente
  const agregarNuevaEtiquetaGlobal = (nombreEtiqueta) => {
    // Validar que no exista ya
    if (etiquetas.some(e => e.nombre.toLowerCase() === nombreEtiqueta.toLowerCase())) {
      return { error: "Esta etiqueta ya existe" };
    }

    // Crear nueva etiqueta con ID único
    const nuevaId = Math.max(...etiquetas.map(e => e.id), 0) + 1;
    const nuevaEtiqueta = { id: nuevaId, nombre: nombreEtiqueta };
    
    // Actualizar el estado global
    setEtiquetas(prev => [...prev, nuevaEtiqueta]);
    
    return nuevaEtiqueta;
  };

  return (
    <GlobalContext.Provider value={{ 
      propiedades, 
      setPropiedades, 
      etiquetas, 
      setEtiquetas, 
      actualizarPropiedad, 
      mensajes, 
      setMensajes, 
      admin, 
      setAdmin,
      administradores, // Añade esto
      setAdministradores, // Añade esto
      agregarNuevaEtiquetaGlobal // Añadir esta función al contexto
    }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
