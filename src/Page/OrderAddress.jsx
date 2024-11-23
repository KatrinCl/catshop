import React, { useContext, useState } from 'react';
import { YMaps, Map, Placemark, SearchControl } from 'react-yandex-maps';
import { useNavigate } from 'react-router-dom';
import './CSS/OrderAddress.css';
import { ShopContext } from '../Context/ShopContext';
import pin from '/pin.svg';

const OrderAddress = () => {
  const [deliveryMethod, setDeliveryMethod] = useState('pickup');
  const { setPickupAddress } = useContext(ShopContext); // Получаем функцию для установки адреса
  const navigate = useNavigate();

  const deliveryPoints = [
    { id: 1, Order: 'ул. Ленина, д. 10', coordinates: [56.9976, 40.9736] },
    { id: 2, Order: 'мкр. Видный, 4', coordinates: [56.969136, 41.027829] },
    { id: 3, Order: 'ул. Пушкина, д. 32', coordinates: [56.990, 40.970] },
  ];

  const [mapCenter, setMapCenter] = useState([56.9976, 40.9736]);
  const [selectedAddress, setSelectedAddress] = useState(null); // Для выбранного адреса
  const [courierOrder, setCourierOrder] = useState('');
  const [houseNumber, setHouseNumber] = useState('');
  const [apartment, setApartment] = useState('');
  const [entrance, setEntrance] = useState('');
  const [intercom, setIntercom] = useState('');

  const handlePointClick = (coordinates, address) => {
    setMapCenter(coordinates);
    setSelectedAddress(address); // Устанавливаем выбранный адрес
    navigate('/order', { state: { address, deliveryMethod: 'pickup' } }); // Передаем данные
    setPickupAddress(address); // Устанавливаем адрес в контексте
  };

  const handleSaveCourierAddress = () => {
    if (courierOrder) {
      navigate('/order', {
        state: {
          address: `${courierOrder}, дом: ${houseNumber}, кв: ${apartment}`,
          deliveryMethod: 'courier',
        },
      });
    } else {
      alert('Выберите или укажите адрес!');
    }
  };

  return (
    <div className="Order-location">
      <div className="location-content-wrapper1">
        <div className="location-content1">
          <div className="location-list1">
            <div className="delivery-tabs1">
              <button
                className={deliveryMethod === 'pickup' ? 'active' : ''}
                onClick={() =>
                  setDeliveryMethod('pickup')}
              >
                Пункт выдачи
              </button>
              <button
                className={deliveryMethod === 'courier' ? 'active' : ''}
                onClick={() =>
                  setDeliveryMethod('courier')}
              >
                Курьером
              </button>
            </div>

            {selectedAddress ? (
              <div className="selected-address">
                <p>Выбранный адрес: {selectedAddress}</p>
                <button onClick={handleSaveAddress}>Сохранить адрес</button>
              </div>
            ) : deliveryMethod === 'pickup' ? (
              <ul>
                {deliveryPoints.map((point) => (
                  <li
                    key={point.id}
                    onClick={() => handlePointClick(point.coordinates, point.Order)}
                  >
                    {point.Order}
                  </li>
                ))}
              </ul>
            ) : (
              <div className="courier-Order-input">
                {!courierOrder && <p>Выберите адрес на карте или найдите его с помощью поиска</p>}
                {courierOrder && (
                  <div className="courier-del">
                    <p>Адрес: {courierOrder}</p>
                    <div className="courier-inputs">
                      <input
                        type="text"
                        placeholder="Номер дома"
                        value={houseNumber}
                        onChange={(e) => setHouseNumber(e.target.value)}
                      />
                      <input
                        type="text"
                        placeholder="Подъезд"
                        value={entrance}
                        onChange={(e) => setEntrance(e.target.value)}
                      />
                      <input
                        type="text"
                        placeholder="Квартира"
                        value={apartment}
                        onChange={(e) => setApartment(e.target.value)}
                      />
                      <input
                        type="text"
                        placeholder="Домофон"
                        value={intercom}
                        onChange={(e) => setIntercom(e.target.value)}
                      />
                    </div>
                    <button onClick={handleSaveCourierAddress}>
                      Подтвердить адрес
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="location-map1">
            <div className="map-container1">
              <YMaps query={{ apikey: '45aa1665-bac1-4779-a9e5-48c7794263fd' }}>
                <Map
                  state={{ center: mapCenter, zoom: 13 }}
                  width="100%"
                  height="500px"
                  options={{ suppressMapOpenBlock: true }}
                >
                  {deliveryMethod === 'pickup' &&
                    deliveryPoints.map((point) => (
                      <Placemark
                        key={point.id}
                        geometry={point.coordinates}
                        options={{
                          iconLayout: 'default#image',
                          iconImageHref: pin,
                          iconImageSize: [30, 42],
                          iconImageOffset: [-15, -42],
                        }}
                        onClick={() => handlePointClick(point.coordinates, point.Order)}
                      />
                    ))}
                  <SearchControl
                    options={{
                      float: 'right',
                      size: 'large',
                      position: { top: '10px', right: '10px' },
                      placeholderContent: 'Введите адрес',
                    }}
                    onResultSelect={(event) => {
                      const result = event.get('target').getResultsArray()[0];
                      if (result) {
                        const Order = result.properties.get('text');
                        const coordinates = result.geometry.getCoordinates();
                        setCourierOrder(Order);
                        setMapCenter(coordinates);
                      }
                    }}
                  />
                </Map>
              </YMaps>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderAddress;
