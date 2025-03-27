import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AdminHeader from "./components/AdminHeader";
import PropiedadForm from "./forms/PropiedadForm";
import Navbar from "./components/AdminNavBar";
import ListaPropiedades from "../admin/propiedades/ListaPropiedades";

const AdminPage = () => {
  const [selectedSection, setSelectedSection] = useState("propiedades");

  const handleSectionChange = (section) => {
    setSelectedSection(section);
  };

  return (
    <main className="min-h-screen flex flex-col bg-gray-200 font-oswald text-lg">
      {/* Header */}
      <AdminHeader />

      {/* Contenedor flexible para Navbar + Contenido */}
      <div className="flex flex-grow">
        {/* Barra lateral */}
        <Navbar onSectionChange={handleSectionChange} />
        {/* Contenido principal dinámico con animación */}
        <div className="flex flex-col flex-grow p-6 pb-16 sm:pb-6">
          <AnimatePresence mode="wait">
            {/* Maneja la animación de cambios */}
            {selectedSection === "+propiedad" && (
              <motion.section
                key="propiedades" // Clave única para que AnimatePresence detecte cambios
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <TituloSeccion titulo={"Agrega Una Propiedad"} />
                <PropiedadForm />
              </motion.section>
            )}
            {selectedSection === "propiedades" && (
              <motion.section
                key="misPropiedades"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <TituloSeccion titulo={"Mis Propiedades"} />
                <ListaPropiedades/>
              </motion.section>
            )}
            {selectedSection === "mensajes" && (
              <motion.section
                key="mensajes"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <TituloSeccion titulo={"Comentarios"} />
                
              </motion.section>
            )}
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
};

const TituloSeccion = ({ titulo }) => (
  <div className="bg-gray-100 w-full h-auto min-h-fit py-4 px-6 rounded-lg flex flex-col sm:flex-row justify-between items-center">
    <h1 className="text-lg sm:text-xl md:text-2xl text-gray-800">{titulo}</h1>
  </div>
);

export default AdminPage;
