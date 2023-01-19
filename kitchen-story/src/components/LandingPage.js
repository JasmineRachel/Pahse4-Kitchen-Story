import React from 'react'

export default function LandingPage() {
  return (
    <div>
        <div className="row">
            <h1>Welcome to Kitchen Story! </h1>
            <h3> I am here..</h3>

            <div className="card-body col-2" style={{margin: "10px", borderRadius:"5px", backgroundColor: "papayawhip"}}>
                <h5 className='card-title mb-2'> ...to buy food </h5>
                <br></br>
                <button className="btn btn-primary" onClick={() => window.location.assign("/shop")}> Take me to the store! </button>
            </div>
            <div className="card-body col-2" style={{margin: "10px", borderRadius:"5px", backgroundColor: "papayawhip"}}>
                <h5 className='card-title mb-2'> ..for the admin portal  </h5>
                <br></br>
                <button className="btn btn-primary" onClick={() => window.location.assign("/admin-login")}> Take me backstage! </button>
            </div>
        </div>
    </div>
  )
}
