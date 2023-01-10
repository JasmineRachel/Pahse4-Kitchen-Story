import React from 'react'

export default function Basket(props) {
    const {basketItems, addToBasket, removeFromBasket, basketHandler, checkout, purchaseOrder} = props;
    const totalPrice = basketItems.reduce((a, c) => a + c.qty * c.price, 0);

  return (
    
    <aside className="col-md-4 ml-auto" style={{paddingTop:"30px", paddingLeft:"20px"}}>
        <div style={{backgroundColor: "papayawhip"}}>
            <h2>Basket Items</h2>
       
            <div>
                {basketItems.length === 0 && <div> Basket is empty</div>}
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
                {basketItems.length > 0 && (
                    <>
                    <hr></hr>
                    <div className="row"  style={{margin: "auto"}}>
                        <div className="col-2"  style={{width: "120px"}}>Total Price: </div>
                        <div className="col-1 text-right" style={{width: "120px"}}>£{totalPrice.toFixed(2)}</div>
                    </div>
                    <form onSubmit={checkout}>
                        <div className="row" style={{ width: "420px", paddingTop: "20px", paddingLeft:"10px"}}>
                            <input type="hidden" className="form-control" name="items" 
                                value={basketItems} onChange={basketHandler} required
                            />
                            <button className="btn btn-primary" type="submit" >
                                Checkout
                            </button>
                        </div>
                    </form>
                    </>
                    
                )}
                
              {/* onClick={() => window.location.assign("/checkout")} */}
                {/* {basketItems.map((item) => (
                    <form key={item.id} onSubmit={purchaseOrder}>
                    <input 
                    type="hidden" className="form-control"  name="item" 
                    value={item.name} onChange={basketHandler} required
                    />
                    <input 
                    type="hidden" className="form-control"  name="qty" 
                    value={item.qty} onChange={basketHandler} required
                    />
                    <input 
                    type="hidden" className="form-control"  name="price" 
                    value={"qty: " + item.qty + " X " + item.price.toFixed(2)} onChange={basketHandler} required
                    />
                    </form>
                ))} */}
                
                

            </div>   
        </div>
    </aside>

       
  );
}

