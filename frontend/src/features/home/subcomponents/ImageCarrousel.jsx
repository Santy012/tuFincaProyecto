import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ImageCarrousel = ({ propiedad, fullSize = false, className = '', clickeable = true }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showFullscreen, setShowFullscreen] = useState(false);
  const baseUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:8080";

  // Extraer las URLs de los objetos de `imagenes`
  const images = propiedad.imagenes?.map((img) =>
    img.url.startsWith("/uploads") ? `${baseUrl}${img.url}` : img.url
  ) || ["https://picsum.photos/1200/800?random=10"];

  const hasMultipleImages = images.length > 1;

  const nextImage = (e) => {
    e?.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e) => {
    e?.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToImage = (e, index) => {
    e?.stopPropagation();
    setCurrentImageIndex(index);
  };

  const toggleFullscreen = (e) => {
    e?.stopPropagation();
    setShowFullscreen(!showFullscreen);
  };

  // Estilos condicionales
  const containerClass = fullSize 
    ? `relative w-full max-w-4xl mx-auto ${className}`
    : 'relative h-48 overflow-hidden group';

  const imageClass = fullSize
    ? 'w-full h-full object-cover cursor-pointer'
    : 'w-full h-full object-cover transition-transform duration-500 group-hover:scale-105';

  return (
    <>
      <div className={containerClass} onClick={toggleFullscreen}>
        {/* Imagen principal */}
        <img
          src={images[currentImageIndex]}
          alt={propiedad.titulo || "Propiedad"}
          className={imageClass}
          onError={(e) => {
            e.target.src = "https://picsum.photos/1200/800?random=10";
          }}
        />

        {/* Contador de fotos */}
        <div className="absolute bottom-4 right-4 bg-black/60 text-white px-2 py-1 rounded-md text-sm font-medium">
          {currentImageIndex + 1}/{images.length}
        </div>

        {/* Flechas de navegación */}
        {hasMultipleImages && (
          <>
            <button
              onClick={prevImage}
              className={`absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md ${
                fullSize ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
              } transition-opacity`}
              aria-label="Imagen anterior"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button
              onClick={nextImage}
              className={`absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md ${
                fullSize ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
              } transition-opacity`}
              aria-label="Siguiente imagen"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {/* Puntos de navegación */}
        {hasMultipleImages && (
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={(e) => goToImage(e, index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentImageIndex 
                    ? 'bg-white w-4' 
                    : 'bg-white/50 hover:bg-white/70'
                }`}
                aria-label={`Ir a la imagen ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Popup de imagen completa */}
      {clickeable && (
      <AnimatePresence>
        {showFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
            onClick={toggleFullscreen}
          >
            <div className="relative max-w-full max-h-full">
              {/* Botón de cerrar */}
              <button
                className="absolute top-4 right-4 z-10 text-white hover:text-gray-300"
                onClick={toggleFullscreen}
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Imagen en tamaño original */}
              <motion.img
                key={currentImageIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                src={images[currentImageIndex]}
                alt={propiedad.titulo || "Propiedad"}
                className="max-w-full max-h-[90vh] object-contain"
                onError={(e) => {
                  e.target.src = "https://picsum.photos/1200/800?random=10";
                }}
                onClick={(e) => e.stopPropagation()}
              />

              {/* Controles de navegación */}
              {hasMultipleImages && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      prevImage(e);
                    }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 p-3 rounded-full text-white"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      nextImage(e);
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 p-3 rounded-full text-white"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>

                  {/* Indicadores */}
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                    {images.map((_, index) => (
                      <button
                        key={index}
                        onClick={(e) => {
                          e.stopPropagation();
                          goToImage(e, index);
                        }}
                        className={`w-3 h-3 rounded-full transition-all ${
                          index === currentImageIndex 
                            ? 'bg-white w-6' 
                            : 'bg-white/50 hover:bg-white/70'
                        }`}
                        aria-label={`Ir a la imagen ${index + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      )};
    </>
  );
};

export default ImageCarrousel;