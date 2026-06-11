import "./TablaVideojuegos.css";
import { useState } from "react";

function TablaVideojuegos({ videojuegos }) {

  const [fondo, setFondo] = useState(
    videojuegos[0].imagen
  );

  return (
    <div
      className="tabla-contenedor"
      style={{
        backgroundImage: `
          linear-gradient(
            rgba(5,8,15,0.92),
            rgba(5,8,15,0.96)
          ),
          url(${fondo})
        `
      }}
    >
      <div className="header">
        <div className="titulo-principal">
          <span className="icono-juego">
            🕹️
          </span>
          <h2>Tienda de Videojuegos</h2>
        </div>
        <p className="subtitulo">
          Biblioteca Premium Gamer
        </p>
      </div>

      <div className="tabla-wrapper">
        <table className="tabla">

          <thead>
            <tr>
              <th>Juego</th>
              <th>Género</th>
              <th>Plataforma</th>
              <th>Año</th>
              <th>Precio</th>
              <th>Estado</th>
              <th>Progreso</th>
            </tr>
          </thead>

          <tbody>

            {videojuegos.map((juego) => (

              <tr
                key={juego.id}
                onMouseEnter={() =>
                  setFondo(juego.imagen)
                }
              >

                <td className="td-juego">

                  <img
                    src={juego.imagen}
                    alt={juego.titulo}
                    className="juego-imagen"
                  />

                  <div>

                    <div className="titulo-juego">
                      {juego.titulo}
                    </div>

                    <div className="plataforma">
                      {juego.plataforma}
                    </div>

                  </div>

                </td>

                <td>
                  <span className="badge-genero">
                    {juego.genero}
                  </span>
                </td>

                <td className="plataforma">
                  {juego.plataforma}
                </td>

                <td className="anio">
                  {juego.lanzamiento}
                </td>

                <td className="precio">
                  ${juego.precio}
                </td>

                <td>

                  <span
                    className={
                      juego.disponible
                        ? "disponible"
                        : "no-disponible"
                    }
                  >
                    {juego.disponible
                      ? "ONLINE"
                      : "AGOTADO"}
                  </span>

                </td>

                <td>

                  <div className="progreso-container">

                    <progress
                      value={juego.progreso}
                      max={1}
                    />

                    <span className="porcentaje">
                      {Math.round(
                        juego.progreso * 100
                      )}%
                    </span>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>
      </div>
    </div>
  );
}

export default TablaVideojuegos;