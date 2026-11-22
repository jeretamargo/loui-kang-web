const Loader = () => {
  return (
    <div
      className="hero-loader absolute bottom-12 inset-x-0 z-10 flex justify-center pointer-events-none"
      role="status"
      aria-live="polite"
    >
      <span className="sr-only" lang="es">
        Cargando video de fondo…
      </span>
      <span className="loader" aria-hidden="true"></span>
    </div>
  );
};

export default Loader;
