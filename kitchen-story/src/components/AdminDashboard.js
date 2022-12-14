import React from 'react'
import {PersonFillIcon} from '@primer/octicons-react'

export default function AdminDashboard(props) {
    const {items} = props;
  return (
    <div className="container">
        <h2> Admin Dashboard </h2>
        <nav class="navbar navbar-expand-lg bg-light">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">Kitchen Story</a>
                <a class="nav-link disabled"> <PersonFillIcon size={24} /> Hello [username]</a>
                <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                <li class="nav-item">
                    <a class="nav-link" href="#">reset password</a>
                    </li>
                    <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="/">View shop</a>
                    </li>
                </ul>
                </div>
            </div>
        </nav>
        
        <div className="row" style={{paddingTop: "50px"}}>
            <div className="col-8 table-responsive-sm" >
            <h2> Product list </h2>
                <table className="table table-dark table-sm" >
                    <thead>
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Product Name</th>
                        <th scope="col">Category</th>
                        <th scope="col">Price</th>
                        <th scope="col">Description</th>
                        </tr>
                    </thead>
                    {items.map(item=>(
                    <tbody>
                        <tr>
                        <th scope="row">{item.id}</th>
                        <td>{item.name}</td>
                        <td>{item.category}</td>
                        <td>{item.price}</td>
                        <td>{item.description}</td>
                        </tr>

                    </tbody>
                    ))}
                </table>
            </div>
        
            <aside className="col-md-4 ml-auto" style={{paddingTop:"0px", paddingLeft:"20px"}}>
                <h2> Add a new product</h2>
                <form>
                    <div className="row">   
                        <div clasName="mb-3">
                            <label htmlFor="name" className="form-label">Product name</label>
                            <input type="text" className="form-control" id="productName" aria-describedby="prouctName" placeholder="Cheese"/>
                        </div>
                        <div className="col-6  mb-3">
                            <label htmlFor="category" className="form-label">Category</label>
                            <input type="text" className="form-control" id="productCategory" placeholder="Dairy"/>
                        </div>
                        <div className=" col-6 mb-3">
                            <label htmlFor="description" className="form-label">Description</label>
                            <input type="text" className="form-control" id="productDescription" placeholder="350g"/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Price £</label>
                            <input type="currency" className="form-control" id="productDescription" placeholder="£3.50"/>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                    
                </form>
            </aside>
        </div>
    </div>
  )
}
