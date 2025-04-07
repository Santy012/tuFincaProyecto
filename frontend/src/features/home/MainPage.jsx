import Header from "./components/Header";
import PropertyGrid from "./components/PropertyGrid";
import Footer from "./components/Footer";
import PropertyFilters from "./components/PropertyFilters";
import { useState, useEffect } from "react";
import { useGlobalContext } from "../../context/GlobalContext";
import LoadingSpinner from "../../components/LoadingSpinner";
import ErrorMessage from "../../components/ErrorMessage";

const MainPage = () => {
  const { 
    propiedades,
    loadingPropiedades,
    errorPropiedades,
    reloadPropiedades,
    resetErrorPropiedades,
    etiquetas
  } = useGlobalContext();
  
  const [filteredProperties, setFilteredProperties] = useState([]);

  // Inicializar filteredProperties con propiedades disponibles
  useEffect(() => {
    if (propiedades && !loadingPropiedades) {
      const propiedadesDisponibles = propiedades.filter(
        propiedad => propiedad.estado === "disponible"
      );
      setFilteredProperties(propiedadesDisponibles);
    }
  }, [propiedades, loadingPropiedades]);

  const handleFilter = (filters) => {
    if (!propiedades || loadingPropiedades) return;
  
    const filtered = propiedades.filter((propiedad) => {
      if (propiedad.estado !== "disponible") return false;
      
      // Filtros
      const matchesNombre = filters.nombre === "" || 
        propiedad.titulo.toLowerCase().includes(filters.nombre.toLowerCase());
      const matchesCodigo = filters.codigo === "" || 
        propiedad.codigo === filters.codigo;
      const matchesUbicacion = filters.ubicacion === "" || 
        propiedad.ubicacion === filters.ubicacion;
      const matchesTipoPropiedad = filters.tipoPropiedad === "" || 
        propiedad.etiquetas.includes(parseInt(filters.tipoPropiedad));
      const matchesEtiqueta = filters.etiquetas.length === 0 || 
        filters.etiquetas.every(etiquetaId => 
          propiedad.etiquetas.includes(parseInt(etiquetaId))
        );
      
      return matchesNombre && matchesCodigo && matchesUbicacion && 
             matchesTipoPropiedad && matchesEtiqueta;
    });
  
    setFilteredProperties(filtered);
  };

  if (loadingPropiedades) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner message="Cargando propiedades..." />
      </div>
    );
  }

  if (errorPropiedades) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <ErrorMessage 
          message={errorPropiedades} 
          onRetry={() => {
            resetErrorPropiedades();
            reloadPropiedades();
          }} 
          retryText="Volver a cargar propiedades"
        />
      </div>
    );
  }

  return (
    <main>
      <Header rutaLogo="src/assets/TuFincaLogo.jpeg" />
      <PropertyFilters 
        onFilter={handleFilter} 
        etiquetas={etiquetas} 
      />
      <PropertyGrid propiedades={filteredProperties} />
      <Footer />
    </main>
  );
};

export default MainPage;