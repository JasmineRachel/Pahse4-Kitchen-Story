import React from 'react'
import Nav from './NavBar.js';

export default function Success(props) {
    const {orders} = props;
    const customerInfo = orders[orders.length -1 ] || {} 
    const {customerName, customerEmail, customerAddress} = customerInfo
    const currentOrder = JSON.parse(sessionStorage.getItem("currentOrder"));
    const TotalCost = sessionStorage.getItem("totalPrice")
    // today's date in dd/mm/yyyy format
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = today.getMonth() + 1; 
    const dd = today.getDate();
    const fullDate = dd + "/" + mm + "/" + yyyy;

    return (
        <div className="container">

            <Nav/>
            <br></br>
            <h5> Thank you for shopping at Kitchen Story!</h5>
            <br></br>
            <h5> Order Summary</h5>
            <div className="row">
                
                <div className="card-body col-2" style={{margin: "10px", borderRadius:"5px", backgroundColor: "papayawhip"}}>
                    <h5 className='card-title mb-2'> <strong> Order Details </strong> </h5>
                    <br></br>
                    <h6 className='card-subtitle mb-2 text-muted'><b>Products: </b></h6>
                    <table className="table table-sm table-responsive">
                        <thead>
                            <tr>
                                <th scope="col">Poduct</th>
                                <th scope="col">Qty</th>
                                <th scope="col">Price per unit</th>
                                <th scope="col">Total</th>
                            </tr>
                        </thead>
                        {currentOrder.map(item => 
                        <tbody key={item.id}>
                            <tr>
                                <td>{item.name}</td>
                                <td>{item.qty}</td>
                                <td>£{item.price.toFixed(2)}</td>
                                <td> £{item.qty.toFixed(0) * item.price.toFixed(2)} </td>
                            </tr>
                        </tbody>
                        )}
                    </table>
                        
  
                    <h6 className='card-title mb-2 text-muted'><b>Total Price: </b> £{parseFloat(TotalCost).toFixed(2)} </h6>
                    <h6 className='card-subtitle mb-2 text-muted'><b>Date of Purchase: </b> {fullDate} </h6>
                </div>

                <div className="card-body col-2" style={{margin: "10px", borderRadius:"5px", backgroundColor: "papayawhip"}}>
                    <h5 className='card-title mb-2'> <strong>Customer Details</strong> </h5>
                    <br></br>
                    <h6 className='card-subtitle mb-2 text-muted'> <b>Full Name: </b>{customerName}</h6>
                    <h6 className='card-subtitle mb-2 text-muted'> <b>Email: </b> {customerEmail} </h6>
                    <h6 className='card-subtitle mb-2 text-muted'><b>Address: </b> {customerAddress} </h6>
                </div>
            </div> 
            
            <button className="btn btn-primary" onClick={() => window.location.assign('/shop')}>Continue shopping</button>

        </div>
    )
}
