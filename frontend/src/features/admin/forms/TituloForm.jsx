const TituloForm = ({ propiedadData, handleChange }) =>{
    return(
        <div>
            <h2 className="text-xl font-semibold">Información de Título, Codigo y Descripción</h2>
            <p className="text-gray-600 mt-2">Ingresa los datos básicos de tu propiedad.</p>

            <label className="block mt-4 text-gray-700">Título</label>
            <input
                type="text"
                placeholder="Ej: Hermosa casa en el centro"
                value={propiedadData.titulo}
                onChange={(e) => handleChange("titulo", e.target.value)}
                className="w-full border border-gray-300 px-4 py-2 rounded-md mt-1"
                required
            />

            <label className="block mt-4 text-gray-700">Código</label>
            <input 
                type="number" 
                placeholder="Ingresa el código de propiedad..."
                value={propiedadData.codigo}
                onChange={(e) => {
                    const value = e.target.value;
                    if (value === '' || /^[0-9]+$/.test(value)) {
                        handleChange("codigo", value);
                    }
                }}
                onKeyPress={(e) => {
                    if (!/[0-9]/.test(e.key)) {
                        e.preventDefault();
                    }
                }}
                className="w-full border border-gray-300 px-4 py-2 rounded-md mt-1 appearance-none"
                required
                min="0"
                step="1"
            />

            <label className="block mt-4 text-gray-700">Descripción</label>
            <textarea
                rows="4"
                placeholder="Describe tu propiedad aquí..."
                value={propiedadData.descripcion}
                onChange={(e) => handleChange("descripcion", e.target.value)}
                className="w-full border border-gray-300 px-4 py-2 rounded-md mt-1"
            ></textarea>
        </div>
    );
}
export default TituloForm;