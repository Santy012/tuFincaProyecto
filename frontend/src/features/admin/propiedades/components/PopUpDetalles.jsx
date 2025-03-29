import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import CampoEditable from "../subcomponents/CampoEditable";
import ListaEtiquetas from "../subcomponents/ListaEtiquetas";
import Carrusel from "../subcomponents/Carrusel";
import Indicadores from "../subcomponents/Indicadores";
import PopupImages from "./PopupImages";

const PopUpDetalles = ({
  propiedadSeleccionada,
  setPropiedadSeleccionada,
  obtenerNombresEtiquetas,
}) => {
  const [imagenActual, setImagenActual] = useState(0);
  const [editando, setEditando] = useState(false);
  const [propiedad, setPropiedad] = useState(propiedadSeleccionada);
  const [mostrarGaleria, setMostrarGaleria] = useState(false);

  const AgregarMedia = (archivo) => {
    if (archivo) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPropiedad((prev) => ({
          ...prev,
          imagenes: [...prev.imagenes, e.target.result],
        }));
      };
      reader.readAsDataURL(archivo);
    }
  };

  const handleRemoveImage = (index) => {
    setPropiedad((prev) => {
      const nuevasImagenes = prev.imagenes.filter((_, i) => i !== index);
  
      return {
        ...prev,
        imagenes: nuevasImagenes,
      };
    });
  
    // Ajustar índice de imagen actual si se elimina la última imagen
    setImagenActual((prevIndex) => Math.max(0, prevIndex - 1));
  };
  

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-md z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="relative bg-white p-6 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
      >
        <button
          onClick={() => setPropiedadSeleccionada(null)}
          className="absolute top-1 right-0 text-gray-600 hover:text-gray-900 cursor-pointer z-10 transition"
        >
          <X size={24} />
        </button>

        {/* Contenedor del carrusel con efecto de edición */}
        <div className="relative cursor-pointer">
          <div
            className={`absolute inset-0 flex items-center justify-center bg-black/40 text-white font-semibold text-lg transition-opacity duration-300 rounded-lg ${
              editando ? "opacity-0 hover:opacity-100" : "hidden"
            }`}
          >
            Editar
          </div>
          <Carrusel 
            propiedadSeleccionada={propiedad} 
            imagenActual={imagenActual} 
            setImagenActual={setImagenActual} 
            setMostrarGaleria={() => {
              if (editando) setMostrarGaleria(true); // Solo abre la galería si está en edición
            }} 
          />
        </div>

        <Indicadores propiedadSeleccionada={propiedad} imagenActual={imagenActual} />

        <CampoEditable
          label="Título"
          value={propiedad.titulo}
          onChange={(val) => setPropiedad({ ...propiedad, titulo: val })}
          editando={editando}
        />

        <CampoEditable
          label="Código"
          value={propiedad.codigo}
          onChange={(val) => setPropiedad({ ...propiedad, codigo: val })}
          editando={editando}
        />

        <CampoEditable
          label="Ubicación"
          value={propiedad.ubicacion}
          onChange={(val) => setPropiedad({ ...propiedad, ubicacion: val })}
          editando={editando}
        />

        <CampoEditable
          label="Estado"
          value={propiedad.estado}
          onChange={(val) => setPropiedad({ ...propiedad, estado: val })}
          editando={editando}
          type="select"
          options={["Disponible", "Vendido"]}
        />

        <CampoEditable
          label="Área Total (m²)"
          value={propiedad.areaTotal}
          onChange={(val) => setPropiedad({ ...propiedad, areaTotal: val })}
          editando={editando}
          type="number"
        />

        {propiedad.areaConstruida && (
          <CampoEditable
            label="Área Construida (m²)"
            value={propiedad.areaConstruida}
            onChange={(val) => setPropiedad({ ...propiedad, areaConstruida: val })}
            editando={editando}
            type="number"
          />
        )}

        <CampoEditable
          label="Descripción"
          value={propiedad.descripcion}
          onChange={(val) => setPropiedad({ ...propiedad, descripcion: val })}
          editando={editando}
          type="text"
        />

        <ListaEtiquetas
          etiquetas={obtenerNombresEtiquetas(propiedad.etiquetas)}
          setEtiquetas={(nuevasEtiquetas) =>
            setPropiedad({
              ...propiedad,
              etiquetas: obtenerNombresEtiquetas(nuevasEtiquetas),
            })
          }
          editando={editando}
        />

        <button
          onClick={() => setEditando(!editando)}
          className="mt-4 w-full bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-600 transition"
        >
          {editando ? "Guardar Cambios" : "Editar Propiedad"}
        </button>
      </motion.div>

      {/* Popup de imágenes solo se muestra cuando está en modo edición */}
      {editando && mostrarGaleria && (
        <PopupImages
          imagenes={propiedad.imagenes}
          onClose={() => setMostrarGaleria(false)}
          onAddImage={AgregarMedia}
          onRemoveImage={handleRemoveImage}
        />
      )}
    </div>
  );
};

export default PopUpDetalles;
