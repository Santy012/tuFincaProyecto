const Indicadores = ({ propiedadSeleccionada, imagenActual, setImagenActual }) => {
  if (!propiedadSeleccionada || !Array.isArray(propiedadSeleccionada.imagenes) || propiedadSeleccionada.imagenes.length === 0) {
    return null; // No renderiza nada si no hay imágenes
  }

  return (
    <div className="flex justify-center mt-3 space-x-2">
      {propiedadSeleccionada.imagenes.map((_, index) => (
        <button
          key={index}
          onClick={() => setImagenActual(index)}
          className={`w-3 h-3 rounded-full transition ${
            imagenActual === index ? "bg-blue-500 scale-110" : "bg-gray-300"
          }`}
        />
      ))}
    </div>
  );
};

export default Indicadores;
