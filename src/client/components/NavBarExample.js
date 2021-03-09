import React, { Component } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useHistory } from "react-router-dom";

function NavbarPage () {
  const history = useHistory()
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{}} >

    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav mr-auto"ml-auto>
        <li className="nav-item">
          <Link className="nav-link" to="/users">Users</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/sign-in">Dashboard</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/blockchain">Blockchain</Link>
        </li>
        <li className="nav-item">
         {/* <Link className="nav-link" to="/tx">Transactions</Link>*/}
        </li>
      </ul>      
        <span style ={{backgroundColor:'AliceBlue	'}}className="">
          <Link className="nav-link" to="/sign-in">Login</Link>
        </span>      
    </div>
  </nav>
    /*
<nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{}} >
  <div className="collapse navbar-collapse" id="navbarNav">
    <ul className="navbar-nav" ml-auto>
      <li className="nav-item ">
        <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/sign-in">Login</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/sign-up">Signup</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/user">Users</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/statistiques">Dashboard</Link>
      </li>
      </ul>
  </div>
</nav>*/
)
}


export default NavbarPage;
