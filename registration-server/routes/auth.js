const express = require('express');
const {body, validationResult} = require('express-validator');
const User = require('../models/User');

const router = express.Router();

// Регистрация пользователя
router.post(
  '/register',
  [
    body('name').isString().withMessage('Имя должно быть строкой.'),
    body('login').notEmpty().withMessage('Логин обязательно для заполнения.'),
    body('email').isEmail().withMessage('Некорректный формат email.'),
    body('phone')
      .matches(/^\+?[1-9]\d{1,14}$/)
      .withMessage('Некорректный номер телефона.'),
    body('password')
      .isLength({min: 6})
      .withMessage('Пароль должен содержать как минимум 6 символов.'),
  ],
  async (req, res) => {
    const errors = validationResult(req); // Проверяем на ошибки валидации
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()}); // Если есть ошибки, отправляем их
    }

    const {name, login, email, phone, password} = req.body;

    try {
      // Проверяем уникальность логина
      const existingUser = await User.findOne({login});
      if (existingUser) {
        return res
          .status(400)
          .send({message: 'Логин уже занят. Пожалуйста, выберите другой.'});
      }

      // Проверяем уникальность email
      const existingEmail = await User.findOne({email});
      if (existingEmail) {
        return res.status(400).json({
          message: 'Email уже зарегистрирован. Пожалуйста, используйте другой.',
        });
      }

      // Создаем нового пользователя
      const newUser = new User({name, login, email, phone, password});
      await newUser.save(); // Сохраняем пользователя в базе данных

      res.status(201).json({message: 'Аккаунт успешно зарегистрирован!'}); // Успешное сообщение
    } catch (err) {
      console.error(err);
      res.status(500).json({message: 'Ошибка сервера. Попробуйте позже.'});
    }
  }
);

module.exports = router;
