
import { Visor } from './Visor/Visor';
import './App.css';

function App() {

  return (
    <>
      <Visor 
        before="imagenes/image_before.jpg" 
        after="imagenes/image_after.jpg" 
        width={500}
        height={600}
      />
      <Visor 
        before="imagenes/image_before.jpg" 
        after="imagenes/image_after.jpg" 
        width={500}
        height={600}
      />
    </>
  );
}

export default App;
