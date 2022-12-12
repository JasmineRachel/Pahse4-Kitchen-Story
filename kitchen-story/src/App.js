import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ItemList from './components/ItemList.js';
import AdminLogin from './components/AdminLogin.js';

function App() {
  const [items, setItems] = useState([])
  const [basketItems, setBasketItems] = useState([])
  const [users, setUsers] = useState([])
  const [username, setUsername] = useState([])
  // const [password, setPassword] = useState([])

  useEffect(()=> {
    fetch(' http://localhost:3000/items')
    .then(resp=>resp.json())
    .then(data=>setItems(data)) //
  }, [])

  useEffect(()=> {
    fetch(' http://localhost:3000/users')
    .then(resp=>resp.json())
    .then(data=>setUsers(data)) //
    
    
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

  const removeFromBasket = (item) => {
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
    <div className="container text-center">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<ItemList items={items} basketItems={basketItems} addToBasket={addToBasket} removeFromBasket={removeFromBasket}/>}/>
            <Route path="admin" element={<AdminLogin users={users} />}/>

          </Routes>
        
        </BrowserRouter>
        {/* <Basket
            items={items}
            basketItems={basketItems}
            addToBasket={addToBasket}
            removefromBasket={removeFromBasket}
        ></Basket> */}
      
    </div>
  );
}

export default App;
