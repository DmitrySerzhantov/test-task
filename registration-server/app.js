const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config(); // Для работы с переменными окружения

const authRoutes = require('./routes/auth'); // Импортируем маршруты авторизации

const app = express();
const PORT = process.env.PORT || 5000;

// Подключение к MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Подключение к базе данных успешно'))
  .catch((err) => console.error('Ошибка подключения к базе данных', err));

// Middleware
app.use(cors({origin: 'http://localhost:3000', credentials: true}));
app.use(bodyParser.json()); // Парсим JSON запросы

// Маршруты
app.use('/api/auth', authRoutes);

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
