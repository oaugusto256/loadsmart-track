import React, { Component } from 'react';
import Navbar from './components/Navbar';
import { getShipments } from './api';
import { weekday, month } from './helpers';
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
                    <>
                      <div key={shipment.id} className="shipment">
                        <div className="info">
                          <span className="name">
                            <TruckIcon height={'30px'} width={'30px'} />
                            {`${shipment.equipmentType === 'DRV' ? 'Dry Van' : 'Other'} ${
                              shipment.equipmentSize
                            }''`}
                          </span>
                          <span className="fare">${shipment.fare}</span>
                        </div>
                        <div className="stops">
                          {shipment.stops.map((stop, index) => {
                            const date = new Date(stop.windowStart);
                            return (
                              <>
                                <div key={index} className="stop">
                                  <div className="address">
                                    {`${stop.city}, ${stop.state} ${stop.zipcode}`}
                                  </div>
                                  <div className="date">{`${
                                    weekday[date.getDay()]
                                  }, ${date.getDate()} ${
                                    month[date.getMonth()]
                                  }, ${date.getFullYear()}`}</div>
                                </div>
                                {!(index % 2) && <div className="next">></div>}
                              </>
                            );
                          })}
                        </div>
                      </div>
                    </>
                  );
                })}
                <div className="lastLine" />
              </div>
              <div className="col-inner">Shipment selected info</div>
            </>
          )}
        </div>
      </>
    );
  }
}
