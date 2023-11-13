import { Game } from '@prisma/client';

export type InputGameDto = Pick<Game, 'homeTeamName' | 'awayTeamName'>;
export type OutputGameDto = Game;
