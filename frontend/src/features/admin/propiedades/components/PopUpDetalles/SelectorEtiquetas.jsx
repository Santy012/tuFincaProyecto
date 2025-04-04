import { useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import ListaTotalEtiquetas from "../../../components/etiquetas/ListaTotalEtiquetas";
import ListaEtiquetas from "../../../components/etiquetas/ListaEtiquetas";
import PopUpEtiqueta from "../../../components/etiquetas/PopUpEtiqueta";

const SelectorEtiquetas = ({
  propiedad,
  setPropiedad,
  onClose,
  obtenerNombresEtiquetas,
  etiquetas,
  setEtiquetas,
}) => {
  const [mostrarPopupNuevaEtiqueta, setMostrarPopupNuevaEtiqueta] =
    useState(false);

  // Obtener etiquetas disponibles
  const etiquetasDisponibles = etiquetas
    .map((e) => e.nombre)
    .filter(
      (nombre) => !obtenerNombresEtiquetas(propiedad.etiquetas).includes(nombre)
    );

  const eliminarEtiquetaDisponible = (nombreEtiqueta) => {
    setEtiquetas(prev => prev.filter(e => e.nombre !== nombreEtiqueta));
  };

  // Agregar etiqueta a la propiedad
  const agregarEtiqueta = (etiqueta) => {
    setPropiedad((prev) => {
      const nombresEtiquetas = obtenerNombresEtiquetas(prev.etiquetas);
      if (!nombresEtiquetas.includes(etiqueta)) {
        const etiquetaObj = etiquetas.find((e) => e.nombre === etiqueta);
        if (etiquetaObj) {
          return {
            ...prev,
            etiquetas: [...prev.etiquetas, etiquetaObj.id],
          };
        }
      }
      return prev;
    });
  };

  // Eliminar etiqueta de la propiedad
  const eliminarEtiqueta = (nombreEtiqueta) => {
    setPropiedad((prev) => {
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

  // Crear y agregar nueva etiqueta
  const manejarGuardarEtiqueta = (nombreEtiqueta, tipoEtiqueta) => {
    if (!nombreEtiqueta.trim()) return false;
    if (
      etiquetas.some(
        (e) => e.nombre.toLowerCase() === nombreEtiqueta.toLowerCase().trim()
      )
    ) {
      alert("Esta etiqueta ya existe");
      return false;
    }

    // Cerrar el popup antes de actualizar el estado
    setMostrarPopupNuevaEtiqueta(false);

    setTimeout(() => {
      // 🔥 IMPORTANTE: Usamos un pequeño delay para evitar el doble render
      // Crear nueva etiqueta
      const nuevaEtiqueta = {
        id: Math.max(0, ...etiquetas.map((e) => e.id)) + 1,
        nombre: nombreEtiqueta.trim(),
        tipoEtiqueta: tipoEtiqueta,
      };

      setEtiquetas((prev) => [...prev, nuevaEtiqueta]);
      setPropiedad((prev) => ({
        ...prev,
        etiquetas: [...prev.etiquetas, nuevaEtiqueta.id],
      }));
    }, 0); // 🔥 Esto fuerza a React a primero cerrar el popup y luego actualizar el estado

    return true;
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-md z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="relative bg-white p-6 rounded-2xl shadow-2xl max-w-md w-full max-h-[80vh] overflow-y-auto"
      >
        {/* Header del selector */}
        <div className="sticky top-0 flex justify-between items-center mb-4 pb-2 bg-white">
          <h2 className="text-xl font-semibold">Gestionar Etiquetas</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-900 p-1"
          >
            <X size={24} />
          </button>
        </div>

        {/* Lista de etiquetas disponibles */}
        <ListaTotalEtiquetas
          etiquetasDisponibles={etiquetasDisponibles}
          agregarEtiqueta={agregarEtiqueta}
          onAgregarNueva={() => setMostrarPopupNuevaEtiqueta(true)} // Cambiado de agregarNuevaEtiqueta
          eliminarEtiqueta={eliminarEtiquetaDisponible}
        />

        {/* Etiquetas seleccionadas */}
        <div className="mt-6 pt-4 border-t">
          <h3 className="text-lg font-semibold mb-2">
            Etiquetas seleccionadas
          </h3>
          <ListaEtiquetas
            etiquetas={obtenerNombresEtiquetas(propiedad.etiquetas)}
            onRemove={eliminarEtiqueta}
            editando={true}
            mostrarAgregar={false}
          />
        </div>

        {/* Botón de finalizar */}
        <button
          onClick={onClose}
          className="mt-4 w-full bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Finalizar
        </button>

        {/* Popup para nueva etiqueta */}
        {mostrarPopupNuevaEtiqueta && (
          <div className="fixed inset-0 z-50">
            <PopUpEtiqueta
              guardarEtiqueta={manejarGuardarEtiqueta}
              cerrar={() => setMostrarPopupNuevaEtiqueta(false)}
            />
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default SelectorEtiquetas;
