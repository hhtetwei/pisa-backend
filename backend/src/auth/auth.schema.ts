import Joi from 'joi';

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  rememberMe: Joi.boolean().optional(),
});

export const checkPasswordSchema = Joi.object({
  password: Joi.string().min(6).required(),
});