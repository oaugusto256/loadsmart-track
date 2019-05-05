import React, { Component } from 'react';
import Navbar from './components/Navbar';
import { getShipments } from './api';
import ReactLoading from 'react-loading';
import './styles/index.scss';
import ShipmentCard from './components/ShipmentCard';

export default class LoadsmartTrack extends Component {
  state = {
    loading: true,
    shipments: [],
    shipmentSelectedId: 1
  };

  async componentDidMount() {
    const shipments = await getShipments();

    this.setState({
      loading: false,
      shipments
    });
  }

  onSelectShipment = async id => {
    await this.setState({
      shipmentSelectedId: id
    });
  };

  render() {
    const { loading, shipments, shipmentSelectedId } = this.state;

    return (
      <>
        <Navbar />
        <div className="container">
          {loading ? (
            <div className="loading">
              <ReactLoading type={'spin'} color={'#353e47'} />
            </div>
          ) : (
            <>
              <div className="col-inner shipment-list-collumn">
                {shipments.map(shipment => {
                  return (
                    <ShipmentCard
                      key={shipment.id}
                      shipment={shipment}
                      onClick={this.onSelectShipment}
                      selected={shipmentSelectedId === shipment.id}
                    />
                  );
                })}
                <div className="lastLine" />
              </div>
              <div className="col-inner shipment-selected-collumn">
                {shipmentSelectedId === '' ? (
                  <div className="no-shipment-selected">
                    <p>No shipment selected!</p>
                  </div>
                ) : (
                  <div className="shipment-selected">
                    <div className="title">
                      {shipments[shipmentSelectedId - 1].stops.map(stop => {
                        return `${stop.city}, ${stop.state} ${stop.zipcode}`;
                      })}
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </>
    );
  }
}
