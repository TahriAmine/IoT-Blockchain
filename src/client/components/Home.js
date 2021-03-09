import logo from '../bc-iot.jpeg'
import React, { useRef, useEffect, useState, Fragment } from 'react'
import { Link } from 'react-router-dom'
const Home = () => {
    return (
        <Fragment>
                    <h1>Home Page</h1>

        <div className="leftBox">
            <Link className="btn-welcome" to="/sign-up">Inscription</Link>
        </div>
        <div className="rightBox">
            <Link className="btn-welcome" to="/sign-in">Connexion</Link>
        </div>
    </Fragment>
        /*
        <div>
        <div style={{
            background: `url(${logo})`,marginTop:"5px", width: "100%",height:"370px"
           }}>
           <Fragment>
            <div className="leftBox">
                <Link className="btn-welcome" to="/signup">Inscription</Link>
            </div>
            <div className="rightBox">
                <Link className="btn-welcome" to="/login">Connexion</Link>
            </div>
        </Fragment>
                        
        </div>
        <br/>
        <h1 style={{textAlign: "center"}}>Blockchain & IoT (Internet of Things)</h1>
        </div>
        */
    )
}

export default Home
