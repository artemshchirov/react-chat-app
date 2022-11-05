const VALIDATION_PARAMS = {
  REGEX: {
    NAME: /^[a-zа-яё-\s]+$/i,
    EMAIL: /[^@\s]+@[^@\s]+\.[^@\s]+/i,
    FILE: /^.*\.(jpg|JPG|gif|GIF|doc|DOC|pdf|PDF|png|PNG)$/i,
  },
  MESSAGES: {
    NAME: {
      EN: 'Username can use only letters, space and "-"',
      RU: 'Имя может состоять только из букв, пробелов и "-"',
    },
    EMAIL: {
      EN: 'Enter valid email',
      RU: 'Неправильный формат e-mail',
    },
    PASSWORD: {
      EN: 'Password field is empty',
      RU: 'Минимальная длина пароля: 1 символ',
    },
    FILE: {
      EN: 'File must be .jpg or .png',
      RU: 'Файл должен быть .jpg или .png формата.',
    },
  },
};

const VALIDATION_CONFIGS = {
  USER_DATA: {
    INPUTS: ['name', 'email', 'file'],
    REGEX: {
      name: VALIDATION_PARAMS.REGEX.NAME,
      email: VALIDATION_PARAMS.REGEX.EMAIL,
      file: VALIDATION_PARAMS.REGEX.FILE,
    },
    MESSAGES: {
      name: VALIDATION_PARAMS.MESSAGES.NAME.EN,
      email: VALIDATION_PARAMS.MESSAGES.EMAIL.EN,
      file: VALIDATION_PARAMS.REGEX.FILE,
    },
  },

  LOGIN: {
    INPUTS: ['email'],
    REGEX: {
      email: VALIDATION_PARAMS.REGEX.EMAIL,
    },
    MESSAGES: {
      email: VALIDATION_PARAMS.MESSAGES.EMAIL,
    },
  },
};

const PAGES = {
  SIGNUP: '/signup',
  SIGNIN: '/signin',
  MAIN: '/',
};

export { VALIDATION_CONFIGS, VALIDATION_PARAMS, PAGES };
