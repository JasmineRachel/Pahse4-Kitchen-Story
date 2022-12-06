import './App.css';
// import { Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ItemList from './components/ItemList.js';
import Basket from './components/Basket.js';

function App() {
  const [items, setItems] = useState([])
  // const [item, setItem] = useState({})
  const [basketItems, setBasketItems] = useState([])
  useEffect(()=> {
    fetch(' http://localhost:3000/items')
    .then(resp=>resp.json())
    .then(data=>setItems(data)) //
  }, [])

  const addToBasket = (item) => {
    console.log("Basket items " + basketItems)
    const itemExists = basketItems.find((basketItem) => basketItem.id === item.id);
  
    if (itemExists) {
      setBasketItems(
        basketItems.map(basketItem =>
        basketItem.id === item.id ? { ...itemExists, qty: itemExists.qty + 1 } : basketItem
        )
      );
      console.log(item.name + " added to basket")
    } else {
      setBasketItems([...basketItems, { ...item, qty: 1 }]);
    }
  };

  const removefromBasket = (item) => {
    const itemExists = basketItems.find((basketItem) => basketItem.id === item.id);
    if (itemExists.qty === 1) {
      setBasketItems(basketItems.filter((x) => x.id !== item.id));
    } else {
      setBasketItems(
        basketItems.map((basketItem) =>
        basketItem.id === item.id ? { ...itemExists, qty: itemExists.qty - 1 } : basketItem
        )
      );
    }
  }

  return (
    <div className="App">
      <ItemList items={items} addToBasket={addToBasket}/>
      <Basket
          items={items}
          basketItems={basketItems}
          addToBasket={addToBasket}
          removefromBasket={removefromBasket}
        ></Basket>
    </div>
  );
}

export default App;
