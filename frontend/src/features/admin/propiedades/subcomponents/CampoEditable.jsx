const CampoEditable = ({ label, value, onChange, editando, type = "text", options = [] }) => {
    return (
      <div className="mt-4">
        <p className="text-sm font-semibold">{label}:</p>
        {editando ? (
          type === "select" ? (
            <select
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className="border p-1 rounded w-full text-sm"
            >
              {options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          ) : (
            <input
              type={type}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className="border p-1 rounded w-full text-sm"
            />
          )
        ) : (
          <p>{value}</p>
        )}
      </div>
    );
  };

  export default CampoEditable;

  