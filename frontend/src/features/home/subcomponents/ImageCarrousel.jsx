import { useState } from 'react';

const ImageCarrousel = ({ propiedad }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = propiedad.imagenes || ["https://via.placeholder.com/300x200"];
  const hasMultipleImages = images.length > 1;

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToImage = (e, index) => {
    e.stopPropagation();
    setCurrentImageIndex(index);
  };

  return (
    <div className="relative h-48 overflow-hidden group">
      {/* Imagen principal */}
      <img
        src={images[currentImageIndex]}
        alt={propiedad.titulo || "Propiedad"}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />

      {/* Contador de fotos */}
      <div className="absolute bottom-2 right-2 bg-white px-2 py-1 rounded-md text-xs font-medium">
        {currentImageIndex + 1}/{images.length}
      </div>

      {/* Flechas de navegación (solo en hover y para múltiples imágenes) */}
      {hasMultipleImages && (
        <>
          <button
            onClick={prevImage}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Imagen anterior"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={nextImage}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Siguiente imagen"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* Puntos de navegación (solo para múltiples imágenes) */}
      {hasMultipleImages && (
        <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={(e) => goToImage(e, index)}
              className={`w-2 h-2 rounded-full transition-all ${index === currentImageIndex ? 'bg-white w-3' : 'bg-white/50'}`}
              aria-label={`Ir a la imagen ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageCarrousel;