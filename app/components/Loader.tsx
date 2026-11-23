const Loader = () => {
  return (
    <div
      className="hero-loader pointer-events-none absolute inset-x-0 top-1/2 z-10 flex -translate-y-1/2 justify-center"
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
