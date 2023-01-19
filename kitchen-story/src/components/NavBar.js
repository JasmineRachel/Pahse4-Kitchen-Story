import React from 'react'
import {PersonFillIcon} from '@primer/octicons-react'


export default function Nav(props) {
    const {isLoggedIn, loginInput} = props
  return (
    <div>
       <nav className="navbar navbar-expand-lg bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">Kitchen Story</a>
                <a className="nav-link" href={isLoggedIn ? "/admin-dashboard" : "/admin-login"}> 
                    <PersonFillIcon size={24} />{isLoggedIn ? "Hello " + loginInput.username[0] : <>Log in to Admin Dashboard</> } 
                </a>
                <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                {isLoggedIn ? 
                    <li className="nav-item">
                        <a className="nav-link" href="/password-reset">reset password</a>
                    </li> :
                    ""
                }
                    <li className="nav-item">
                        <a className="nav-link active" aria-current="page" href="/shop">View shop</a>
                    </li>
                </ul>
                </div>
            </div>
        </nav>
        
    </div>
  )
}
