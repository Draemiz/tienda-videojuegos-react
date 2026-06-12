import { useState } from "react";

function FormularioVideojuego() {

  const [formulario, setFormulario] = useState({
    titulo: "",
    genero: "",
    plataforma: "",
    lanzamiento: "",
    precio: "",
    disponible: false
  });

  const manejarCambio = (e) => {

    const { name, value, type, checked } = e.target;

    setFormulario({
      ...formulario,
      [name]: type === "checkbox"
        ? checked
        : value
    });
  };

  const manejarSubmit = (e) => {
    e.preventDefault();

    console.log(formulario);

    alert("Videojuego registrado");
  };

  return (
    <div>

      <h2>Registrar Videojuego</h2>

      <form onSubmit={manejarSubmit}>

        <div>
          <label>Título</label>

          <input
            type="text"
            name="titulo"
            value={formulario.titulo}
            onChange={manejarCambio}
          />
        </div>

        <div>
          <label>Género</label>

          <select
            name="genero"
            value={formulario.genero}
            onChange={manejarCambio}
          >
            <option value="">
              Seleccione
            </option>

            <option value="RPG">
              RPG
            </option>

            <option value="Aventura">
              Aventura
            </option>

            <option value="Sandbox">
              Sandbox
            </option>

            <option value="Acción">
              Acción
            </option>
          </select>
        </div>

        <div>
          <label>Plataforma</label>

          <input
            type="text"
            name="plataforma"
            value={formulario.plataforma}
            onChange={manejarCambio}
          />
        </div>

        <div>
          <label>Año</label>

          <input
            type="number"
            name="lanzamiento"
            value={formulario.lanzamiento}
            onChange={manejarCambio}
          />
        </div>

        <div>
          <label>Precio</label>

          <input
            type="number"
            step="0.01"
            name="precio"
            value={formulario.precio}
            onChange={manejarCambio}
          />
        </div>

        <div>

          <label>

            <input
              type="checkbox"
              name="disponible"
              checked={formulario.disponible}
              onChange={manejarCambio}
            />

            Disponible

          </label>

        </div>

        <button type="submit">
          Guardar
        </button>

      </form>

    </div>
  );
}

export default FormularioVideojuego;