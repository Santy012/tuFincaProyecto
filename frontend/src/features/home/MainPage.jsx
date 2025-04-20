import Header from "./components/Header";
import PropertyGrid from "./components/PropertyGrid";
import Footer from "./components/Footer";
import PropertyFilters from "./components/PropertyFilters";
import { useState, useEffect } from "react";
import { useGlobalContext } from "../../context/GlobalContext";
import LoadingSpinner from "../../components/LoadingSpinner";
import ErrorMessage from "../../components/ErrorMessage";
import Pagination from "../../components/Pagination";

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
    currentFilters
  } = useGlobalContext();

  const handlePageChange = (newPage) => {
    loadPaginatedData(newPage, pagination.pageSize, currentFilters);
  };

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
