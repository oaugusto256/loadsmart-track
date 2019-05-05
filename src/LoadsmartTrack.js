import React, { Component } from 'react';
import Navbar from './components/Navbar';
import { getShipments } from './api';
import './styles/index.scss';

export default class LoadsmartTrack extends Component {
  state = {
    loading: true,
    shipments: []
  };

  async componentDidMount() {
    const shipments = await getShipments();

    this.setState({
      loading: false,
      shipments
    });
  }

  render() {
    const { loading } = this.state;

    return (
      <>
        <Navbar />
        <div className="container">
          {loading ? (
            <p>Loading</p>
          ) : (
            <>
              <div className="col-inner">Shipments</div>
              <div className="col-inner">Shipment selected info</div>
            </>
          )}
        </div>
      </>
    );
  }
}
