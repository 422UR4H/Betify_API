import { Game } from '@prisma/client';

export type InputGameDto = Pick<Game, 'homeTeamName' | 'awayTeamName'>;
export type OutputGameDto = Game;

export type InputFinishGameDto = Pick<Game, 'homeTeamScore' | 'awayTeamScore'>;
