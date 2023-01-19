import React from 'react';
import { useContext } from "react";
import Nav from './NavBar.js';
import { BasketContext } from "../App.js";

export default function Checkout(props) {
    const {checkoutInput, checkoutInputHandler, purchaseOrder} = props;
    const {fullname, email, shipTo} = checkoutInput;
    const basketProducts = useContext(BasketContext);

  return (
    <div className="container">
        
        <Nav/>
        <br></br>
        <h2> Checkout </h2>
        <br></br>
        {console.log("basket items @ checkout", basketProducts)}
        <form onSubmit={(e) => purchaseOrder(e, basketProducts)} style={{margin: "auto",  width: "500px"}}>
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
 
            <div className="mb-3">
                <button className="btn btn-primary" type="submit"> Order </button>
            </div>
        </form>
    </div>
  )
}
