import { InputParticipantDto } from '@/protocols/participant.protocols';
import { MAX_INT_32, MIN_PARTICIPANT_BALANCE } from '@/utils/constants.utils';
import Joi from 'joi';

export const participantSchema = Joi.object<InputParticipantDto>({
  name: Joi.string().min(3).max(64).required(),
  balance: Joi.number().integer().min(MIN_PARTICIPANT_BALANCE).max(MAX_INT_32).required(),
});
