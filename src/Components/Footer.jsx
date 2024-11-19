import React from 'react';
import './../Styles/Footer.css';
import code from '/qr-code.png'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Покупателям</h3>
          <ul>
            <li><a href="#">Вопросы и ответы</a></li>
            <li><a href="#">Юридическая информация</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Продавцам и партнёрам</h3>
          <ul>
            <li><a href="#">Продавать товары</a></li>
            <li><a href="#">Открыть пункт выдачи</a></li>
            <li><a href="#">Предложить помещение</a></li>
            <li><a href="#">Развозить грузы</a></li>
            <li><a href="#">Доставлять заказы</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Наши проекты</h3>
          <ul>
            <li><a href="#">KS School</a></li>
            <li><a href="#">KS Guru</a></li>
            <li><a href="#">KS Stream</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Компания</h3>
          <ul>
            <li><a href="#">О нас</a></li>
            <li><a href="#">Пресс-служба</a></li>
            <li><a href="#">Контакты</a></li>
            <li><a href="#">Вакансии</a></li>
            <li><a href="#">Сообщить о мошенничестве</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>QR код</h3>
          <img src={code} alt="QR код" className="qr-code" />
        </div>
      </div>
      <div className="footer-bottom">
        <p>© Kat Shop 2004–2024. Все права защищены.</p>
        <p><a href="#">Применяются рекомендательные технологии</a></p>
      </div>
    </footer>
  );
};

export default Footer;
