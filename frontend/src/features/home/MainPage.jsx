import Header from "./components/Header";
import PropertyGrid from "./components/PropertyGrid";
import Footer from "./components/Footer";
import PropertyFilters from "./components/PropertyFilters";
import { useGlobalContext } from "../../context/GlobalContext";
import ErrorMessage from "../../components/ErrorMessage";
import Pagination from "../../components/Pagination";
import { useState, useCallback, useEffect } from "react";
import { debounce } from 'lodash';

const MainPage = () => {
  const {
    propiedades,
    allProperties,
    errorPropiedades,
    reloadPropiedades,
    resetErrorPropiedades,
    etiquetas,
    loadPaginatedData,
    pagination,
    applyFilters,
    currentFilters,
    setDefaultFilters
  } = useGlobalContext();

  const [isLoading, setIsLoading] = useState(false);
  

  useEffect(() => {
    setDefaultFilters({ estado: 'disponible' });
    loadPaginatedData(0, pagination.pageSize, {}, true); // true para usar filtros por defecto
  }, []);

  // Versión debounceada con cancelación
  const debouncedLoadData = useCallback(debounce(async (newPage) => {
    try {
      setIsLoading(true);
      await loadPaginatedData(
        newPage, 
        pagination.pageSize, 
        currentFilters,
        true
      );
    } catch (err) {
      if (err.name !== 'AbortError') {
        console.error('Error loading data:', err);
      }
    } finally {
      setIsLoading(false);
    }
  }, 500), [loadPaginatedData, pagination.pageSize, currentFilters]);

  const handlePageChange = useCallback((newPage) => {
    if (isLoading) return;

    // Hacer scroll hacia la parte superior
    window.scrollTo({
      top: 0
    });

    debouncedLoadData(newPage);
  }, [debouncedLoadData, isLoading]);

  // Manejar filtros
  const handleFilter = (filters) => {
    applyFilters(filters);
  };

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
        propiedades={allProperties}
      />
      <PropertyGrid propiedades={propiedades} pagination={pagination} />
      <Pagination
        currentPage={pagination.currentPage}
        totalPages={pagination.totalPages}
        onPageChange={handlePageChange}
      />
      <Footer />
    </main>
  );
};

export default MainPage;
