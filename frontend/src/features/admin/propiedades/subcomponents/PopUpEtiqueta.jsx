const PopUpEtiqueta = ({ cerrar }) => {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-4 rounded shadow-lg">
          <h2 className="text-lg font-bold">Agregar Nueva Etiqueta</h2>
          {/* Aquí puedes agregar un input y lógica para crear una nueva etiqueta */}
          <button onClick={cerrar} className="mt-2 bg-red-500 text-white px-4 py-2 rounded">Cerrar</button>
        </div>
      </div>
    );
  };
  
  export default PopUpEtiqueta;
  