import React, { Component } from 'react';
import Navbar from './components/Navbar';
import { getShipments } from './api';
import ReactLoading from 'react-loading';
import './styles/index.scss';
import map from './images/map.JPG';
import { weekday, month } from './helpers';
import ShipmentCard from './components/ShipmentCard';
import TruckIcon from './icons/Truck';

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
                    {console.log(shipments[shipmentSelectedId - 1])}
                    <div className="title">
                      {shipments[shipmentSelectedId - 1].stops.map(stop => {
                        return `${stop.city}, ${stop.state} ${stop.zipcode}`;
                      })}
                    </div>
                    <div className="delivery-info-container">
                      <div className="delivery-info">
                        {shipments[shipmentSelectedId - 1].stops.map((stop, index) => {
                          const date = new Date(stop.windowEnd);
                          return (
                            <div key={index} className="kind-container">
                              {!(index % 2) ? (
                                <div className="kind-title">Pick-Up</div>
                              ) : (
                                <div className="kind-title">Delivery</div>
                              )}
                              <div className="kind">
                                <div className="index">{index + 1}</div>
                                <div>
                                  <div className="address">{`${stop.city}, ${stop.state} ${
                                    stop.zipcode
                                  }`}</div>
                                  <div className="date">{`${
                                    weekday[date.getDay()]
                                  }, ${date.getDate()} ${
                                    month[date.getMonth()]
                                  }, ${date.getFullYear()}`}</div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      <div className="map-container">
                        <img className="map" src={map} alt="Map" />
                      </div>
                    </div>
                    <div className="more-info">
                      <div className="equipament-type">
                        <TruckIcon height={'30px'} width={'30px'} />
                        {`${
                          shipments[shipmentSelectedId - 1].equipmentType === 'DRV'
                            ? 'Dry Van'
                            : 'Other'
                        } ${shipments[shipmentSelectedId - 1].equipmentSize}''`}
                      </div>
                      <div>Commodity</div>
                      <div>Weight</div>
                      <div>Shipper Rating</div>
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
