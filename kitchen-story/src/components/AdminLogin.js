import React from 'react'

export default function AdminLogin(props) {
    const {users} = props
  return (
    <div className="container" style={{width: "500px"}}>
        <h2>Admin-login</h2>

        <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input type="text" className="form-control" id="username" placeholder="Username" name="username" required />
            <div className="invalid-feedback">
                Please provide a valid username.
            </div>
        </div>
        <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" placeholder="Password" name="password"required/>
            <div className="invalid-feedback">
                Please provide a valid password.
            </div>
        </div>
        <div className="mb-3">
            <button className="btn btn-primary" type="submit" onClick={()=>login()}>Log in</button>
        </div>
    </div>
    
  )
}
