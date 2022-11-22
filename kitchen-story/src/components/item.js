import React from 'react'

export default function Item(props) {
    let {id, name, price, category, description, img } = props.item
  return (
    <div className='card' style={{width: "18rem"}}>
        <div className="card-body">
            <img src={img} className="card-img-top" alt="..." style={{width: "300 px", height: "200px"}}/>
            <h5 className='card-title'> {name} </h5>
            <h5 className='card-subtitle mb-2 text-muted'>£{price}</h5>
            <h6 className='card-subtitle mb-2 text-muted'>{category} </h6>
            <p className="card-text"> {description}</p>
            <button type="button" className="btn btn-primary">Add to basket</button>
        </div>
        
    </div>
  )
}
