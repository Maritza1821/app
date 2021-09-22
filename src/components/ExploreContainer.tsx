import { useEffect, useState } from 'react';
import './ExploreContainer.css';

interface ContainerProps {
  id: string;
  id_clientes:string;
}

const ExploreContainer: React.FC<ContainerProps> = ({ id, id_clientes }) => {
  const [nombre,setNombre]= useState("")
  useEffect(() => {

    async function fetchMyAPI() {
      if(id==="null"){
        let response: any = await fetch('https://inventario-machamfamily.herokuapp.com/api/cliente/' + id_clientes + "/")
        response = await response.json()
        console.log(response)
        
        setNombre(response.nombre);

      }else{

        let response: any = await fetch('https://inventario-machamfamily.herokuapp.com/api/proveedor/' + id + "/")
        response = await response.json()
        console.log(response)
        
        setNombre(response.nombre);
      }
    }
    fetchMyAPI()

}, [])
  
  return (
    <div className="container">
    
      <strong>{nombre}</strong>
    </div>
  );
};

export default ExploreContainer;
