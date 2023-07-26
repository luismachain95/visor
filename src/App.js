
import Visor from './Visor/Visor';
import './App.css';
import { useState } from 'react';

function App() {

  const [texto, setTexto] = useState({
    antes: "Antes",
    despues: "Despues",
    imgAntes: `${process.env.PUBLIC_URL}/imagenes/image_before.jpg`,
    imgDespues: `${process.env.PUBLIC_URL}/imagenes/image_after.jpg`
  })
  return (
    <>
      <fieldset>
        <legend>Texto</legend>
        Antes: <input type='text' onChange={e => setTexto({...texto, antes: e.target.value})} placeholder='Antes'/> <br/>
        Despues: <input type='text' onChange={e => setTexto({...texto, despues: e.target.value})} placeholder='Despues'/>
      </fieldset>
      <fieldset>
        <legend>Imagen</legend>
        Antes: <input type='file' onChange={e => setTexto({...texto, imgAntes: URL.createObjectURL(e.target.files[0])})} placeholder='Antes'/> <br/>
        Despues: <input type='file' onChange={e => setTexto({...texto, imgDespues: URL.createObjectURL(e.target.files[0])})} placeholder='Despues'/>
      </fieldset>

      <Visor 
        before={texto.imgAntes} 
        after={texto.imgDespues} 
        width={1000}
        text={true}
        textBefore={texto.antes}
        textAfter={texto.despues}
      />
      
      <Visor 
        before={`${process.env.PUBLIC_URL}/imagenes/image_before.jpg`}  
        after={`${process.env.PUBLIC_URL}/imagenes/image_after.jpg`} 
        width={500}
        text={true}
        textBefore="Naranja"
        textAfter="Rojo"
      />
      
      <Visor 
        before={`${process.env.PUBLIC_URL}/imagenes/image_before.jpg`} 
        after={`${process.env.PUBLIC_URL}/imagenes/image_after.jpg`} 
        width={500}
      />
    </>
  );
}

export default App;
