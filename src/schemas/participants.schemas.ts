import { InputParticipantDto } from '@/protocols/participant.protocols';
import { MAX_INT_32 } from '@/utils/constants.utils';
import Joi from 'joi';

export const participantSchema = Joi.object<InputParticipantDto>({
  name: Joi.string().min(3).max(64).required(),
  balance: Joi.number().integer().min(1).max(MAX_INT_32).required(),
});
