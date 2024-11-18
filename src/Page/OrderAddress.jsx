import React, { useContext, useState } from 'react';
import { YMaps, Map, Placemark, SearchControl } from 'react-yandex-maps';
import { useNavigate } from 'react-router-dom';
import './CSS/OrderAddress.css';
import { ShopContext } from '../Context/ShopContext';

const OrderOrder = () => {
  const [deliveryMethod, setDeliveryMethod] = useState('pickup');

  const { setPickupOrder } = useContext(ShopContext);
  const navigate = useNavigate();

  const deliveryPoints = [
    { id: 1, Order: 'ул. Ленина, д. 10', coordinates: [56.9976, 40.9736] },
    { id: 2, Order: 'мкр. Видный, 4', coordinates: [56.969136, 41.027829] },
    { id: 3, Order: 'ул. Пушкина, д. 32', coordinates: [56.990, 40.970] },
  ];

  const [mapCenter, setMapCenter] = useState([56.9976, 40.9736]);
  const [courierOrder, setCourierOrder] = useState('');
  const [houseNumber, setHouseNumber] = useState('');
  const [apartment, setApartment] = useState('');
  const [entrance, setEntrance] = useState('');
  const [intercom, setIntercom] = useState('');

  const handlePointClick = (coordinates, Order) => {
    setMapCenter(coordinates);
    setPickupOrder(Order);
    navigate('/order', { state: { Order, deliveryMethod: 'pickup' } });
  };

  const handleCourierOrderSelect = () => {
    navigate('/order', {
      state: {
        Order: courierOrder,
        deliveryMethod: 'courier',
        details: { houseNumber, apartment, entrance, intercom }
      }
    });
  };

  return (
    <div className='Order-location'>
      <div className='location-content-wrapper1'>
        <div className='location-content1'>
          <div className="location-list1">
            <div className="delivery-tabs1">
              <button
                className={deliveryMethod === 'pickup' ? 'active' : ''}
                onClick={() => setDeliveryMethod('pickup')}
              >
                Пункт выдачи
              </button>
              <button
                className={deliveryMethod === 'courier' ? 'active' : ''}
                onClick={() => setDeliveryMethod('courier')}
              >
                Курьером
              </button>
            </div>

            {deliveryMethod === 'pickup' ? (
              <ul>
                {deliveryPoints.map((point) => (
                  <li key={point.id} onClick={() => handlePointClick(point.coordinates, point.order)}>
                    {point.Order}
                  </li>
                ))}
              </ul>
            ) : (
              <div className="courier-Order-input">
                {!courierOrder && (
                  <p>Выберите адрес на карте или найдите его с помощью поиска</p>
                )}
                {courierOrder && (
                  <div className='courier-del'>
                    <p>Адрес: {courierOrder}</p>
                    <div className='courier-inputs'>
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
                    <button onClick={handleCourierOrderSelect}>Подтвердить адрес</button>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className='location-map1'>
            <div className='map-container1'>
              <YMaps query={{ apikey: '45aa1665-bac1-4779-a9e5-48c7794263fd' }}>
                <Map
                  state={{ center: mapCenter, zoom: 13 }}
                  width='100%'
                  height='500px'
                  options={{ suppressMapOpenBlock: true }}
                >
                  {deliveryMethod === 'pickup' &&
                    deliveryPoints.map((point) => (
                      <Placemark
                        key={point.id}
                        geometry={point.coordinates}
                        options={{
                          iconLayout: 'default#image',
                          iconImageHref: '/pin.svg',
                          iconImageSize: [30, 42],
                          iconImageOffset: [-15, -42],
                        }}
                        onClick={() => handlePointClick(point.coordinates, point.Order)}
                      />
                    ))
                  }
                  <SearchControl
                    options={{ float: 'right', size: 'large', position: { top: '10px', right: '10px' }, placeholderContent: 'Введите адрес' }}
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

export default OrderOrder;
