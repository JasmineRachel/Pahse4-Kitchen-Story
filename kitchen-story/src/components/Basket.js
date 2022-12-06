import React from 'react'

export default function Basket(props) {
    const {basketItems, addToBasket} = props;
    let itemsPrice = basketItems.reduce((a, c) => a + c.qty * c.price, 0);
    const taxPrice = itemsPrice * 0.14;
    const shippingPrice = itemsPrice > 2000 ? 0 : 20;
    const totalPrice = itemsPrice + taxPrice + shippingPrice;

  return (
    <>
    <br>
    </br>

    <div className="block col-1" style={{border: "solid", borderColor: "black"}}>
        <h2>Cart Items</h2>
        <div>
            {basketItems.length === 0 && <div> Basket is empty</div>}
            {basketItems.map((item) => (
            <div key={item.id} className="row">
                <div className="col=2"> {item.name}</div>
                <div className="col-2"> 
                    <button className="remove"> - </button>
                    <button className="add"> + </button>
                </div>
                <div className="col=2 text-right"> 
                    {item.qty} X £{item.price.toFixed}
                </div>
            </div>
            

            ))}

    
        </div>
    </div>
    </>

       
  );
}

