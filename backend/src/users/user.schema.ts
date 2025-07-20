import Joi from 'joi';
import { UserType } from './types';

export const createUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  name: Joi.string().required(),
  surname: Joi.string().required(),
  phoneNumber: Joi.string().required(),
  type: Joi.string().valid(...Object.values(UserType)).required(),
});