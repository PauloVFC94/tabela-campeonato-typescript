import * as Joi from 'joi';

interface ILogin {
  email: string;
  password: string;
  username?: string,
  role?: string,
}

const REQ_FIELD = '400|All fields must be filled';
const MIN_LENGHT = '401|{#label} length must be at least {#limit} characters long';
const INC_FORMAT = '401|Incorrect email or password';

const validateLogin = Joi.object({
  email: Joi.string().email().required().messages({
    'any.required': REQ_FIELD,
    'string.empty': REQ_FIELD,
    'string.email': INC_FORMAT,
  }),

  password: Joi.string().min(6).required().messages({
    'any.required': REQ_FIELD,
    'string.empty': REQ_FIELD,
    'string.min': MIN_LENGHT,
  }),
});

export { ILogin, validateLogin };
