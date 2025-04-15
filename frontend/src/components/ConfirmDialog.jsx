const ConfirmDialog = ({ message, onConfirm, onCancel }) => {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-md z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
          <p className="text-gray-800 text-center">{message}</p>
          <div className="mt-4 flex justify-around">
            <button
              onClick={onConfirm}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500 transition"
            >
              Confirmar
            </button>
            <button
              onClick={onCancel}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default ConfirmDialog;