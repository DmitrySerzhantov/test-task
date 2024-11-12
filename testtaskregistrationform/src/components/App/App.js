// Импорт стилей приложения
import './App.css';
// Импортируем хуки из React
import {useState} from 'react';
// Импортируем компонент регистрации
import Register from '../Register/Register';
// Импортируем функцию для регистрации пользователя
import {register} from '../../utils/auth';
// Импортируем маршруты из react-router-dom для маршрутизации
import {Route, Routes} from 'react-router-dom';
// Импортируем React для создания контекста
import React from 'react';

// Создание контекста для текущего пользователя
export const CurrentUserContext = React.createContext();

function App() {
  // Состояния для хранения сообщений об ошибках и статусах регистрации
  const [messageError, setMessageError] = useState(''); // Сообщение об ошибке
  const [messageAccountRegistered, setMessageAccountRegistered] = useState(''); // Успешное сообщение о регистрации
  const [registered, setRegistered] = useState(false); // Статус регистрации

  // Обработчик регистрации, который вызывается при попытке регистрации пользователя
  const handleRegister = async (name, login, phone, password, email) => {
    register(name, login, phone, password, email) // Вызов функции регистрации
      .then((data) => {
        // Если регистрация прошла успешно
        setMessageAccountRegistered(data.message); // Сохраняем сообщение об успешной регистрации
        setRegistered(true); // Обновляем состояние зарегистрированного пользователя
      })
      .catch((err) => {
        // Если произошла ошибка
        setMessageError(err.message); // Сохраняем сообщение об ошибке
        setRegistered(false); // Обновляем состояние зарегистрированного пользователя
      });
  };

  return (
    <div className='App'>
      <Routes>
        {/* Определяем маршрут для корневого адреса */}
        <Route
          path='/'
          element={
            <Register
              handleRegister={handleRegister} // Передаем обработчик регистрации в компонент Register
              messageError={messageError} // Передаем сообщение об ошибке
              messageAccountRegistered={messageAccountRegistered} // Передаем сообщение об успешной регистрации
              registered={registered} // Передаем статус регистрации
            />
          }
        />
      </Routes>
    </div>
  );
}

// Экспорт компонента App
export default App;
