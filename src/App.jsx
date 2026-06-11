import { useState } from 'react';
import videojuegos from './data/videojuegos';
import TablaVideojuegos from './components/TablaVideojuegos';

function App() {
  const [listaVideojuegos] = useState(videojuegos);

  return (
    <div>
      <TablaVideojuegos videojuegos={listaVideojuegos} />
    </div>
  );
}

export default App;