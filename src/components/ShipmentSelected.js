import React from 'react';
import TruckIcon from '../icons/Truck';
import IconStar from '../icons/IconStar';
import map from '../images/map.JPG';
import { weekday, month } from '../helpers';

export default function ShipmentSelected(props) {
  const { shipment } = props;

  return (
    <div className="shipment-selected">
      <div className="title">
        {shipment.stops.map(stop => {
          return `${stop.city}, ${stop.state} ${stop.zipcode}`;
        })}
      </div>
      <div className="delivery-info-container">
        <div className="delivery-info">
          {shipment.stops.map((stop, index) => {
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
                    <div className="address">{`${stop.city}, ${stop.state} ${stop.zipcode}`}</div>
                    <div className="date">{`${weekday[date.getDay()]}, ${date.getDate()} ${
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
          {`${shipment.equipmentType === 'DRV' ? 'Dry Van' : 'Other'} ${shipment.equipmentSize}''`}
        </div>
        <div className="info">
          <p>Commodity</p>
          <p>Apples</p>
        </div>
        <div className="info">
          <p>Weight</p>
          <p>55.000lbs</p>
        </div>
        <div className="info">
          <p>Shipper Rating</p>
          <div className="stars">
            <IconStar width={'10px'} height={'10px'} />
            <IconStar width={'10px'} height={'10px'} />
            <IconStar width={'10px'} height={'10px'} />
            <IconStar width={'10px'} height={'10px'} />
            <IconStar width={'10px'} height={'10px'} />
          </div>
        </div>
      </div>
    </div>
  );
}
