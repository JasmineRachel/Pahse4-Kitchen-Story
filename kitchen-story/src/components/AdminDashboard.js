import React from 'react'
import Nav from './NavBar.js';
export default function AdminDashboard(props) {
    const {foodItems, isLoggedIn, loginInput, newProduct, newProductHandler, addProduct, deleteProduct} = props;
    const {name, category, desc, price, img} = newProduct;
  return (
    <div className="container">

        <h2> Admin Dashboard </h2>
        <Nav isLoggedIn={isLoggedIn} loginInput={loginInput}/>
        <div className="row" style={{paddingTop: "50px"}}>
            <div className="col-8 table-responsive-sm" >
            <h2> Product list </h2>
                
                <table className="table table-dark table-sm"  >
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Product Name</th>
                            <th scope="col">Category</th>
                            <th scope="col">Price</th>
                            <th scope="col">Description</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    {foodItems.map(item=>(
                    <tbody key={item.id}>
                        <tr>
                            <th scope="row">{item.id}</th>
                            <td>{item.name}</td>
                            <td>{item.category}</td>
                            <td>{item.price}</td>
                            <td>{item.desc}</td>
                            {isLoggedIn ? 
                                <td>
                                    <button type="remove" className="btn btn-primary btn-sm" onClick={() => deleteProduct(item.id)}>remove</button>
                                </td>
                            :
                                ""
                            }
                            
                        </tr>

                    </tbody>
                    ))}
                </table>
                
            </div>
            {isLoggedIn ?
                <aside className="col-md-4 ml-auto" style={{paddingTop:"0px", paddingLeft:"20px"}}>
                    <h2> Add a new product</h2>
                    <form onSubmit={addProduct}>
                        <div className="row">   
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Product name</label>
                                <input 
                                    type="text" className="form-control" id="productName" 
                                    name="name" value={name} placeholder="Cheese" onChange={newProductHandler} required
                                />
                            </div>
                            <div className="col-6  mb-3">
                                <label htmlFor="category" className="form-label">Category</label>
                                <input 
                                    type="text" className="form-control" id="productCategory" 
                                    name="category" value={category} placeholder="Dairy" onChange={newProductHandler} required
                                />
                            </div>
                            <div className=" col-6 mb-3">
                                <label htmlFor="description" className="form-label">Description</label>
                                <input 
                                    type="text" className="form-control" id="productDescription" 
                                    name="desc" value={desc} placeholder="350g" onChange={newProductHandler} required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="description" className="form-label">Price £</label>
                                <input 
                                    type="currency" className="form-control" id="productPrice" 
                                    name="price" value={price} placeholder="£3.50" onChange={newProductHandler} required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="img" className="form-label"> Product image</label>
                                {/* TODO: figure out how to hard code the image path: '/kitchen-story/public/images/' */}
                                <input 
                                    type="file" className="form-control" id="img" 
                                    name="img" value={img} onChange={newProductHandler} required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                        
                    </form>
                </aside>
                :
                ""
            }
        </div>
    </div>
  )
}
