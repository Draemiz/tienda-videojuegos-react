import { useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import videojuegosIniciales from './data/videojuegos';
import TablaVideojuegos from './components/TablaVideojuegos';
import FormularioVideojuego from './components/FormularioVideojuego';
import Navbar from './components/Navbar';
import PaginaNoEncontrada from './components/PaginaNoEncontrada';

function AppContenido() {
  const [videojuegos, setVideojuegos] = useState(videojuegosIniciales);
  const navigate = useNavigate();

  // Agregar un nuevo videojuego
  const agregar = (nuevoJuego) => {
    const nuevoId = videojuegos.length > 0 
      ? Math.max(...videojuegos.map(j => j.id)) + 1 
      : 1;
    setVideojuegos([...videojuegos, { ...nuevoJuego, id: nuevoId }]);
    navigate('/');
  };

  // Eliminar un videojuego por id
  const eliminar = (id) => {
    setVideojuegos(videojuegos.filter(j => j.id !== id));
  };

  // Editar un videojuego existente
  const editar = (juegoEditado) => {
    setVideojuegos(videojuegos.map(j => 
      j.id === juegoEditado.id ? juegoEditado : j
    ));
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