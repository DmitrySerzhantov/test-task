const mongoose = require('mongoose');

// Определение схемы пользователя
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  login: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
});

// Экспортируем модель пользователя
const User = mongoose.model('User', userSchema);
module.exports = User;
