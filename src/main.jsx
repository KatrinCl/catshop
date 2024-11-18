import React from 'react';
import ReactDOM from 'react-dom'; // Измените здесь
import App from './App.jsx';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root') // Убедитесь, что у вас есть элемент с id "root" в вашем HTML
);
