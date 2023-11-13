import Joi from 'joi';

export const participantSchema = Joi.object({
  name: Joi.string().min(3).max(64).required(),
  balance: Joi.number().integer().min(1).required(),
});
