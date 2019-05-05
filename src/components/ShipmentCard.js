import React, { Component } from 'react';
import { weekday, month } from '../helpers';
import TruckIcon from '../icons/Truck';

export default class ShipmentCard extends Component {
  onShipmentCardClick = () => {
    const { shipment, onClick } = this.props;
    onClick(shipment.id);
  };

  render() {
    const { shipment, selected } = this.props;

    return (
      <div
        onClick={this.onShipmentCardClick}
        className={`shipment-card ${selected ? 'selected' : ''}`}
      >
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
            const date = new Date(stop.windowEnd);
            return (
              <div
                className="stop-container"
                key={Math.random()
                  .toString(36)
                  .substr(2, 9)}
              >
                <div className="stop">
                  <div className="address">{`${stop.city}, ${stop.state} ${stop.zipcode}`}</div>
                  <div className="date">
                    {`${weekday[date.getDay()]}, ${date.getDate()} ${
                      month[date.getMonth()]
                    }, ${date.getFullYear()}`}
                  </div>
                </div>
                {!(index % 2) && <div className="next">></div>}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
