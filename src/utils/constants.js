const VALIDATION_PARAMS = {
  REGEX: {
    NAME: /^[a-zа-яё-\s]+$/i,
    EMAIL: /[^@\s]+@[^@\s]+\.[^@\s]+/i,
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
  },
};

const VALIDATION_CONFIGS = {
  USER_DATA: {
    INPUTS: ['name', 'email'],
    REGEX: {
      name: VALIDATION_PARAMS.REGEX.NAME,
      email: VALIDATION_PARAMS.REGEX.EMAIL,
    },
    MESSAGES: {
      name: VALIDATION_PARAMS.MESSAGES.NAME.EN,
      email: VALIDATION_PARAMS.MESSAGES.EMAIL.EN,
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

export { VALIDATION_CONFIGS, VALIDATION_PARAMS };
