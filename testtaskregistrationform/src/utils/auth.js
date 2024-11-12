// Базовый URL нашего API-сервера
export const BASE_URL = 'http://localhost:5000';

// Функция для обработки ответа от сервера
function getResponseData(res) {
  // Читаем тело ответа в формате JSON
  return res.json().then((data) => {
    // Проверяем, успешен ли ответ
    if (res.ok) {
      return data; // Если статус ответа 2xx, возвращаем данные
    } else {
      // Если ответ не успешный (например, статус 4xx или 5xx), выбрасываем ошибку
      // Используем сообщение из ответа сервера или возвращаем стандартное сообщение об ошибке
      throw new Error(data.message || 'Ошибка при обработке запроса');
    }
  });
}

// Функция для регистрации нового пользователя
export const register = (name, login, phone, password, email) => {
  return fetch(`${BASE_URL}/api/auth/register`, {
    // Отправляем POST запрос на сервер для регистрации
    method: 'POST', // Указываем метод запроса
    headers: {
      'Content-Type': 'application/json', // Устанавливаем заголовок для указания типа содержимого
    },
    credentials: 'include', // Включаем учетные данные (например, куки) в запрос
    // Преобразуем данные пользователя в строку JSON
    body: JSON.stringify(name, login, phone, password, email), // Исправлено: оборачиваем в объект
  })
    .then((res) => getResponseData(res)) // Обрабатываем ответ от сервера с помощью функции getResponseData
    .catch((error) => {
      console.error(error); // Логируем ошибку в консоль для отладки
      throw error; // Пробрасываем ошибку дальше для обработки в вызвавшем коде
    });
};
