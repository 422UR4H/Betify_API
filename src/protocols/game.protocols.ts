import { Bet, Game } from '@prisma/client';

export type InputGameDto = Pick<Game, 'homeTeamName' | 'awayTeamName'>;
export type OutputGameDto = Game;

type FinishGameProperties = 'homeTeamScore' | 'awayTeamScore';
export type InputFinishGameDto = Pick<Game, FinishGameProperties>;
export type FinishGameDto = Pick<Game, FinishGameProperties | 'id' | 'isFinished'>;
export type GameWithBets = Game & { Bet: Bet[] };