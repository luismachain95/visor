
import Visor from './Visor/Visor';
import './App.css';

function App() {

  return (
    <>
      <Visor 
        before="imagenes/image_before.jpg" 
        after="imagenes/image_after.jpg"
        width={1000}
        text={true}
        textBefore="Antes"
        textAfter="Despues"
      />
      
      <Visor 
        before="imagenes/image_before.jpg" 
        after="imagenes/image_after.jpg"
        width={500}
        text={true}
        textBefore="Naranja"
        textAfter="Rojo"
      />
      
      <Visor 
        before="imagenes/image_before.jpg" 
        after="imagenes/image_after.jpg"
        width={500}
      />
    </>
  );
}

export default App;
