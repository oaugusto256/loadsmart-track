import React from 'react';
import logo from '../images/logo.png';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="logo">
          <img className="img" src={logo} alt="Loadsmart Logo" />
        </div>
        <div className="menu">
          <div className="item">(646) 887 6278</div>
          <div className="item">Shipper</div>
          <div className="item">Become a Carrier</div>
          <div className="item">Login</div>
          <div className="item">Sign Up </div>
        </div>
      </div>
    </nav>
  );
}
