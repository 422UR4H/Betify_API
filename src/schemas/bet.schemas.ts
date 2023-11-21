import Joi from 'joi';
import { InputBetDto } from '@/protocols/bet.protocols';
import { MAX_INT_32 } from '@/utils/constants.utils';

export const betSchema = Joi.object<InputBetDto>({
  homeTeamScore: Joi.number().min(0).max(MAX_INT_32).required(),
  awayTeamScore: Joi.number().min(0).max(MAX_INT_32).required(),
  participantId: Joi.number().min(1).max(MAX_INT_32).required(),
  amountBet: Joi.number().min(1).max(MAX_INT_32).required(),
  gameId: Joi.number().min(1).max(MAX_INT_32).required(),
});
