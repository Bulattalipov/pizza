import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";


const FullPizza = () => {

  const [pizza, setPizza] = useState();
  const { id } = useParams();

  useEffect(() => {
    async function fetchPizza(){
      try {
        const {data} = await axios.get(`https://6303472d0de3cd918b31598e.mockapi.io/items/${id}`);
        setPizza(data);
      } catch (error) {

      }
    }
    fetchPizza();
  }, []);

  if(!pizza){
    return <h3>Загрузка...</h3>
  }

  return (
    <div>
      <img src={pizza.imageUrl} alt={pizza.title} />
      <h2>{pizza.title}</h2>
      <p>{pizza.price}</p>
    </div>
  )
}

export default FullPizza;