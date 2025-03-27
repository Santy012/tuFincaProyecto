import { useState } from "react";
import PropiedadCard from "./components/PropiedadCard";
import PopUpDetalles from "./components/PopUpDetalles";

const ListaPropiedades = () => {
  const [propiedadSeleccionada, setPropiedadSeleccionada] = useState(null);

  const propiedades = [
    {
      id: 1,
      titulo: "Casa en la Playa",
      codigo: "0001",
      descripcion: "Casa espectacular en la playa con muchas lindas vistas",
      areaTotal: 25.0,
      areaConstruida: null,
      ubicacion: "Cancún, México",
      estado: "Disponible",
      imagenes: ["https://picsum.photos/300/200?random=1", "https://picsum.photos/300/200?random=2"],
      etiquetas: ["3 habitaciones", "2 baños", "Cerca del mar"],
    },
    {
      id: 2,
      titulo: "Departamento en CDMX",
      codigo: "0002",
      descripcion: "Lindo Departamento en la ciudad de mexico",
      areaTotal: 25.0,
      areaConstruida: 30.0,
      ubicacion: "Ciudad de México, México",
      estado: "En venta",
      imagenes: ["https://picsum.photos/300/200?random=3", "https://picsum.photos/300/200?random=4", "https://picsum.photos/300/200?random=5"],
      etiquetas: ["2 habitaciones", "1 baño", "Cerca del metro"],
    },
  ];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Lista de Propiedades</h1>

      {propiedades.length === 0 ? (
        <p className="text-gray-500">No hay propiedades disponibles.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {propiedades.map((propiedad) => (
            <PropiedadCard
              key={propiedad.id}
              propiedad={propiedad}
              onClick={() => setPropiedadSeleccionada(propiedad)}
            />
          ))}
        </div>
      )}

      {/* Popup de Detalles */}
      {propiedadSeleccionada && (
        <PopUpDetalles
          propiedadSeleccionada={propiedadSeleccionada}
          setPropiedadSeleccionada={setPropiedadSeleccionada}
        />
      )}
    </div>
  );
};

export default ListaPropiedades;
