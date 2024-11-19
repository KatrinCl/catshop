import React, { useState } from 'react';
import { YMaps, Map, Placemark, SearchControl } from 'react-yandex-maps';
import './CSS/AddressDelivery.css';
import wb from '/wb.png';

const AddressDelivery = () => {

  const [deliveryMethod, setDeliveryMethod] = useState('pickup');

  const deliveryPoints = [
    { id: 1, address: 'г. Иваново, ул. Ленина, д. 10', coordinates: [56.9976, 40.9736] },
    { id: 2, address: 'г. Иваново, мкр. Видный, 4', coordinates: [56.969136, 41.027829] },
    { id: 3, address: 'г. Иваново, ул. Пушкина, д. 32', coordinates: [56.990, 40.970] },
  ];

  const [mapCenter, setMapCenter] = useState([56.9976, 40.9736]);

  const handlePointClick = (coordinates, address) => {
    setMapCenter(coordinates);
    setPickupAddress(address);
  };

  return (
    <div className='address-location'>
      <div className='location-banner'>
        <h2>Доставка</h2>
        <img src={wb} alt='Доставка' />
      </div>
      <div className='location-content-wrapper'>
        <div className='location-content'>
          <div className="location-list">
            <div className="delivery-tabs">
              <button className={deliveryMethod === 'pickup' ? 'active' : ''} onClick={() => setDeliveryMethod('pickup')}>Пункт выдачи</button>
              <button className={deliveryMethod === 'courier' ? 'active' : ''} onClick={() => setDeliveryMethod('courier')}>Курьером</button>
            </div>
            <ul>
              {deliveryPoints.map((point) => (
                <li key={point.id} onClick={() => handlePointClick(point.coordinates, point.address)}>
                  {point.address}
                </li>
              ))}
            </ul>
          </div>
          <div className='location-map'>
            <div className='map-container'>
              <YMaps query={{ apikey: '45aa1665-bac1-4779-a9e5-48c7794263fd' }}>
                <Map 
                state={{ center: mapCenter, zoom: 13 }} 
                width='100%' 
                height='500px' 
                options={{ suppressMapOpenBlock: true }}>
                  
                  {deliveryPoints.map((point) => (
                    <Placemark
                      key={point.id}
                      geometry={point.coordinates}
                      options={{
                        iconLayout: 'default#image',
                        iconImageHref: '/pin.svg',
                        iconImageSize: [30, 42],
                        iconImageOffset: [-15, -42],
                      }}
                      onClick={() => handlePointClick(point.coordinates, point.address)}
                    />
                  ))}
                  <SearchControl options={{ float: 'right',display: 'flex', size: 'large', position: { top: '10px', right: '10px' }, placeholderContent: 'Введите адрес' }} />
                </Map>
              </YMaps>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressDelivery;
