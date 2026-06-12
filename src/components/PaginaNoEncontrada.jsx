function PaginaNoEncontrada() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0B1120",
        color: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1
        style={{
          fontSize: "6rem",
          margin: 0,
          color: "#00d9ff",
        }}
      >
        404
      </h1>

      <h2>Página no encontrada</h2>

      <p>
        La ruta que intentas visitar no existe.
      </p>
    </div>
  );
}

export default PaginaNoEncontrada;