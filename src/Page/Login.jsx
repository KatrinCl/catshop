import React, { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import './CSS/Login.css';

const Login = () => {
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [error, setError] = useState('');

  const handlePhoneSubmit = async (e) => {
    e.preventDefault();
    try {
      // Отправляем номер телефона на сервер для генерации кода
      const response = await fetch('/api/send-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone }),
      });

      if (response.ok) {
        setIsCodeSent(true); // Код отправлен успешно
        setError('');
      } else {
        setError('Ошибка отправки кода. Попробуйте снова.');
      }
    } catch (err) {
      setError('Ошибка сети.');
    }
  };

  const handleCodeSubmit = async (e) => {
    e.preventDefault();
    try {
      // Отправляем код на сервер для проверки
      const response = await fetch('/api/verify-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone, code }),
      });

      if (response.ok) {
        const data = await response.json();
        // Сохранение токена авторизации (например, в localStorage)
        localStorage.setItem('authToken', data.token);

        // Перенаправление пользователя на главную страницу
        window.location.href = '/';
      } else {
        setError('Неверный код. Попробуйте снова.');
      }
    } catch (err) {
      setError('Ошибка сети.');
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={isCodeSent ? handleCodeSubmit : handlePhoneSubmit} className="login-form">
        <h2>{isCodeSent ? 'Введите код подтверждения' : 'Войти или создать профиль'}</h2>

        {!isCodeSent ? (
          <>
            <div className="input-container">
              <PhoneInput
                country={'ru'}
                value={phone}
                onChange={setPhone}
                onlyCountries={['ru', 'by']}
                inputStyle={{
                  width: '100%',
                  height: '50px',
                  borderRadius: '10px',
                  border: '2px solid #d3b3ff',
                  fontSize: '16px',
                  paddingLeft: '48px',
                  color: '#333',
                }}
                buttonStyle={{ borderRadius: '10px 0 0 10px' }}
                dropdownStyle={{ borderRadius: '10px' }}
                placeholder="+7 000 000-00-00"
              />
            </div>
            <button type="submit" className="submit-button">
              Получить код
            </button>
          </>
        ) : (
          <>
            <div className="input-container">
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Введите код"
                className="code-input"
                required
              />
            </div>
            <button type="submit" className="submit-button">
              Войти
            </button>
          </>
        )}

        {error && <p className="error">{error}</p>}

        {!isCodeSent && (
          <div className="terms">
            <input type="checkbox" checked readOnly />
            <span>
              Соглашаюсь с <a href="#">правилами пользования</a> торговой площадкой и возврата
            </span>
          </div>
        )}
      </form>
    </div>
  );
};

export default Login;
