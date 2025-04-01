import { createContext, useContext, useState } from "react";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [propiedades, setPropiedades] = useState([
    {
      id: 1,
      titulo: "Casa hermosa en Guatavita",
      codigo: "0001",
      descripcion: "Casa espectacular en medio del pueblito con muchas lindas vistas",
      areaTotal: 25.0,
      areaConstruida:null,
      ubicacion: "Guatavita, Colombia",
      estado: "Disponible",
      imagenes: ["https://picsum.photos/1200/800?random=1", "https://picsum.photos/1200/800?random=2", "https://picsum.photos/1200/800?random=3", "https://picsum.photos/1200/800?random=4", "https://picsum.photos/1200/800?random=5"],
      etiquetas: [1, 2, 3],
    },
    {
      id: 2,
      titulo: "Apto mediano en la ciudad de Bogota",
      codigo: "0002",
      descripcion: "Lindo Departamento en la ciudad de Bogota, con vista a la montaña",
      areaTotal: 30.0,
      ubicacion: "Bogotá, Colombia",
      estado: "Vendido",
      imagenes: ["https://picsum.photos/300/200?random=6", "https://picsum.photos/300/200?random=7"],
      etiquetas: [3, 4, 5],
    },
  ]);

  const [etiquetas, setEtiquetas] = useState([
    { id: 1, nombre: "Arriendo" },
    { id: 2, nombre: "Finca" },
    { id: 3, nombre: "Colombia" },
    { id: 4, nombre: "En venta" },
    { id: 5, nombre: "Apto" },
  ]);

  const [mensajes, setMensajes] = useState([
    { id: 1, nombreCliente: "Cliente1", apellidoCliente: "Apellido Cliente 1", celular: "311123456", propiedad_id: 1, correo: "correo_ejemplo@gmail.com", detalle: "Hola, este es un ejemplo de un posible mensaje que un cliente puede llegar a enviar, de esta manera, el cliente comunica todas las dudas puntuales respecto a una o varias propiedades, y el admin, de manera fácil y ágil, puede revisar y tener en cuenta las dudas antes de contactarse de vuelta con el cliente, para así tener un mejor orden. EL mensaje puede ser tan extenso como el cliente desee", gestion: "porLeer" },
    { id: 2, nombreCliente: "Cliente2", apellidoCliente: "Apellido Cliente 2", celular: "3223456678", propiedad_id: 2,correo: "correo1_ejemplo@gmail.com", detalle: "Buenos días, este es otro ejemplo diferente de un posible mensaje que un cliente puede llegar a enviar, de esta manera, el cliente comunica todas las dudas puntuales respecto a una o varias propiedades, y el admin, de manera fácil y ágil, puede revisar y tener en cuenta las dudas antes de contactarse de vuelta con el cliente, para así tener un mejor orden. EL mensaje puede ser tan extenso como el cliente desee", gestion: "porLeer" },
    { id: 3, nombreCliente: "Cliente3", apellidoCliente: "Apellido Cliente 3", celular: "33312343122", propiedad_id: null,correo: "correo2_ejemplo@gmail.com", detalle: "Buenas noches, este es otro ejemplo diferente de un posible mensaje que un cliente puede llegar a enviar, de esta manera, el cliente comunica todas las dudas puntuales respecto a una o varias propiedades, y el admin, de manera fácil y ágil, puede revisar y tener en cuenta las dudas antes de contactarse de vuelta con el cliente, para así tener un mejor orden. EL mensaje puede ser tan extenso como el cliente desee", gestion: "realizado" },
    { id: 1, nombreCliente: "Cliente4", apellidoCliente: "Apellido Cliente 4", celular: "31044323443", propiedad_id: 1, correo: "correo3_ejemplo@gmail.com", detalle: "Hola Hola!!!, Buenas noches, este es otro ejemplo diferente de un posible mensaje que un cliente puede llegar a enviar, de esta manera, el cliente comunica todas las dudas puntuales respecto a una o varias propiedades, y el admin, de manera fácil y ágil, puede revisar y tener en cuenta las dudas antes de contactarse de vuelta con el cliente, para así tener un mejor orden. EL mensaje puede ser tan extenso como el cliente desee", gestion: "realizado" },
  ]);

  const [admin, setAdmin] = useState(null); 

  const [administradores, setAdministradores] = useState([
    {id: 1, contraseña: "123", correo: "admin1@mail.com", nombre: "Juan Perez", usuario: "aadmin1"},
    {id: 2, contraseña: "123", correo: "admin2@mail.com", nombre: "Jhon Doe", usuario: "admin2"},
    {id: 3, contraseña: "123", correo: "admin3@mail.com", nombre: "Petro Presidente", usuario: "petro"}
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
