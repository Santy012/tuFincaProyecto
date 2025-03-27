const CampoEditable = ({ label, value, onChange, editando, type = "text", options = [] }) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 font-semibold mb-1">{label}:</label>

      {editando ? (
        type === "select" ? (
          <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full p-2 border rounded"
          >
            {options.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        ) : type === "text" ? (
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full p-2 border rounded h-24 resize-none"
          />
        ) : (
          <input
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full p-2 border rounded"
          />
        )
      ) : (
        <p className="p-2 border rounded bg-gray-100">{value || "Sin información"}</p>
      )}
    </div>
  );
};

export default CampoEditable;
