const ErrorMessage = ({ message, onRetry, retryText = "Reintentar" }) => {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded max-w-md">
        <strong className="font-bold">Error: </strong>
        <span className="block sm:inline">{message}</span>
        {onRetry && (
          <button
            onClick={onRetry}
            className="mt-2 w-full px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
          >
            {retryText}
          </button>
        )}
      </div>
    );
  };
  
  export default ErrorMessage;