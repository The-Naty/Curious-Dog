import * as yup from 'yup';

const passwordValidationObj = yup
  .string()
  .required('Password is required.')
  .min(8, 'Minimum password length must be 8 (up to 128).')
  .max(128, "Password length can't exceed 128 charecthers.")
  .matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\-_\=.#^()+`~'",<.>/[\]{};:|\\@$!%*?&])[A-Za-z\d\-_\=.#^()+`~'",<.>/[\]{};:|\\@$!%*?&]{8,128}$/,
    'Must contain at least one uppercase letter, one lowercase letter, one number and one special character (! @ # $ % ^ & * () - _ = + ` ~ \' " , < . > / ? [ { } ] |  ; :).',
  );

const emailValidationObj = yup
  .string()
  .required('Email is required.')
  .email('Invalid email format.');

export { passwordValidationObj, emailValidationObj };
