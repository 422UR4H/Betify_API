import Joi from 'joi';
import { InputFinishGameDto, InputGameDto } from '@/protocols/game.protocols';
import { MAX_INT_32 } from '@/utils/constants.utils';

export const gameSchema = Joi.object<InputGameDto>({
  homeTeamName: Joi.string().required(),
  awayTeamName: Joi.string().required(),
});

export const gameFinishSchema = Joi.object<InputFinishGameDto>({
  homeTeamScore: Joi.number().min(0).max(MAX_INT_32).required(),
  awayTeamScore: Joi.number().min(0).max(MAX_INT_32).required(),
});
