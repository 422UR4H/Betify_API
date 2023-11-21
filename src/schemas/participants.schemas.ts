import Joi from 'joi';
import { InputParticipantDto } from '@/protocols/participant.protocols';
import { MAX_INT_32, MIN_PARTICIPANT_BALANCE } from '@/utils/constants.utils';

export const participantSchema = Joi.object<InputParticipantDto>({
  name: Joi.string().min(3).max(64).required(),
  balance: Joi.number().integer().min(MIN_PARTICIPANT_BALANCE).max(MAX_INT_32).required(),
});
