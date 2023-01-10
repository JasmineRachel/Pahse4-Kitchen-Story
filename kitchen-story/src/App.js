import './App.css';
import { BrowserRouter, Route, Routes, Navigate, redirect, resolvePath } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ItemList from './components/ItemList.js';
import AdminLogin from './components/AdminLogin.js';
import AdminDashboard from './components/AdminDashboard.js';
import PasswordReset from './components/PasswordReset.js';

function App() {
  // for retrieving all food products for the shop & admin dashboard
  const [foodItems, setFoodItems] = useState([]);
   // for users to add items to their shopping basket
  const [basketItems, setBasketItems] = useState([]);
  //admin to add new products to the foodItems list
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
  const [userData, setUserData] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isReset, setIsReset] = useState(false);
  const [newPassword, setNewPassword] = useState("");

  // made this a reuseable function as it is used frequently
  const fetchData = (dataList, setState) => {
    fetch(`http://localhost:3000/${dataList}`)
    .then(resp=>resp.json())
    .then(data=>setState(data)) 
  }

  useEffect(()=> {
    fetchData('products', setFoodItems)
  }, [])

  useEffect(()=> {
    fetchData('users', setUserData)
  }, [])
 
  const loginInputHandler = (e) => {
    setLoginInput({...loginInput, [e.target.name] : [e.target.value]});
  };
  // TODO: figure out how to hard code the image path: `/kitchen-story/public/images/${img}`
  const newProductHandler = (e) => {
    setNewProduct({...newProduct, [e.target.name] : e.target.value});
  };
  const newPasswordHandler = (e) => {
    setNewPassword(e.target.value);
  }
  const toggleIsLoggedIn = () => {
    setIsLoggedIn(current => !current);
  };
  const toggleIsReset= () => {
    setIsReset(current => !current);
  };

  useEffect(() => {
    console.log('is logged in? ', isLoggedIn)
  },[isLoggedIn]);

  useEffect(() => {
    console.log('password reset? ', isReset)
  },[isReset]);

  const dataLength = Object.keys(loginInput).length

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


  const getUserID = () => {
    const findUserId = userData.map(user => (user.email === loginInput.email[0] ? user.id : null));
    const userid = findUserId.find(element => typeof element === 'number');
    return userid
  }

  const getUsername = () => {
    const findUsername = userData.map(user => (user.email === loginInput.email[0] ? user.username : null));
    const username = findUsername.find(element => typeof element === 'string');
    return username
  }

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

  const resetPassword = (e) => {
    console.log("resetting password...")
    fetch(`http://localhost:3000/users/${getUserID()}`, {
      method: 'PUT',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        email:loginInput.email[0],
        username:getUsername(),
        password: newPassword})
      
    }).then((resp) => {
      console.log(resp.status)
      // I am unable to get the page to redirect to '/admin-login' when user has successfully changed password.
      // I suspect it is due to the conditional rendering in PasswordReset.js
      console.log(resp.status);
      if (resp.status === 201){
        e.preventDefault();
        fetchData('users', setUserData)
        toggleIsReset();
        if (isReset === true){
          alert("yay")
          console.log("redirecting...")
          
        }
      }
    })
    toggleIsReset();
    return redirect('/admin-login');
  }
 
  // product management
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
            <Route index element={<ItemList foodItems={foodItems} basketItems={basketItems} addToBasket={addToBasket} removeFromBasket={removeFromBasket}/>}/>
            <Route path="/admin-dashboard" element={<AdminDashboard foodItems={foodItems} isLoggedIn={isLoggedIn} loginInput={loginInput} newProduct={newProduct} newProductHandler={newProductHandler} addProduct={addProduct} deleteProduct={deleteProduct}/>}/> 
            <Route path="/admin-login" element={isLoggedIn === true ? <Navigate to="/admin-dashboard"/> : <AdminLogin loginInput={loginInput} loginInputHandler={loginInputHandler} loginToPortal={loginToPortal}/>}/>
            <Route path="/password-reset" element={ <PasswordReset loginInput={loginInput} loginInputHandler={loginInputHandler} userExists={userExists} isLoggedIn={isLoggedIn} newPasswordHandler={newPasswordHandler} newPassword={newPassword} resetPassword={resetPassword}/>}/>
          
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
