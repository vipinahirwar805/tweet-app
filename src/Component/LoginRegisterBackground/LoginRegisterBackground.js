import React, { useState } from 'react'
import Login from '../Login/Login'
import Register from '../Register/Register'
import logo from '../../Images/logo.png'
import logo2 from '../../Images/logo2.png'
import login from '../../Images/login-image.png'

export default function LoginRegisterBackground() {
    const [flag, setFlag] = useState(true);
    const handleChange = (event) => {
        setFlag(event);
    }

    return (
        
        <>
            <nav className="navbar navbar-light bg-dark">
                <img src={logo} width="60" height="60" alt="" />
                <h4 style={{ color: 'White', margin: 'auto' }}>Tweet App</h4>
            </nav>

            <div style={{ display: 'flex' }}>
                <div className='col-6' >
                    <img src={login} style={{ position: 'absolute', zIndex: '1', width: "100%", height: "200%"}} alt="" />
                    <p style={{ textAlign: 'center' }}>
                        <img src={logo2} style={{ position: 'relative', top: '200px', zIndex: '2', width: "50%", height: "69%" }} alt="" />
                    </p>
                </div>
                <div className='col-6 ml-3'>
                    {flag ? <Login handler={handleChange} /> : <Register handler={handleChange}/>}
                </div>

            </div>
        </>
    )
}
