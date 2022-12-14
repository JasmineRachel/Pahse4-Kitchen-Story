import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ItemList from './components/ItemList.js';
import AdminLogin from './components/AdminLogin.js';
import AdminDashboard from './components/AdminDashboard.js';
import { render } from '@testing-library/react';

function App() {
  const [items, setItems] = useState([]);
  const [basketItems, setBasketItems] = useState([]);
  const [loginInput, setLoginInput] = useState({
    username: " ",
    password: " "
  });
  const [newProduct, setNewProduct] = useState({
    name: " ",
    category: " ",
    price: " ",
    desc: " ",
    img: []
  });
  const [userData, setUserData] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(()=> {
    fetch(' http://localhost:3000/items')
    .then(resp=>resp.json())
    .then(data=>setItems(data)) //
  }, [])

  useEffect(()=> {
    fetch(' http://localhost:3000/users')
    .then(resp=>resp.json())
    .then(data=>setUserData(data)) //
  }, [])
 
  const loginHandler = (e) => {
    
    setLoginInput({...loginInput, [e.target.name] : [e.target.value]});
   
  };
  // TODO: figure out how to hard code the image path: '/kitchen-story/public/images/'
  const newProductHandler = (e) => {
    // const path =  '/kitchen-story/public/images/';
    // const value ={}
    setNewProduct({...newProduct, [e.target.name] : e.target.value});
   
  };

  const toggleIsLoggedIn = () => {
    setIsLoggedIn(current => !current);
  };

  useEffect(() => {
    console.log('is logged in? ', isLoggedIn)
  },[isLoggedIn]);

  const dataLength = Object.keys(loginInput).length

  const checkUser = () => {
    const userCheck = userData.map(user => (user.username == loginInput.username[0] && user.password == loginInput.password[0]));
    const isTrue = (element) => element === true
    
    console.log("user check", userCheck)
    console.log(userCheck.some(isTrue))

    if(userCheck.some(isTrue) === true) {
      toggleIsLoggedIn()
      console.log("login successful")
      console.log("user input", loginInput.username[0], loginInput.password[0])
    }else{
      console.log("is logged in? ", isLoggedIn)
      console.log("no entry dude")
      console.log("user input", loginInput.username[0], loginInput.password[0])
    }
  }

  const submitHandler = e => {
    e.preventDefault();
    
    console.log("userdata1", userData);
    console.log("userinput1", loginInput);

    if(dataLength === 2){
      return checkUser(userData);
    }else{
      alert("no id, no entry")
    }
    
  }

  const submitProduct = e => {
    e.preventDefault();
    console.log("new product: ", newProduct);
  }
 
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
  // TODO: use this function or similar logic to remove products in the admin dashboard
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
            <Route index element={<ItemList items={items} basketItems={basketItems} addToBasket={addToBasket} removeFromBasket={removeFromBasket}/>}/>
            <Route path="/admin-dashboard" element={<AdminDashboard items={items} isLoggedIn={isLoggedIn} loginInput={loginInput} newProduct={newProduct} newProductHandler={newProductHandler} submitProduct={submitProduct}/>}/> 
            <Route path="/admin-login" element={isLoggedIn === true ? <Navigate to="/admin-dashboard"/> : <AdminLogin loginInput={loginInput} loginHandler={loginHandler} submitHandler={submitHandler}/>}/>
          
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
