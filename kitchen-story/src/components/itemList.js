import React from 'react'
import Item from './Item';

export default function ItemList({items, addToBasket}) {
  return (
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
  )
}
