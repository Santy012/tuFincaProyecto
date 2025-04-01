import { createContext, useContext, useState } from "react";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [propiedades, setPropiedades] = useState([
    {
      id: 1,
      titulo: "Oportunidad Única en el Centro de Guatavita ",
      codigo: "0005",
      descripcion: "Casa de dos niveles con 3 locales comerciales con gran potencial de renta, 4 habitaciones amplias y cómodas, 3 baños bien distribuidos, sala-comedor espaciosa, cocina funcional, patio de ropas. Vista privilegiada al parque principal de Guatavita.",
      areaTotal: 238.80,
      areaConstruida: null,
      ubicacion: "Guatavita, Cundinamarca",
      estado: "Disponible",
      imagenes: ["https://picsum.photos/1200/800?random=1", "https://picsum.photos/1200/800?random=2", "https://picsum.photos/1200/800?random=3", "https://picsum.photos/1200/800?random=4", "https://picsum.photos/1200/800?random=5"],
      etiquetas: [1, 2, 3, 4],
    },
    {
      id: 2,
      titulo: "Oportunidad de Apartamento en Tocancipá ",
      codigo: "0008",
      descripcion: "Habitación principal con baño privado y vestier, habitación secundaria ideal para familia o estudio, sala-comedor con excelente iluminación, cocina integral con horno y barra americana, zona de ropas independiente, balcón con vista exterior, parqueadero incluido. Amenidades del conjunto: piscina, zona BBQ, salón de eventos, gimnasio, ascensor en la torre.",
      areaTotal: 51.23 ,
      areaConstruida: 100.0,
      ubicacion: "Tocancipa, Cundinamarca",
      estado: "En venta",
      imagenes: ["https://picsum.photos/1200/800?random=6", "https://picsum.photos/1200/800?random=7"],
      etiquetas: [5, 6, 7],
    },
  ]);

  const [etiquetas, setEtiquetas] = useState([
    { id: 1, nombre: "4 habitaciones" },
    { id: 2, nombre: "3 baños" },
    { id: 3, nombre: "2 niveles" },
    { id: 4, nombre: "casa" },
    { id: 5, nombre: "apartamento" },
    { id: 6, nombre: "piscina" },
    { id: 7, nombre: "zona BBQ" },
  ]);

  const [mensajes, setMensajes] = useState([
    { id: 1, nombreCliente: "santi", apellidoCliente: "gay", celular: "123", correo: "q@gay", detalle: "This is the very last song on the album, and these are the very last lyrics in that song. I believe this lyric sums up the album and Taylor’s discography as a whole. If you think about it, you’ll understand just what this song is about.To me, this lyric means that once Taylor has written about her experiences and put her records out, the story becomes all of ours as well. I’m sure there’s more pages missing from the manuscript than we know, but I consider it a great privilege to have been given as much as we have.", gestion: "porLeer" },
    { id: 2, nombreCliente: "cata", apellidoCliente: "linda", celular: "123", correo: "aa@gay", detalle: "bb bbb aaaaa aaaaaaaaaaaaa aa aaaaa aaaaaa", gestion: "porLeer" },
    { id: 3, nombreCliente: "millis", apellidoCliente: "gay", celular: "123", correo: "cc@gay", detalle: "This is the very last song on the album, and these are the very last lyrics in that song. I believe this lyric sums up the album and Taylor’s discography as a whole. If you think about it, you’ll understand just what this song is about.To me, this lyric means that once Taylor has written about her experiences and put her records out, the story becomes all of ours as well. I’m sure there’s more pages missing from the manuscript than we know, but I consider it a great privilege to have been given as much as we have.", gestion: "realizado" },
    { id: 1, nombreCliente: "nicooo", apellidoCliente: "pro", celular: "123", correo: "q@gay", detalle: "aaaaaaaa aaaaa aaaa zzzz zzz aaaaaaaaa aa aaaaa aaaaaa", gestion: "realizado" },
  ]);

  const [admin, setAdmin] = useState({
    id: 1,
    contraseña: "123",
    correo: "q@gay",
    nombre: "user",
    usuario: "tu_usuario",
  });
  

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
      agregarNuevaEtiquetaGlobal // Añadir esta función al contexto
    }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
