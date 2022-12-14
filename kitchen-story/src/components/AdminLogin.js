import React from 'react'

export default function AdminLogin(props) {
    const {loginInput, loginInputHandler, loginToPortal} = props
    const{username, password} = loginInput;
  return (
    <div className="container" style={{width: "500px"}}>
        <h2>Admin Login</h2>
        
        <form onSubmit={loginToPortal}>
            <div className="mb-3">
                <label htmlFor="username" className="form-label">Username</label>
                <input 
                    type="text" className="form-control" placeholder="Username" name="username" 
                    value={username} onChange={loginInputHandler} required
                />
                <div className="invalid-feedback">
                    Please provide a valid username.
                </div>
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input 
                    type="password" className="form-control" placeholder="Password" 
                    name="password" value={password} onChange={loginInputHandler} required
                />
                <div className="invalid-feedback">
                    Please provide a valid password.
                </div>
            </div>
            <div className="mb-3">
              <a href="/password-reset" className="link-primary">Forgot password</a>
            </div>
            
            <div className="mb-3">
                <button className="btn btn-primary" type="submit"> Log in </button>
            </div>
        </form>
    </div>
    
  )
}

