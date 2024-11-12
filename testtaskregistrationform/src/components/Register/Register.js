import './Register.css'; // Импортируем стили для компонента
import {useEffect, useState} from 'react'; // Импортируем хуки useEffect и useState из React
import {regularValidateEmail, phoneRegex} from '../../utils/constans'; // Импортируем регулярные выражения для валидации email и телефона

function Register({
  handleRegister,
  messageError,
  messageAccountRegistered,
  registered,
}) {
  // Состояния для хранения сообщений об ошибках

  // Сообщение об ошибке для имени
  const [nameErrMessage, setNameErrMessage] = useState('');

  // Сообщение об ошибке для Логина
  const [loginErrMessage, setLoginErrMessage] = useState('');

  // Сообщение об ошибке для email
  const [emailErrMessage, setEmailErrMessage] = useState('');

  // Сообщение об ошибке для телефона
  const [phoneErrMessage, setPhoneErrMessage] = useState('');

  // Сообщение об ошибке для пароля
  const [passwordErrMessage, setPasswordErrMessage] = useState('');
  // Состояния для хранения статусов валидности полей

  // Валидность имени
  const [nameValid, setNameValid] = useState(false);

  // Валидность имени
  const [loginValid, setLOginValid] = useState(false);

  // Валидность email
  const [emailValid, setEmailValid] = useState(null);

  // Валидность телефона
  const [phoneValid, setPhoneValid] = useState(null);

  // Валидность пароля
  const [passwordValid, setpasswordValid] = useState(false);

  // Состояние для валидности всей формы
  const [validForm, setValidForm] = useState(false);

  // Сообщение об ошибке (если есть)
  const [messageErr, setMessageErr] = useState(messageError);

  const [messageRegistered, setMessageRegistered] = useState(
    messageAccountRegistered
  );

  // Состояние для хранения значений полей формы
  const [formValue, setFormValue] = useState({
    name: '',
    login: '',
    email: '',
    phone: '',
    password: '',
  });

  // Обработчик изменений в полях формы
  const handleChange = (e) => {
    // Деструктурируем значения из события
    const {name, value, validationMessage, id} = e.target;

    // Валидация имени
    if (id === 'name') {
      e.target.validity.patternMismatch
        ? setNameErrMessage(
            'Допустимы только: латинские или кириллические буквы, пробел и тире.' // Установка сообщения об ошибке
          )
        : setNameErrMessage(validationMessage); // Установка стандартного сообщения
      setNameValid(e.target.validity.valid); // Устанавливаем валидность имени
    } else if (id === 'login') {
      setLoginErrMessage(validationMessage);
      setLOginValid(e.target.validity.valid);
    }
    // Валидация email
    else if (id === 'email') {
      !regularValidateEmail.test(value)
        ? setEmailValid(false)
        : setEmailValid(true); // Устанавливаем валидность email
    } // Валидация телефона
    else if (id === 'phone') {
      !phoneRegex.test(value) ? setPhoneValid(false) : setPhoneValid(true);
    } // Валидация пароля
    else if (id === 'password') {
      setpasswordValid(e.target.validity.valid); // Устанавливаем валидность пароля
      setPasswordErrMessage(validationMessage); // Установка сообщения об ошибке
    }

    // Обновляем значение поля формы
    setFormValue({
      ...formValue,
      [name]: value, // Сохраняем новое значение в состоянии
    });
  };

  // Эффект для обновления сообщений об ошибках и валидности формы
  useEffect(() => {
    // Устанавливаем таймер, чтобы обновить сообщение об ошибке через 1 секунду
    setTimeout(() => {
      setMessageRegistered(messageAccountRegistered);
      setMessageErr(messageError);
    }, 500);

    // Проверка валидности email и установка сообщения об ошибке
    !emailValid && emailValid !== null
      ? setEmailErrMessage('Введите корректный email')
      : setEmailErrMessage('');

    // Проверка валидности телефона и установка сообщения об ошибке
    !phoneValid && phoneValid !== null
      ? setPhoneErrMessage('Пожалуйста, введите корректный номер.')
      : setPhoneErrMessage('');
    // Установка валидности всей формы
    setValidForm(
      nameValid && loginValid && emailValid && passwordValid && phoneValid
    );
  }, [
    nameValid,
    emailValid,
    passwordValid,
    phoneValid,
    messageError,
    messageAccountRegistered,
    loginValid,
    registered,
  ]); // Запускаем эффект при изменении валидности полей или сообщения об ошибке

  // Обработчик отправки формы
  const handleSubmit = (e) => {
    e.preventDefault(); // Отменяем стандартное поведение формы
    const {name, login, phone, password, email} = formValue; // Деструктурируем значения из состояния формы
    // Вызываем функцию регистрации
    handleRegister({name, login, phone, password, email});
  };
  return (
    <section className='register'>
      <h1 className='register__title'>Добро пожаловать!</h1>
      <form required className='register__form' onSubmit={handleSubmit}>
        <span className='register__form-subtitle'>Имя</span>
        <input
          required
          id='name'
          name='name'
          type='text'
          pattern='[a-zA-Zа-яА-Я\s\-]{0,}'
          autoComplete='name'
          className='register__input'
          placeholder='Ваше имя'
          maxLength={30}
          minLength={2}
          value={formValue.name}
          onChange={handleChange}
        />
        <span className='register__input-error'>{nameErrMessage}</span>
        <span className='register__form-subtitle'>Логин</span>
        <input
          required
          id='login'
          name='login'
          type='text'
          pattern='[a-zA-Zа-яА-Я\s\-]{0,}'
          autoComplete='login'
          className='register__input'
          placeholder='Ваш логин'
          maxLength={30}
          minLength={2}
          value={formValue.login}
          onChange={handleChange}
        />
        <span className='register__input-error'>{loginErrMessage}</span>
        <span className='register__form-subtitle'>E-mail</span>
        <input
          required
          minLength={2}
          id='email'
          name='email'
          type='email'
          autoComplete='email'
          className='register__input'
          placeholder='Ваш email'
          value={formValue.email}
          onChange={handleChange}
        />
        <span className='register__input-error'>{emailErrMessage}</span>
        <span className='register__form-subtitle'>Номер телефона</span>
        <input
          required
          id='phone'
          name='phone'
          type='tel'
          autoComplete='phone'
          className='register__input'
          placeholder='+7(XXX) XXX-XX-XX'
          value={formValue.phone}
          onChange={handleChange}
        />
        <span className='register__input-error'>{phoneErrMessage}</span>
        <span className='register__form-subtitle'>Пароль</span>
        <input
          required
          minLength={5}
          className='register__input'
          id='password'
          name='password'
          type='password'
          autoComplete='new-password'
          placeholder='Придумайте пароль'
          value={formValue.password}
          onChange={handleChange}
        />
        <span className='register__input-error'>{passwordErrMessage}</span>
        <span
          className={registered ? 'register__message' : 'register__message-err'}
        >
          {!registered ? messageErr : messageRegistered}
        </span>
        <button
          type='submit'
          className='register__button'
          disabled={validForm ? false : true}
        >
          Зарегистрироваться
        </button>
      </form>
    </section>
  );
}

// Экспортируем компонент Register
export default Register;
