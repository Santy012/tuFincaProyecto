import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import CampoEditable from "../subcomponents/CampoEditable";
import ListaEtiquetas from "../subcomponents/ListaEtiquetas";
import Carrusel from "../subcomponents/Carrusel";
import Indicadores from "../subcomponents/Indicadores";

const PopUpDetalles = ({
  propiedadSeleccionada,
  setPropiedadSeleccionada,
  obtenerNombresEtiquetas,
}) => {
  const [imagenActual, setImagenActual] = useState(0);
  const [editando, setEditando] = useState(false);
  const [propiedad, setPropiedad] = useState(propiedadSeleccionada);

  useEffect(() => {
    setPropiedad(propiedadSeleccionada);
  }, [propiedadSeleccionada]);

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

        <Carrusel
          propiedadSeleccionada={propiedad}
          imagenActual={imagenActual}
          setImagenActual={setImagenActual}
        />
        <Indicadores
          propiedadSeleccionada={propiedad}
          imagenActual={imagenActual}
        />

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
            onChange={(val) =>
              setPropiedad({ ...propiedad, areaConstruida: val })
            }
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
          etiquetas={obtenerNombresEtiquetas(propiedad.etiquetas)} // <-- Aplicando la conversión
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
    </div>
  );
};

export default PopUpDetalles;
