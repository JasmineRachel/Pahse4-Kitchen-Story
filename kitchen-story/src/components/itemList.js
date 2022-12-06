import React from 'react'
import Item from './Item';

export default function ItemList({items, addToBasket}) {
  return (
    <div className='container'>
        <h1> Please select your items</h1>

        <div className='row'>
            {
                items.map(item=>(
                <div key={item.id} className='col-md-3' style={{paddingTop: "10px"}}>
                    <Item addToBasket={(item)=>addToBasket(item)} item={item}/>
                </div>))
            }
        </div>
    </div>
  )
}
