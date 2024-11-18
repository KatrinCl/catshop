import React, { useState, useEffect } from 'react';
import SalesChart from './SalesChart';
import OrdersTable from './OrdersTable';
import StockStatus from './StockStatus';

const Dashboard = () => {
  const [salesData, setSalesData] = useState([]);
  const [orders, setOrders] = useState([]);
  const [stock, setStock] = useState([]);

  useEffect(() => {
    // Получаем данные о продажах
    fetch('/api/sales')
      .then(response => response.json())
      .then(data => setSalesData(data));

    // Получаем данные о заказах
    fetch('/api/orders')
      .then(response => response.json())
      .then(data => setOrders(data));

    // Получаем данные о запасах товаров
    fetch('/api/stock')
      .then(response => response.json())
      .then(data => setStock(data));
  }, []);

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <SalesChart data={salesData} />
      <OrdersTable data={orders} />
      <StockStatus data={stock} />
    </div>
  );
};

export default Dashboard;
