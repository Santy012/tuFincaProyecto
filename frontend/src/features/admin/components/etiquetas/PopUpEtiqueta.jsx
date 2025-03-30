import { useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

const PopUpEtiqueta = ({ cerrar, guardarEtiqueta }) => {
  const [nombreEtiqueta, setNombreEtiqueta] = useState("");
  const [guardando, setGuardando] = useState(false);

  const handleGuardar = () => {
    if (!nombreEtiqueta.trim()) {
      alert("Por favor ingrese un nombre válido");
      return;
    }
  
    const exito = guardarEtiqueta(nombreEtiqueta);
    console.log("Resultado de guardarEtiqueta:", exito); // Para depuración
    
    if (exito) {
      cerrar();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-md z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="relative bg-white p-6 rounded-2xl shadow-2xl max-w-md w-full"
      >
        {/* Botón de cierre */}
        <button
          onClick={cerrar}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 p-2"
        >
          <X size={24} />
        </button>

        <h2 className="text-xl font-semibold mb-4">Crear Nueva Etiqueta</h2>

        {/* Campo de entrada */}
        <input
          type="text"
          value={nombreEtiqueta}
          onChange={(e) => setNombreEtiqueta(e.target.value)}
          placeholder="Nombre de la etiqueta"
          className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-500"
        />

        {/* Botones */}
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={cerrar}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
          >
            Cancelar
          </button>
          <button
            onClick={handleGuardar}
            disabled={guardando}
            className="bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50"
          >
            {guardando ? "Guardando..." : "Guardar"}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default PopUpEtiqueta;
