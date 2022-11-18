import React from 'react'
import Item from './Item';

export default function ItemList({items, handleClick}) {
  return (
    <div>
        <h1> Please select your items</h1>

        <div>
            {
                items.map(item=>(
                <div key={item.id}>
                    <Item handleClick={(id)=>handleClick(id)} item={item}/>
                </div>))
            }
        </div>
    </div>
  )
}
