import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import videojuegosIniciales from './data/videojuegos';
import TablaVideojuegos from './components/TablaVideojuegos';
import FormularioVideojuego from './components/FormularioVideojuego';
import Navbar from './components/Navbar';
import PaginaNoEncontrada from './components/PaginaNoEncontrada';
import AlertaNotificacion from './components/AlertaNotificacion';

function AppContenido() {

  const [videojuegos, setVideojuegos] = useState(() => {
    const datosGuardados = localStorage.getItem("lista_videojuegos");
    return datosGuardados ? JSON.parse(datosGuardados) : videojuegosIniciales;
  });

  const [toast, setToast] = useState(null);

  useEffect(() => {
    localStorage.setItem(
      "lista_videojuegos",
      JSON.stringify(videojuegos)
    );
  }, [videojuegos]);

  const navigate = useNavigate();

  const agregar = (nuevoJuego) => {
    const nuevoId = videojuegos.length > 0
      ? Math.max(...videojuegos.map(j => j.id)) + 1
      : 1;
    setVideojuegos([...videojuegos, { ...nuevoJuego, id: nuevoId }]);
    setToast("¡Videojuego agregado con éxito! 🎮");
    navigate('/');
  };

  const eliminar = (id) => {
    setVideojuegos(videojuegos.filter(j => j.id !== id));
    setToast("Videojuego eliminado correctamente 🗑️");
  };

  const editar = (juegoEditado) => {
    setVideojuegos(videojuegos.map(j =>
      j.id === juegoEditado.id ? juegoEditado : j
    ));
    setToast("¡Videojuego actualizado con éxito! ✏️");
    navigate('/');
  };

  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <TablaVideojuegos
              videojuegos={videojuegos}
              onEliminar={eliminar}
              onEditar={(juego) => navigate('/editar', { state: juego })}
            />
          }
        />
        <Route
          path="/nuevo"
          element={<FormularioVideojuego onGuardar={agregar} />}
        />
        <Route
          path="/editar"
          element={<FormularioVideojuego onGuardar={editar} modoEdicion={true} />}
        />
        <Route path="*" element={<PaginaNoEncontrada />} />
      </Routes>

      {toast && (
        <AlertaNotificacion
          mensaje={toast}
          onCerrar={() => setToast(null)}
        />
      )}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContenido />
    </BrowserRouter>
  );
}

export default App;