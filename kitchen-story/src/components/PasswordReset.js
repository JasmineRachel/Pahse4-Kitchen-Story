import React from 'react'

export default function PasswordReset(props) {
    const {loginInput, loginInputHandler, userExists, isLoggedIn, newPasswordHandler, newPassword, resetPassword} = props
    const {email} = loginInput

  return (
    <div className="container" style={{width: "500px"}}>
        

        {isLoggedIn === true ? 
        <div>
            <p> hi {email} please reset you password</p>
            <form onSubmit={resetPassword}>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">New Password</label>
                    <input 
                        type="password" className="form-control" placeholder="Password" 
                        name="password" value={newPassword} onChange={newPasswordHandler} required
                    />

                </div>
                <div className="mb-3">
                    <button className="btn btn-primary" type="submit">  Change Password </button>
                </div>
            </form> 
        </div>
        : 
        <div>
            <h2>PasswordReset</h2>
            <form onSubmit={userExists}>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Email</label>
                    <input 
                        type="email" className="form-control" placeholder="Email" name="email" 
                        value={email} onChange={loginInputHandler} required
                    />
                    <div className="invalid-feedback">
                        Please provide a valid username.
                    </div>
                </div>
                <div className="mb-3">
                    <button className="btn btn-primary" type="submit"> Enter </button>
                </div> 
            </form>
        </div>
        }
        
    </div>
  )
}
