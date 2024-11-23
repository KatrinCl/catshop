import React, { useContext, useState } from 'react';
import { YMaps, Map, Placemark, SearchControl } from 'react-yandex-maps';
import { ShopContext } from '../Context/ShopContext'; // Подключаем контекст
import './CSS/AddressDelivery.css';
import wb from '/wb.png';
import pin from '/pin.svg';

const AddressDelivery = () => {
  const { setPickupAddress } = useContext(ShopContext); // Получаем функцию для установки адреса
  const [mapCenter, setMapCenter] = useState([56.9976, 40.9736]);

  const deliveryPoints = [
    { id: 1, address: 'г. Иваново, ул. Ленина, д. 10', coordinates: [56.9976, 40.9736] },
    { id: 2, address: 'г. Иваново, мкр. Видный, 4', coordinates: [56.969136, 41.027829] },
    { id: 3, address: 'г. Иваново, ул. Пушкина, д. 32', coordinates: [56.990, 40.970] },
  ];

  const handlePointClick = (coordinates, address) => {
    setMapCenter(coordinates);
    setPickupAddress(address); // Устанавливаем адрес в контексте
  };

  return (
    <div className="address-location">
      <div className="location-banner">
        <h2>Доставка</h2>
        <img src={wb} alt="Доставка" />
      </div>
      <div className="location-content-wrapper">
        <div className="location-content">
          <div className="location-list">
            <ul>
              {deliveryPoints.map((point) => (
                <li key={point.id} onClick={() => handlePointClick(point.coordinates, point.address)}>
                  {point.address}
                </li>
              ))}
            </ul>
          </div>
          <div className="location-map">
            <YMaps query={{ apikey: '45aa1665-bac1-4779-a9e5-48c7794263fd' }}>
              <Map state={{ center: mapCenter, zoom: 13 }} width="100%" height="500px">
                {deliveryPoints.map((point) => (
                  <Placemark
                    key={point.id}
                    geometry={point.coordinates}
                    options={{
                      iconLayout: 'default#image',
                      iconImageHref: pin,
                      iconImageSize: [30, 42],
                      iconImageOffset: [-15, -42],
                    }}
                    onClick={() => handlePointClick(point.coordinates, point.address)}
                  />
                ))}
                <SearchControl options={{ float: 'right' }} />
              </Map>
            </YMaps>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressDelivery;
