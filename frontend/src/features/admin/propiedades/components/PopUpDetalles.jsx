import { useState, useEffect } from "react";
import { useGlobalContext } from "../../../../context/GlobalContext"; // Asegúrate de la ruta correcta
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
  const { actualizarPropiedad } = useGlobalContext();
  const [imagenActual, setImagenActual] = useState(0);
  const [editando, setEditando] = useState(false);
  const [propiedad, setPropiedad] = useState(propiedadSeleccionada);
  const [mostrarGaleria, setMostrarGaleria] = useState(false);

  const guardarCambios = () => {
    actualizarPropiedad(propiedad.id, propiedad);
    setEditando(false);
  };

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
        
        {/* Contenedor sticky para mantener la "X" fija en la parte superior derecha sin fondo */}
        <div className="sticky top-0 flex justify-end z-20 pointer-events-none">
          <button
            onClick={() => setPropiedadSeleccionada(null)}
            className="text-gray-600 hover:text-gray-900 cursor-pointer transition bg-white rounded-full p-2 shadow-md pointer-events-auto"
          >
            <X size={24} />
          </button>
        </div>

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
          setEtiquetas={(nuevasEtiquetas) => {
            if (!Array.isArray(nuevasEtiquetas)) return; 
            setPropiedad((prev) => ({
              ...prev,
              etiquetas: nuevasEtiquetas, // Debe asignar el array filtrado correctamente
            }));
          }}
          editando={editando}
          mostrarAgregar={true}
        />


        <button
          onClick={() => {
            if (editando) {
              guardarCambios(); // Guarda los cambios antes de salir del modo edición
            } else {
              setEditando(true); // Activa el modo edición
            }
          }}
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
