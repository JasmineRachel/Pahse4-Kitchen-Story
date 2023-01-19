import React from 'react';

export default function PasswordReset(props) {
    const {loginInput, loginInputHandler, userExists, isLoggedIn, newPasswordHandler, newPassword, resetPassword} = props
    const {email} = loginInput

  return (
    <div className="container" style={{width: "500px"}}>
        <div>
            <h2>Password Reset</h2>

            <form onSubmit={userExists}>
                <label htmlFor="username" className="form-label">Please enter your email to reset your password </label>
                <div className="input-group mb-3">
                    <input 
                        type="email" className="form-control" placeholder="Email" name="email" 
                        value={email} onChange={loginInputHandler} required
                    />
                    <button className="btn btn-primary" type="submit"> Enter </button>
                </div>
            </form>

            
        </div>
            
        <div>
            <p> </p>
            <form onSubmit={resetPassword}>
                <label htmlFor="password" className="form-label">Enter your new password</label>
                <div className="input-group mb-3">
                    <input 
                        type="password" className="form-control" placeholder="Password" 
                        name="password" value={newPassword} onChange={newPasswordHandler} disabled={!isLoggedIn}
                    />
                    <button className="btn btn-primary" type="submit" disabled={!isLoggedIn}>  Change Password </button>

                </div>
            </form> 
        </div>

        <div className="mb-3">
              <a href="/admin-login" className="link-primary">Log in to your Dashboard</a>
        </div>
        <div className="mb-3">
              <a href="/" className="link-primary">Home</a>
        </div>
        
        
        
    </div>
  )
}
