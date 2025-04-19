import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ImageCarrousel = ({ propiedad, fullSize = false, className = '', clickeable = true }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showFullscreen, setShowFullscreen] = useState(false);
  const baseUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:8080";

  // Función para determinar si un media es un video
  const isVideo = (media) => {
    if (!media) return false;
    
    // Si es un objeto con propiedad tipo
    if (typeof media === 'object' && media.tipo === 'video') {
      return true;
    }
    
    // Si es un objeto con URL de video
    if (typeof media === 'object' && media.url) {
      const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov'];
      return videoExtensions.some(ext => media.url.toLowerCase().endsWith(ext));
    }
    
    return false;
  };

  // Procesar los medios (imágenes y videos)
  const mediaItems = propiedad.imagenes?.map(media => ({
    ...media,
    url: media.url?.startsWith("/uploads") ? `${baseUrl}${media.url}` : media.url,
    isVideo: isVideo(media)
  })) || [{ 
    url: "https://picsum.photos/1200/800?random=10", 
    isVideo: false 
  }];

  const hasMultipleItems = mediaItems.length > 1;

  const nextItem = (e) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % mediaItems.length);
  };

  const prevItem = (e) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + mediaItems.length) % mediaItems.length);
  };

  const goToItem = (e, index) => {
    e?.stopPropagation();
    setCurrentIndex(index);
  };

  const toggleFullscreen = (e) => {
    e?.stopPropagation();
    setShowFullscreen(!showFullscreen);
  };

  // Estilos condicionales
  const containerClass = fullSize 
    ? `relative w-full max-w-4xl mx-auto ${className}`
    : 'relative h-48 overflow-hidden group';

  const mediaClass = fullSize
    ? 'w-full h-full object-cover cursor-pointer'
    : 'w-full h-full object-cover transition-transform duration-500 group-hover:scale-105';

  const currentMedia = mediaItems[currentIndex];

  const renderMedia = (media, isFullscreen = false) => {
    if (!media) return null;

    if (media.isVideo) {
      return (
        <div className={`w-full ${isFullscreen ? 'h-[90vh]' : 'h-full'} flex items-center justify-center bg-black`}>
          <video
            src={media.url}
            className={`${isFullscreen ? 'max-h-[90vh]' : 'max-h-full'} max-w-full`}
            controls
            autoPlay
            loop
            muted
            playsInline
            onContextMenu={(e) => e.preventDefault()}
          >
            Tu navegador no soporta videos HTML5
          </video>
        </div>
      );
    } else {
      return (
        <img
          src={media.url}
          alt={propiedad.titulo || "Propiedad"}
          className={mediaClass}
          onError={(e) => {
            e.target.src = "https://picsum.photos/1200/800?random=10";
          }}
          onContextMenu={(e) => e.preventDefault()}
        />
      );
    }
  };

  return (
    <>
      <div className={containerClass} onClick={toggleFullscreen}>
        {/* Media principal (imagen o video) */}
        {renderMedia(currentMedia)}

        {/* Contador de medios */}
        <div className="absolute bottom-4 right-4 bg-black/60 text-white px-2 py-1 rounded-md text-sm font-medium">
          {currentIndex + 1}/{mediaItems.length}
        </div>

        {/* Flechas de navegación */}
        {hasMultipleItems && (
          <>
            <button
              onClick={prevItem}
              className={`absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md ${
                fullSize ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
              } transition-opacity`}
              aria-label="Media anterior"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button
              onClick={nextItem}
              className={`absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md ${
                fullSize ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
              } transition-opacity`}
              aria-label="Siguiente media"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {/* Puntos de navegación */}
        {hasMultipleItems && (
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
            {mediaItems.map((_, index) => (
              <button
                key={index}
                onClick={(e) => goToItem(e, index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex 
                    ? 'bg-white w-4' 
                    : 'bg-white/50 hover:bg-white/70'
                }`}
                aria-label={`Ir al media ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Popup de media completo */}
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

                {/* Media en tamaño completo */}
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {renderMedia(currentMedia, true)}
                </motion.div>

                {/* Controles de navegación */}
                {hasMultipleItems && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        prevItem(e);
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
                        nextItem(e);
                      }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 p-3 rounded-full text-white"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>

                    {/* Indicadores */}
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                      {mediaItems.map((_, index) => (
                        <button
                          key={index}
                          onClick={(e) => {
                            e.stopPropagation();
                            goToItem(e, index);
                          }}
                          className={`w-3 h-3 rounded-full transition-all ${
                            index === currentIndex 
                              ? 'bg-white w-6' 
                              : 'bg-white/50 hover:bg-white/70'
                          }`}
                          aria-label={`Ir al media ${index + 1}`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </>
  );
};

export default ImageCarrousel;