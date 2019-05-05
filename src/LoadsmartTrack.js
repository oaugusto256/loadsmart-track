import React, { Component } from 'react';

import logo from './images/logo.png';

import './styles/index.scss';

export default class LoadsmartTrack extends Component {
  render() {
    return (
      <div>
        <nav className="navbar">
          <div className="container">
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
      </div>
    );
  }
}
