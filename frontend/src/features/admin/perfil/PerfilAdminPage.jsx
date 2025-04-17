import { useState } from "react";
import PerfilInfo from "./components/PerfilInfo";
import PopUpPerfil from "./subcomponents/PopUpPerfil";
import { useGlobalContext } from "../../../context/GlobalContext";

const PerfilAdminPage = () => {
  const { admin, setAdmin, authLoading } = useGlobalContext();
  const [mostrarPopUp, setMostrarPopUp] = useState(false);

  if (authLoading) {
    return (
      <div className="flex flex-col items-center p-6">
        <p>Verificando sesión...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center p-6">
      {admin && <PerfilInfo admin={admin} onEdit={() => setMostrarPopUp(true)} />}
      {mostrarPopUp && (
        <PopUpPerfil
          admin={admin}
          setAdmin={setAdmin}
          onClose={() => setMostrarPopUp(false)}
        />
      )}
    </div>
  );
};

export default PerfilAdminPage;