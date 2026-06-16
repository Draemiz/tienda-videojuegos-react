import { useState, useEffect } from "react";
import "./FormularioVideojuego.css";

import { useLocation } from "react-router-dom";

function FormularioVideojuego({ onGuardar }) {

    const location = useLocation();
    const juegoAEditar = location.state || null;

    const imagenesBanner = [
        "https://i.pinimg.com/736x/a1/d8/76/a1d8764b5df41bd7ff068c271cd9e94e.jpg",
        "https://i.pinimg.com/736x/f5/f8/79/f5f879fcc68a305b236c6b42c74d1c8c.jpg",
        "https://i.pinimg.com/736x/a9/32/91/a93291121a71e142422f51b75c2a5c20.jpg",
        "https://i.pinimg.com/736x/c2/f4/62/c2f4620d5a5936dec0706c039b2ec368.jpg",
        "https://i.pinimg.com/1200x/22/cc/73/22cc737b4266141b8f65f27450926851.jpg"
    ];

    const [imagenActual, setImagenActual] = useState(0);

    const [formulario, setFormulario] = useState(
        juegoAEditar
            ? {
                ...juegoAEditar,
                progreso: Math.round(juegoAEditar.progreso * 100)
            }
            : {
                titulo: "",
                genero: "",
                plataforma: "",
                lanzamiento: "",
                precio: "",
                progreso: "",
                imagen: "",
                trailer: "",
                descripcion: "",
                disponible: true,
                fechaLanzamiento: "",
                calificacion: ""
            }
    );

    const [errores, setErrores] = useState({});

    useEffect(() => {

        const intervalo = setInterval(() => {

            setImagenActual((actual) =>
                (actual + 1) % imagenesBanner.length
            );

        }, 5000);

        return () => clearInterval(intervalo);

    }, []);

    const manejarCambio = (e) => {

        const { name, value, type, checked } = e.target;

        setFormulario({
            ...formulario,
            [name]: type === "checkbox"
                ? checked
                : value
        });
    };

    const validarFormulario = () => {

        const erroresEncontrados = {};

        // 1. El título no puede estar vacío ni contener solo espacios
        if (!formulario.titulo.trim()) {
            erroresEncontrados.titulo = "El título no puede estar vacío.";
        }

        // 2. El género debe estar seleccionado
        if (!formulario.genero) {
            erroresEncontrados.genero = "Debes seleccionar un género.";
        }

        // 3. La plataforma no puede estar vacía
        if (!formulario.plataforma.trim()) {
            erroresEncontrados.plataforma = "La plataforma no puede estar vacía.";
        }

        // 4. El precio debe ser un número mayor a 0
        if (!formulario.precio || parseFloat(formulario.precio) <= 0) {
            erroresEncontrados.precio = "El precio debe ser mayor a 0.";
        }

        // 5. La sinopsis debe tener entre 10 y 250 caracteres
        const longitudDescripcion = formulario.descripcion.trim().length;
        if (longitudDescripcion < 10) {
            erroresEncontrados.descripcion = "La sinopsis debe tener al menos 10 caracteres.";
        } else if (longitudDescripcion > 250) {
            erroresEncontrados.descripcion = "La sinopsis no puede superar los 250 caracteres.";
        }

        // 6. La calificación debe estar entre 1 y 100
        const calificacionNum = Number(formulario.calificacion);
        if (
            formulario.calificacion === "" ||
            isNaN(calificacionNum) ||
            calificacionNum < 1 ||
            calificacionNum > 100
        ) {
            erroresEncontrados.calificacion = "La calificación debe estar entre 1 y 100.";
        }

        // 7. La fecha de lanzamiento no puede ser futura
        if (!formulario.fechaLanzamiento) {
            erroresEncontrados.fechaLanzamiento = "Debes seleccionar una fecha de lanzamiento.";
        } else {
            const hoy = new Date().toISOString().split("T")[0];
            if (formulario.fechaLanzamiento > hoy) {
                erroresEncontrados.fechaLanzamiento = "La fecha no puede ser futura.";
            }
        }

        return erroresEncontrados;
    };

    const manejarSubmit = (e) => {
        e.preventDefault();

        const erroresActivos = validarFormulario();

        if (Object.keys(erroresActivos).length > 0) {
            setErrores(erroresActivos);
            return;
        }

        setErrores({});

        const juegoFinal = {
            ...formulario,
            precio: parseFloat(formulario.precio),
            lanzamiento: parseInt(formulario.lanzamiento),
            progreso: parseFloat(formulario.progreso) / 100,
            calificacion: parseFloat(formulario.calificacion)
        };

        onGuardar(juegoFinal);
    };

    const fechaHoy = new Date().toISOString().split("T")[0];

    return (
        <div className="formulario-page">

            <div className="formulario-layout">

                {/* Banner */}

                <div className="banner-panel">

                    <img
                        src={
                            formulario.imagen ||
                            imagenesBanner[imagenActual]
                        }
                        alt="Preview"
                        className="preview-banner"
                    />

                    <div className="banner-info">

                        <h3>
                            {formulario.titulo || "Nuevo Videojuego"}
                        </h3>

                        <p>
                            {formulario.genero || "Género"} •{" "}
                            {formulario.plataforma || "Plataforma"}
                        </p>

                    </div>

                </div>

                {/* Formulario */}

                <div className="form-panel">

                    <h1>{juegoAEditar ? "Editar Videojuego" : "Registrar Videojuego"}</h1>

                    <form
                        onSubmit={manejarSubmit}
                        className="formulario-grid"
                    >

                        <div className="campo">
                            <label>Título</label>

                            <input
                                type="text"
                                name="titulo"
                                value={formulario.titulo}
                                onChange={manejarCambio}
                            />

                            {errores.titulo && (
                                <span className="error-mensaje">{errores.titulo}</span>
                            )}
                        </div>

                        <div className="campo">
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
                                <option value="Metroidvania">
                                    Metroidvania
                                </option>
                                <option value="Carreras">
                                    Carreras
                                </option>
                            </select>

                            {errores.genero && (
                                <span className="error-mensaje">{errores.genero}</span>
                            )}

                        </div>

                        <div className="campo">
                            <label>Plataforma</label>

                            <input
                                type="text"
                                name="plataforma"
                                value={formulario.plataforma}
                                onChange={manejarCambio}
                            />

                            {errores.plataforma && (
                                <span className="error-mensaje">{errores.plataforma}</span>
                            )}

                        </div>

                        <div className="campo">
                            <label>Año</label>

                            <input
                                type="number"
                                name="lanzamiento"
                                value={formulario.lanzamiento}
                                onChange={manejarCambio}
                            />
                        </div>

                        {/* Fecha de Lanzamiento */}
                        <div className="campo">
                            <label>Fecha de Lanzamiento</label>

                            <input
                                type="date"
                                name="fechaLanzamiento"
                                value={formulario.fechaLanzamiento}
                                onChange={manejarCambio}
                                max={fechaHoy}
                            />

                            {errores.fechaLanzamiento && (
                                <span className="error-mensaje">{errores.fechaLanzamiento}</span>
                            )}
                        </div>

                        {/* Calificación de la Crítica */}
                        <div className="campo">
                            <label>Calificación de la Crítica (1-100)</label>

                            <input
                                type="number"
                                name="calificacion"
                                min="1"
                                max="100"
                                value={formulario.calificacion}
                                onChange={manejarCambio}
                            />

                            {errores.calificacion && (
                                <span className="error-mensaje">{errores.calificacion}</span>
                            )}
                        </div>

                        <div className="campo">
                            <label>Precio</label>

                            <input
                                type="number"
                                step="0.01"
                                name="precio"
                                value={formulario.precio}
                                onChange={manejarCambio}
                            />

                            {errores.precio && (
                                <span className="error-mensaje">{errores.precio}</span>
                            )}

                        </div>

                        <div className="campo">
                            <label>Progreso (%)</label>

                            <input
                                type="number"
                                min="0"
                                max="100"
                                name="progreso"
                                value={formulario.progreso}
                                onChange={manejarCambio}
                            />
                        </div>

                        <div className="campo">
                            <label>URL Imagen</label>

                            <input
                                type="text"
                                name="imagen"
                                value={formulario.imagen}
                                onChange={manejarCambio}
                            />
                        </div>

                        <div className="campo">
                            <label>URL Trailer</label>

                            <input
                                type="text"
                                name="trailer"
                                value={formulario.trailer}
                                onChange={manejarCambio}
                            />
                        </div>

                        <div className="campo descripcion-completa">

                            <label>Sinopsis</label>

                            <textarea
                                rows="4"
                                name="descripcion"
                                value={formulario.descripcion}
                                onChange={manejarCambio}
                                maxLength="250"
                            />

                            <span className="contador-caracteres">
                                {formulario.descripcion.length}/250 caracteres
                            </span>

                            {errores.descripcion && (
                                <span className="error-mensaje">{errores.descripcion}</span>
                            )}

                        </div>

                        <div className="checkbox-container">

                            <label>

                                <input
                                    type="checkbox"
                                    name="disponible"
                                    checked={formulario.disponible}
                                    onChange={manejarCambio}
                                />

                                {" "}Disponible

                            </label>

                        </div>

                        <button
                            type="submit"
                            className="btn-guardar"
                        >
                            Guardar Videojuego
                        </button>

                    </form>

                </div>

            </div>

        </div>
    );
}

export default FormularioVideojuego;