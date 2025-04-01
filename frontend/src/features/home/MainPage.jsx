import Header from "./components/Header";
import PropertyGrid from "./components/PropertyGrid";
import Footer from "./components/Footer";
import PropertyFilters from "./components/PropertyFilters";
import { useState, useEffect } from "react";
import { useGlobalContext } from "../../context/GlobalContext";

const MainPage = () => {
  const { propiedades } = useGlobalContext();
  const [filteredProperties, setFilteredProperties] = useState([]);

  // Inicializar filteredProperties con propiedades cuando estén disponibles
  useEffect(() => {
    if (propiedades) {
      setFilteredProperties(propiedades);
    }
  }, [propiedades]);

  const handleFilter = (filters) => {
    if (!propiedades) return;

    const filtered = propiedades.filter((propiedad) => {
      // Filtro por nombre (case insensitive)
      const matchesNombre = filters.nombre === "" || 
        propiedad.titulo.toLowerCase().includes(filters.nombre.toLowerCase());
      
      // Filtro por ubicación
      const matchesCodigo = filters.codigo === "" || 
        propiedad.codigo === filters.codigo;
      
      // Filtro por etiqueta (manejar null y string vacío)
      const matchesEtiqueta = filters.etiquetas.length === 0 || 
        filters.etiquetas.every(etiquetaId => 
          propiedad.etiquetas.includes(parseInt(etiquetaId))
        );
      
      return matchesNombre && matchesCodigo && matchesEtiqueta;
    });

    setFilteredProperties(filtered);
  };

  return (
    <main>
      <Header rutaLogo="src\assets\TuFincaLogo.jpeg" />
      <PropertyFilters onFilter={handleFilter} />
      <PropertyGrid propiedades={filteredProperties || []} />
      <Footer />
    </main>
  );
};

export default MainPage;