import './App.css';
// import { Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Item from './components/Item.js';
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

  // const handleClick = (id=>{
  //   console.log('id in App.js' +id );
  //   setItem(items.find(item=>item.id===id));
  //   // setShow(true)
  //   console.log(item.name);
  // })

  const addToBasket = (item) => {
    console.log("Basket items" + basketItems)
    const exist = basketItems.find((basketItem) => basketItem.id === item.id);
    // const exist = cartItems.find((x) => x.id === product.id);
    if (exist) {
      setBasketItems(
        basketItems.map(basketItem =>
        basketItem.id === item.id ? { ...exist, qty: exist.qty + 1 } : basketItem
        )
      );
      console.log(item + "added to basket")
    } else {
      setBasketItems([...basketItems, { ...item, qty: 1 }]);
    }
  };

  return (
    <div className="App">
      <ItemList items={items} addToBasket={addToBasket}/>
      <Basket
          items={items}
          basketItems={basketItems}
          addToBasket={addToBasket}
        ></Basket>
    </div>
  );
}

export default App;
