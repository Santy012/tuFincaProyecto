import { useState } from "react";
import { useGlobalContext } from "../../../../../context/GlobalContext";
import { motion } from "framer-motion";
import { X, Plus } from "lucide-react";
import CampoEditable from "../../subcomponents/CampoEditable";
import ListaEtiquetas from "../../../components/etiquetas/ListaEtiquetas";
import Carrusel from "../../subcomponents/Carrusel";
import Indicadores from "../../subcomponents/Indicadores";
import PopupImages from "../PopupImages";
import SelectorEtiquetas from "./SelectorEtiquetas";

const PopUpDetalles = ({
  propiedadSeleccionada,
  setPropiedadSeleccionada,
  obtenerNombresEtiquetas,
}) => {
  const { actualizarPropiedad, etiquetas, setEtiquetas } = useGlobalContext();
  const [imagenActual, setImagenActual] = useState(0);
  const [editando, setEditando] = useState(false);
  const [propiedad, setPropiedad] = useState(propiedadSeleccionada);
  const [mostrarGaleria, setMostrarGaleria] = useState(false);
  const [mostrarSelectorEtiquetas, setMostrarSelectorEtiquetas] =
    useState(false);

  const guardarCambios = () => {
    actualizarPropiedad(propiedad.id, propiedad);
    setEditando(false);
  };

  const agregarMedia = (archivo) => {
    if (archivo) {
      // Guardamos el archivo completo en el estado, no solo el DataURL
      setPropiedad((prev) => ({
        ...prev,
        imagenes: [...prev.imagenes, archivo],
      }));
    }
  };

  const handleRemoveImage = (index) => {
    setPropiedad((prev) => {
      const nuevasImagenes = prev.imagenes.filter((_, i) => i !== index);
      return { ...prev, imagenes: nuevasImagenes };
    });
    setImagenActual((prevIndex) => Math.max(0, prevIndex - 1));
  };

  const eliminarEtiqueta = (nombreEtiqueta) => {
    setPropiedad((prev) => {
      // Encuentra el ID de la etiqueta por su nombre
      const etiquetaObj = etiquetas.find((e) => e.nombre === nombreEtiqueta);
      if (etiquetaObj) {
        return {
          ...prev,
          etiquetas: prev.etiquetas.filter((id) => id !== etiquetaObj.id),
        };
      }
      return prev;
    });
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
        {/* Botón de cierre */}
        <div className="sticky top-0 flex justify-end z-20 pointer-events-none">
          <button
            onClick={() => setPropiedadSeleccionada(null)}
            className="text-gray-600 hover:text-gray-900 cursor-pointer transition bg-white rounded-full p-2 shadow-md pointer-events-auto"
          >
            <X size={24} />
          </button>
        </div>

        {/* Carrusel de imágenes */}
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
              if (editando) setMostrarGaleria(true);
            }}
          />
        </div>

        <Indicadores
          propiedadSeleccionada={propiedad}
          imagenActual={imagenActual}
        />

        {/* Campos editables */}
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
          onChange={(val) => {
            if (val === '' || /^[0-9]*\.?[0-9]*$/.test(val)) {
              setPropiedad({ ...propiedad, areaTotal: val });
            }
          }}
          editando={editando}
          type="number"
          step="0.01"
        />

        <CampoEditable
          label="Área Construida (m²)"
          value={propiedad.areaConstruida || ''}
          onChange={(val) => {
            if (val === '' || /^[0-9]*\.?[0-9]*$/.test(val)) {
              setPropiedad({ ...propiedad, areaConstruida: val });
            }
          }}
          editando={editando}
          type="number"
          step="0.01"
          placeholder="Opcional"
        />

        <CampoEditable
          label="Descripción"
          value={propiedad.descripcion}
          onChange={(val) => setPropiedad({ ...propiedad, descripcion: val })}
          editando={editando}
          type="textarea"
        />

        {/* Sección de etiquetas mejorada */}
        <div className="mt-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-semibold">Etiquetas:</h3>
            {editando && (
              <button
                onClick={() => setMostrarSelectorEtiquetas(true)}
                className="flex items-center gap-1 text-blue-600 text-sm hover:text-blue-800 transition"
              >
                <Plus size={16} /> Gestionar etiquetas
              </button>
            )}
          </div>

          <ListaEtiquetas
            etiquetas={obtenerNombresEtiquetas(propiedad.etiquetas)}
            onRemove={eliminarEtiqueta}
            editando={editando}
          />
        </div>

        <button
          onClick={() => {
            if (editando) {
              guardarCambios();
            } else {
              setEditando(true);
            }
          }}
          className="mt-4 w-full bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-600 transition"
        >
          {editando ? "Guardar Cambios" : "Editar Propiedad"}
        </button>
      </motion.div>

      {/* Popup de imágenes */}
      {editando && mostrarGaleria && (
        <PopupImages
          imagenes={propiedad.imagenes}
          onClose={() => setMostrarGaleria(false)}
          onAddImage={agregarMedia}
          onRemoveImage={handleRemoveImage}
        />
      )}

      {/* Selector de etiquetas */}
      {editando && mostrarSelectorEtiquetas && (
        <SelectorEtiquetas
          propiedad={propiedad}
          setPropiedad={setPropiedad}
          onClose={() => setMostrarSelectorEtiquetas(false)}
          obtenerNombresEtiquetas={obtenerNombresEtiquetas}
          etiquetas={etiquetas}
          setEtiquetas={setEtiquetas}
        />
      )}
    </div>
  );
};

export default PopUpDetalles;