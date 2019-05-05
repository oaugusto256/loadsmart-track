import React, { Component } from 'react';
import Navbar from './components/Navbar';
import { getShipments } from './api';
import TruckIcon from './icons/Truck';
import ReactLoading from 'react-loading';
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
    const { loading, shipments } = this.state;

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
              <div className="col-inner shipments">
                {shipments.map(shipment => {
                  console.log(shipment);
                  return (
                    <div key={shipment.id} className="shipment">
                      <div className="info">
                        <TruckIcon height={'40px'} width={'40px'} color={'#777'} />
                        {`${shipment.equipmentType} ${shipment.equipmentSize}`}''
                        {shipment.fare}
                      </div>
                      <div className="stops">
                        {shipment.stops.map((stop, index) => {
                          return (
                            <div key={index} className="stop">
                              {stop.address}
                              {stop.city}
                              {stop.country}
                              {stop.state}
                              {stop.windowEnd}
                              {stop.windowStart}
                              {stop.zipcode}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="col-inner">Shipment selected info</div>
            </>
          )}
        </div>
      </>
    );
  }
}
