import React from 'react'
import Item from './Item';
import Basket from './Basket';

export default function ItemList({items, basketItems, addToBasket, removeFromBasket}) {
  return (
    <div className="container">
      <div className="row">
        <main className="col-8" style={{ border: "", borderColor: "black"}}>
          <h1> latest products on offer</h1>
            <div className="row">
                {items.map(item=>(
                  <div key={item.id} className='col-md-4' style={{paddingTop: "10px"}}>
                      <Item addToBasket={(item)=>addToBasket(item)} item={item}/>
                  </div>))
                }
            </div>

        </main>
        <Basket
          items={items}
          basketItems={basketItems}
          addToBasket={addToBasket}
          removeFromBasket={removeFromBasket}
        ></Basket>
      </div>
    </div>
    
  )
}
