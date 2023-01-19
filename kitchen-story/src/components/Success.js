import React from 'react'
import Nav from './NavBar.js';

export default function Success(props) {
    const {orders, checkoutInput} = props;
    const {fullname, email, shipTo} = checkoutInput;
    const currentOrder = orders[orders.length -1 ];
    const {customerName, customerEmail, customerAddress, order} = currentOrder
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = today.getMonth() + 1; 
    const dd = today.getDate();
    const fullDate = dd + "/" + mm + "/" + yyyy;

  return (
    <div className="container">
        {console.log(currentOrder)}
        
        <Nav/>
        <h5> Thank you for shopping at Kitchen Story!</h5>
        <h5> Order Summary</h5>
        <div className="row">
            <div className="card-body col-2" style={{margin: "10px", borderRadius:"5px", backgroundColor: "papayawhip"}}>
                
                <h5 className='card-title'> Customer Details </h5>
                <h6 className='card-subtitle mb-2 text-muted'> <b>Full Name: </b>{customerName}</h6>
                <h6 className='card-subtitle mb-2 text-muted'> <b>Email: </b> {customerEmail} </h6>
                <h6 className='card-subtitle mb-2 text-muted'><b>Address: </b> {customerAddress} </h6>

            </div>
            <div className="card-body col-2" style={{margin: "10px", borderRadius:"5px", backgroundColor: "papayawhip"}}>
                
                <h5 className='card-title'> Order Details </h5>
                <h6 className='card-subtitle mb-2 text-muted'><b>Products: </b> </h6>
                <h6 className='card-subtitle mb-2 text-muted'><b>Total Price: </b>  </h6>
                <h6 className='card-subtitle mb-2 text-muted'><b>Date of Purchase: </b> {fullDate} </h6>

            </div>
        </div>
        
        <button className="btn btn-primary" onClick={() => window.location.assign('/')}>Continue shopping</button>

    </div>
  )
}
