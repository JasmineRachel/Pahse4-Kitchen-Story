// eslint-disable-next-line
import './App.css';
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import ItemList from './components/itemList.js';
import AdminLogin from './components/AdminLogin.js';
import AdminDashboard from './components/AdminDashboard.js';
import PasswordReset from './components/PasswordReset.js';
import Checkout from './components/Checkout.js';
import Success from './components/Success.js';
import LandingPage from './components/LandingPage.js';


export const BasketContext = React.createContext();

function App() {
  // for saving all food products for the shop & admin dashboard
  const [foodItems, setFoodItems] = useState([]);
  // for saving all user data
  const [userData, setUserData] = useState([]);
   // for users to add items to their shopping basket
  const [basketItems, setBasketItems] = useState([]);
  const [itemsForCheckout, setItemsForCheckout] = useState({
    items: [],
    totalPrice: ""
  });
  const [orders, setOrders] = useState([]);
  const [checkoutInput, setCheckoutInput] = useState({
    fullname: "",
    email: "",
    shipTo: "",
  });
  //admin to add new products to the foodItems list
  // TODO: figure out how to hard code the image path: `/kitchen-story/public/images/${img}`
  const [newProduct, setNewProduct] = useState({
    name: " ",
    category: " ",
    price: " ",
    desc: " ",
    img: []
  });
  const [loginInput, setLoginInput] = useState({
    email: "",
    username: " ",
    password: " "
  });
  // to toggle the user's logged in state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  //saving the user's new password when resetting
  const [newPassword, setNewPassword] = useState("");

  // A reuseable function to retrieve and save data as it is used frequently
  const fetchData = (dataList, setState) => {
    fetch(`http://localhost:3000/${dataList}`)
    .then(resp=>resp.json())
    .then(data=>setState(data)) 
  }

  useEffect(()=> {
    fetchData('products', setFoodItems);
    fetchData('users', setUserData);
    fetchData('orders', setOrders);
    setBasketItems(basketItems);
    setCheckoutInput(checkoutInput)
  }, [])
  
 
  const loginInputHandler = (e) => {
    setLoginInput({...loginInput, [e.target.name] : [e.target.value]});
  };
  const basketHandler = (e) => {
    setItemsForCheckout({...itemsForCheckout, [e.target.name] : [e.target.value]});
  };
  const newProductHandler = (e) => {
    setNewProduct({...newProduct, [e.target.name] : e.target.value});
  };
  const checkoutInputHandler = (e) => {
    setCheckoutInput({...checkoutInput, [e.target.name] : [e.target.value]});
  };
  const newPasswordHandler = (e) => {
    setNewPassword(e.target.value);
  };
  const toggleIsLoggedIn = () => {
    setIsLoggedIn(current => !current);
  };
  useEffect(() => {
    console.log('is logged in? ', isLoggedIn)
  },[isLoggedIn]);


  const dataLength = Object.keys(loginInput).length
  //the functions below manage the admin portal 
  //checks if user exists at log in
  const checkUser = () => {
    const userCheck = userData.map(user => (user.username === loginInput.username[0] && user.password === loginInput.password[0]));
    const isTrue = (element) => element === true
    
    console.log("user check", userCheck)
    console.log(userCheck.some(isTrue))

    if(userCheck.some(isTrue) === true) {
      toggleIsLoggedIn()
      console.log("login successful",)
      console.log("user input", loginInput.username[0], loginInput.password[0])
    }else{
      console.log("is logged in? ", isLoggedIn)
      console.log("no entry dude")
      console.log("user input", loginInput.username[0], loginInput.password[0])
    }
  }
  // handles login 
  const loginToPortal = (e) => {
    e.preventDefault();
    
    console.log("userdata on login", userData);
    console.log("userinput on login", loginInput);

    if(dataLength === 3){
      return checkUser(userData);
    }else{
      alert("no id, no entry")
    }
    
  }

  //Checks email exists at password reset
  const emailCheck = () => {
    const checkEmail = userData.map(user => (user.email === loginInput.email[0]));
    const isTrue = (element) => element === true;

    console.log("email check", checkEmail)
    console.log(checkEmail.some(isTrue))

    if(checkEmail.some(isTrue) === true) {
      toggleIsLoggedIn()
      console.log("can reset",)
      console.log("found USER'S ID", getUserID(), getUsername())
      console.log("user input at reset", loginInput.email[0])
    }else{
      console.log("is logged in? ", isLoggedIn)
      console.log("password reset no allowed. ", loginInput.email[0], " doesn't exist!")
    }
  } 

  //handles email submit when check user exists on password reset
  const userExists = (e) => {
    e.preventDefault();
    
    console.log("userdata on login", userData);
    console.log("userinput on login", loginInput);

    if(dataLength === 3){
      return emailCheck(userData);
    }else{
      alert("no id, no entry")
    }
  }

   //Finds user ID to reference at PUT for password reset
  const getUserID = () => {
    const findUserId = userData.map(user => (user.email === loginInput.email[0] ? user.id : null));
    const userid = findUserId.find(element => typeof element === 'number');
    return userid
  }
  //Finds username to reference at PUT for password reset
  const getUsername = () => {
    const findUsername = userData.map(user => (user.email === loginInput.email[0] ? user.username : null));
    const username = findUsername.find(element => typeof element === 'string');
    return username
  }

  const resetPassword = (e) => {
    e.preventDefault();
    console.log("resetting password...")
    fetch(`http://localhost:3000/users/${getUserID()}`, {
      method: 'PUT',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        email:loginInput.email[0],
        username:getUsername(),
        password: newPassword})
      
    }).then((resp) => {
      console.log("resp", resp);
      if (resp.status === 200){
        
        fetchData('users', setUserData)
        window.location.assign("/admin-login")
      }
    })
  }
 
  // the functions below manage the kitchen story shop
  const addProduct = (e) => {
    console.log("Adding new product: ", newProduct);
    fetch(' http://localhost:3000/products', {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(newProduct)
    }).then((resp) => {
      console.log(resp.status)
      if(resp.status === 201){
        e.preventDefault();
        fetchData('products', setFoodItems)
        console.log(`${newProduct.name} product added`)
      }else{
        console.log("Something has gone wrong")
      }
    } )
  }

  const deleteProduct = (productId) => {
    console.log("Deleting product:", productId)
    fetch(`http://localhost:3000/products/${productId}`, {
      method: 'DELETE',
      
    }).then((resp) => {
      if(resp.status=== 200){
        fetchData('products', setFoodItems)
        console.log(`product ${productId} deleted`)
      }else{
        console.log("Something has gone wrong")
      }
    })
  }

  const addToBasket = (item) => {
    // e.preventDefault();
    console.log("Basket items " + basketItems)
    const itemExists = basketItems.find((basketItem) => basketItem.id === item.id);
  
    if (itemExists) {
      setBasketItems(
        basketItems.map(basketItem =>
        basketItem.id === item.id ? { ...itemExists, qty: itemExists.qty + 1 } : basketItem
        )
      );
      console.log(item.name + " added to basket")
      console.log("current basket " + basketItems)
    } else {
      setBasketItems([...basketItems, { ...item, qty: 1 }]);
    }
  };
 
  const removeFromBasket = (item) => {
    // e.preventDefault();
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
  
  const goToCheckout = (totalPrice) =>{
    // e.preventDefault();
    console.log("preparing for checkout... Items: ", basketItems);
    console.log(" TotalPrice of items: ", totalPrice);

    sessionStorage.setItem("currentOrder",JSON.stringify(basketItems));
    sessionStorage.setItem("totalPrice", totalPrice);

    console.log("going to checkout... ");
    window.location.assign("/checkout");
  };

  const purchaseOrder = (e) =>{
    e.preventDefault();

    fetch(' http://localhost:3000/orders', {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        customerName: checkoutInput.fullname[0], 
        customerEmail: checkoutInput.email[0],
        customerAddress: checkoutInput.shipTo[0],
        order: basketItems,
      })
    }).then((resp) => {
      console.log(resp.status)
      if(resp.status === 201){
        fetchData('orders', setOrders)

        console.log("successful checkout")
        window.location.assign("/checkout-success");
      }else{
        console.log("Something has gone wrong")
      }
    } )
  }
 
  return (
    <BasketContext.Provider value={basketItems}>
      <div className="container text-center">
          <BrowserRouter>
            <Routes>
              <Route index element={<LandingPage/>}/>
              <Route path="/shop" element={<ItemList foodItems={foodItems} basketItems={basketItems} addToBasket={addToBasket} removeFromBasket={removeFromBasket} isLoggedIn={isLoggedIn} loginInput={loginInput} goToCheckout={goToCheckout} basketHandler={basketHandler} itemsForCheckout={itemsForCheckout}/>}/>
              <Route path="/admin-dashboard" element={<AdminDashboard foodItems={foodItems} isLoggedIn={isLoggedIn} loginInput={loginInput} newProduct={newProduct} newProductHandler={newProductHandler} addProduct={addProduct} deleteProduct={deleteProduct}/>}/> 
              <Route path="/admin-login" element={isLoggedIn === true ? <Navigate to="/admin-dashboard"/> : <AdminLogin loginInput={loginInput} loginInputHandler={loginInputHandler} loginToPortal={loginToPortal}/>}/>
              <Route path="/password-reset" element={ <PasswordReset loginInput={loginInput} loginInputHandler={loginInputHandler} userExists={userExists} isLoggedIn={isLoggedIn} newPasswordHandler={newPasswordHandler} newPassword={newPassword} resetPassword={resetPassword}/>}/>
              <Route path="/checkout" element={<Checkout basketItems={basketItems} checkoutInput={checkoutInput} checkoutInputHandler={checkoutInputHandler} purchaseOrder={purchaseOrder}/>}/>
              <Route path="checkout-success" element={ <Success orders={orders} checkoutInput={checkoutInput}/> } />
            </Routes>
          </BrowserRouter>
      </div>
    </BasketContext.Provider>
  );
}

export default App;
