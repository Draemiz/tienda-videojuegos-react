import { useState } from 'react';
import videojuegos from './data/videojuegos';
import TablaVideojuegos from './components/TablaVideojuegos';

function App() {
  const [listaVideojuegos, setListaVideojuegos] =
    useState(videojuegos);

  const eliminarVideojuego = (id) => {
    const nuevaLista = listaVideojuegos.filter( juego => juego.id !== id);
    setListaVideojuegos(nuevaLista);
  };

  const agregarVideojuego = (nuevoJuego) => { setListaVideojuegos([...listaVideojuegos, nuevoJuego
    ]);
  };

  const editarVideojuego = (juegoActualizado) => {
    const nuevaLista = listaVideojuegos.map((juego) =>
        juego.id === juegoActualizado.id
          ? juegoActualizado
          : juego

      );

    setListaVideojuegos(nuevaLista);

  };

  return (
    <div>
      <TablaVideojuegos
        videojuegos={listaVideojuegos}
        onEliminar={eliminarVideojuego}
        onEditar={editarVideojuego}
      />
    </div>
  );
}

export default App;