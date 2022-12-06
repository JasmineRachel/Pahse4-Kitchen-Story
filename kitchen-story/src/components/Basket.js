import React from 'react'

export default function Basket(props) {
    const {basketItems, addToBasket} = props;
    const totalPrice = basketItems.reduce((a, c) => a + c.qty * c.price, 0);

  return (
    <>
    <br></br>

    <div className="block col-1" style={{border: "solid", borderColor: "black"}}>
        <h2>Basket Items</h2>
        <div>
            {basketItems.length === 0 && <div> Basket is empty</div>}
            {basketItems.map((item) => (
            <div key={item.id} className="row">
                <div className="col=2"> {item.name}</div>
                <div className="col-2"> 
                    <button className="remove"> - </button>
                    <button onClick={()=>addToBasket(item)} className="add"> + </button>
                </div>
                <div className="col=2 text-right"> 
                    {item.qty} X £{item.price.toFixed}
                </div>
            </div>
            

            ))}
            {basketItems.length !== 0 && (
                <>
                <hr></hr>
                <div className="row">
                    <div className="col-2">Total Price</div>
                    <div className="col-1 text-right">${totalPrice.toFixed(2)}</div>
                </div>
                <div className="row">
                    <button onClick={() => alert('Implement Checkout!')}>
                        Checkout
                    </button>
                </div>
                </>
            )}

    
        </div>
    </div>
    </>

       
  );
}

