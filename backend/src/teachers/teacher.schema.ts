import Joi from 'joi';

export const createTeacherSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  name: Joi.string().required(),
  surname: Joi.string().required(),
  phoneNumber: Joi.string().required(),
});
