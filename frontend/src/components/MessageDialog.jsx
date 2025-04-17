const MessageDialog = ({
    message,
    onConfirm,
    onCancel,
    type = "confirmation",
    confirmText = "Confirmar",
    cancelText = "Cancelar",
    isOpen
  }) => {
    if (!isOpen) return null;
  
    const isSuccess = type === "success";
    const isError = type === "error";
  
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-md z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full mx-4">
          {/* Icono según tipo */}
          <div className="flex justify-center mb-4">
            {isSuccess && (
              <div className="p-3 bg-green-100 rounded-full">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}
            {isError && (
              <div className="p-3 bg-red-100 rounded-full">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
            )}
          </div>
  
          <p className={`text-center text-lg ${
            isSuccess ? "text-green-600" : 
            isError ? "text-red-600" : "text-gray-800"
          }`}>
            {message}
          </p>
  
          <div className="mt-6 flex justify-center gap-4">
            {onConfirm && (
              <button
                onClick={onConfirm}
                className={`px-5 py-2 rounded-md transition-colors ${
                  isSuccess ? "bg-green-600 hover:bg-green-700 text-white" :
                  isError ? "bg-red-600 hover:bg-red-700 text-white" :
                  "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
              >
                {confirmText}
              </button>
            )}
            
            {onCancel && (
              <button
                onClick={onCancel}
                className="px-5 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md transition-colors"
              >
                {cancelText}
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };
  
  export default MessageDialog;