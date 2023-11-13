import { InputGameDto } from '@/protocols/game.protocols';
import Joi from 'joi';

export const gameSchema = Joi.object<InputGameDto>({
  homeTeamName: Joi.string().required(),
  awayTeamName: Joi.string().required(),
});
