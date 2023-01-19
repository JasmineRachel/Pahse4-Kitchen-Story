import React from 'react'
import { useContext } from 'react';
import { BasketContext } from "../App.js";

export default function Basket(props) {
    const basketProducts = useContext(BasketContext);
    const { addToBasket, removeFromBasket, goToCheckout, basketHandler} = props;
    const totalPrice = basketProducts.reduce((a, c) => a + c.qty * c.price, 0);
    
    
    return (
    
        <aside className="col-md-4 ml-auto responsive" style={{paddingTop:"30px", paddingLeft:"20px"}}>
            <div style={{backgroundColor: "papayawhip"}}>
                <h2>Basket Items</h2>
        
                <div>
                    {basketProducts.length === 0 && <div> Basket is empty</div>}
                    {basketProducts.map(item => 
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
                    
                    )}
                        
                    {console.log("BASKET ITEMS BASKET ITEMS ", basketProducts)}

                    {basketProducts.length > 0 ? 
                     <>
                        <hr></hr>
                        <div className="row"  style={{margin: "auto"}}>
                            <div className="col-2"  style={{width: "120px"}}>Total Price: </div>
                            <div className="col-1 text-right" style={{width: "120px"}}>£{totalPrice.toFixed(2)}</div>
                        </div>
                        <div className="row" style={{ width: "420px", paddingTop: "20px", paddingLeft:"10px"}}>
                            <button className="btn btn-primary" type="submit" onClick={() => goToCheckout(totalPrice)}>
                                Checkout
                            </button>                   
                        </div>
    
                    </>
                    :""
                    }
                </div>   
            </div>
        </aside> 
    );
}

