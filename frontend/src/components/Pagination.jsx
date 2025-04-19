import React from "react";

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  className = "",
}) => {
  // Convertir a números y establecer valores por defecto
  const current = Number(currentPage) || 0;
  const total = Number(totalPages) || 1;

  if (total <= 1) return null;

  return (
    <div className={`flex justify-center items-center m-8 ${className}`}>
      <nav className="flex items-center gap-2">
        {/* Botón para ir a la primera página */}
        <button
          onClick={() => onPageChange(0)}
          disabled={current === 0}
          className={`px-3 py-2 rounded-lg border transition-all ${
            current === 0
              ? "bg-gray-200 text-gray-400 cursor-not-allowed border-gray-300 opacity-50"
              : "bg-white text-gray-600 hover:bg-blue-100 hover:text-blue-600 border-gray-300"
          }`}
        >
          «
        </button>

        {/* Botón para ir a la página anterior */}
        <button
          onClick={() => onPageChange(current - 1)}
          disabled={current === 0}
          className={`px-3 py-2 rounded-lg border transition-all ${
            current === 0
              ? "bg-gray-200 text-gray-400 cursor-not-allowed border-gray-300 opacity-50"
              : "bg-white text-gray-600 hover:bg-blue-100 hover:text-blue-600 border-gray-300"
          }`}
        >
          ‹
        </button>

        {/* Botones de paginación */}
        {Array.from({ length: Math.min(5, total) }, (_, i) => {
          let pageNum;
          if (total <= 5) {
            pageNum = i;
          } else if (current <= 2) {
            pageNum = i;
          } else if (current >= total - 3) {
            pageNum = total - 5 + i;
          } else {
            pageNum = current - 2 + i;
          }

          return (
            <button
              key={pageNum}
              onClick={() => onPageChange(pageNum)}
              className={`px-3 py-2 rounded-lg border transition-all ${
                current === pageNum
                  ? "bg-blue-500 text-white border-blue-500"
                  : "bg-white text-gray-600 hover:bg-blue-100 hover:text-blue-600 border-gray-300"
              }`}
            >
              {pageNum + 1}
            </button>
          );
        })}

        {/* Botón para ir a la página siguiente */}
        <button
          onClick={() => onPageChange(current + 1)}
          disabled={current === total - 1}
          className={`px-3 py-2 rounded-lg border transition-all ${
            current === total - 1
              ? "bg-gray-200 text-gray-400 cursor-not-allowed border-gray-300 opacity-50"
              : "bg-white text-gray-600 hover:bg-blue-100 hover:text-blue-600 border-gray-300"
          }`}
        >
          ›
        </button>

        {/* Botón para ir a la última página */}
        <button
          onClick={() => onPageChange(total - 1)}
          disabled={current === total - 1}
          className={`px-3 py-2 rounded-lg border transition-all ${
            current === total - 1
              ? "bg-gray-200 text-gray-400 cursor-not-allowed border-gray-300 opacity-50"
              : "bg-white text-gray-600 hover:bg-blue-100 hover:text-blue-600 border-gray-300"
          }`}
        >
          »
        </button>
      </nav>

      {/* Información de la página actual - Usamos las variables convertidas */}
      <div className="ml-4 text-sm text-gray-600">
        Página <span className="font-semibold">{current + 1}</span> de{" "}
        <span className="font-semibold">{total}</span>
      </div>
    </div>
  );
};

export default Pagination;