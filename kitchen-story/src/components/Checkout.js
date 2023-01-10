import React from 'react';
import Basket from './Basket.js';
import Nav from './NavBar.js';

export default function Checkout(props) {
    const {basketItems, checkoutInput, checkoutInputHandler, purchaseOrder} = props;
    const {fullname, email, shipTo} = checkoutInput;
  return (
    <div className="container">
        <h2> Checkout </h2>
        <Nav/>
        <form onSubmit={purchaseOrder} style={{margin: "auto",  width: "500px"}}>
            <label htmlFor="fullname" className="form-label">Full Name</label>
            <input 
                type="text" className="form-control" placeholder="Full Name" name="fullname" 
                value={fullname} onChange={checkoutInputHandler} required
            />
            <label htmlFor="username" className="form-label">Email </label>  
            <input 
                type="email" className="form-control" placeholder="Email" name="email" 
                value={email} onChange={checkoutInputHandler} required
            />  
            <label htmlFor="fullname" className="form-label">Full Address</label>
            <input 
                type="text" className="form-control" placeholder="Full Address" name="shipTo" 
                value={shipTo} onChange={checkoutInputHandler} required
            />
            <input 
                type="hidden" className="form-control" placeholder="Full Address" name="items" 
                value={basketItems} onChange={checkoutInputHandler} required
            />
            <div className="mb-3">
                <button className="btn btn-primary" type="submit"> Order </button>
            </div>
        </form>
        
        {/* <div>
        {basketItems.map((item) => (
                <div key={item.id} className="row" style={{margin: "auto"}}>
                    <div className="col-2" style={{width: "100px"}}> {item.name}</div>
                    <div className="col-2" style={{width: "150px"}}> 
                        <button className="remove" onClick={()=>removeFromBasket(item)}> - </button>
                        <button onClick={()=>addToBasket(item)} className="add"> + </button>
                    </div>
                    <div className="col-2 text-right" style={{width: "150px"}}> 
                        {item.qty} X £{item.price.toFixed(2)}
                    </div>    
                </div>
                
                ))}
        </div> */}

        
       
    </div>
  )
}
