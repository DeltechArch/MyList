import { useState,useEffect } from "react"
import BotonAdd from "./components/BotonAdd"
import DisplayTotal from "./components/DisplayTotal"
import Hedear from "./components/Hedear"
import ShowLista from "./components/ShowLista"



//Verificando conexion a  git hub 
function App() {
   // Inicializar el estado con los datos del localStorage o un array vacío si no hay datos
   const [lista, setLista] = useState(
    JSON.parse(localStorage.getItem("lista")) || []
  );

  // Guardar lista en el localStorage cada vez que cambie
  useEffect(() => {
    localStorage.setItem("lista", JSON.stringify(lista));
  }, [lista]);

  const [visible, setVisible] = useState(false);
 

  return (
    <>
     <Hedear
     lista={lista}
     setLista={setLista}
     />
     <BotonAdd
     lista={lista}
     setLista={setLista}
     setVisible={setVisible}
     visible={visible}
     />
     
     <ShowLista
     lista={lista}
     setLista={setLista}
     visible={visible}
     setVisible={setVisible}
     
     
     />
     <DisplayTotal
     lista={lista}
     />
    </>
  )
}

export default App
