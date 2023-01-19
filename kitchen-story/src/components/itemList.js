import React from 'react'
import Item from './item';
import Basket from './Basket';
import Nav from './NavBar.js';


export default function ItemList(props) {
  const {foodItems, addToBasket, removeFromBasket, isLoggedIn, loginInput, goToCheckout, basketHandler, itemsForCheckout} = props

  return (
    <div className="container">
      <h1> Latest products on offer</h1>
      <Nav isLoggedIn={isLoggedIn} loginInput={loginInput}/>
      <div className="row">
        <main className="col-8" style={{paddingTop:"20px"}}>
            <div className="row">
                {foodItems.map(item=>(
                  <div key={item.id} className='col-md-4' style={{paddingTop: "10px"}}>
                      <Item addToBasket={(item)=>addToBasket(item)} item={item}/>
                  </div>))
                }
            </div>

        </main>
        
          <Basket
            // basket={basket}
            // foodIitems={foodItems}
            addToBasket={addToBasket}
            removeFromBasket={removeFromBasket}
            goToCheckout={goToCheckout}
            basketHandler={basketHandler}
            itemsForCheckout={itemsForCheckout}
          ></Basket>
      </div>
    </div>
    
  )
}
