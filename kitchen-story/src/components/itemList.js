import React from 'react'
import Item from './Item';

export default function ItemList({items, handleClick}) {
  return (
    <div className='container'>
        <h1> Please select your items</h1>

        <div className='row'>
            {
                items.map(item=>(
                <div key={item.id} className='col-md-3'>
                    <Item handleClick={(id)=>handleClick(id)} item={item}/>
                </div>))
            }
        </div>
    </div>
  )
}
