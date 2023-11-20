import customErrors, { badRequest, gameAlreadyFinishedConflict, notFound } from '@/errors/customErrors';
import { FinishBetDto, FinishParticipantDto } from '@/protocols/bet.protocols';
import gameRepository from '@/repositories/game.repository';
import { HOUSE_FEE } from '@/utils/constants.utils';
import { Bet, Game, Status } from '@prisma/client';
import {
  FinishGameDto,
  GameWithBets,
  InputFinishGameDto,
  InputGameDto,
  OutputGameDto,
} from '@/protocols/game.protocols';

async function findAll(): Promise<OutputGameDto[]> {
  return await gameRepository.findAll();
}

async function findById(id: number): Promise<GameWithBets> {
  if (!id || isNaN(id)) throw badRequest('id must be a positive non null integer');

  const game = await gameRepository.findById(id);
  if (game == null) throw customErrors.notFound('Game');
  return game;
}

async function create(game: InputGameDto): Promise<OutputGameDto> {
  return await gameRepository.create(game);
}

async function finish(id: number, inputFinishGameDto: InputFinishGameDto): Promise<Game> {
  const game = await gameRepository.findById(id);
  if (!game) throw notFound('Game');
  if (game.isFinished) throw gameAlreadyFinishedConflict();

  const finishGameDto: FinishGameDto = {
    id: game.id,
    homeTeamScore: inputFinishGameDto.homeTeamScore,
    awayTeamScore: inputFinishGameDto.awayTeamScore,
    isFinished: true,
  };
  const betsUpdatedStatus: Bet[] = updateBetStatus(game.Bet, inputFinishGameDto);
  // FIXME: declare winBets and sent to updateBetAmountWon
  const betsUpdated: Bet[] = updateBetAmountWon(betsUpdatedStatus);
  const finishBetsDto: FinishBetDto[] = betsUpdated.map((bet) => {
    const { id, amountWon, status } = bet;
    return { id, amountWon, status };
  });
  const finishParticipantDto: FinishParticipantDto[] = filterAmountWonWinParticipants(betsUpdated);
  return (await gameRepository.finish(finishGameDto, finishBetsDto, finishParticipantDto))[0];
}

function updateBetStatus(bets: Bet[], game: InputFinishGameDto): Bet[] {
  return bets.map((bet) => ({ ...bet, status: betWasWon(bet, game) ? Status.WON : Status.LOST }));
}

function betWasWon(bet: Bet, game: InputFinishGameDto): boolean {
  return bet.homeTeamScore === game.homeTeamScore && bet.awayTeamScore === game.awayTeamScore;
}

function updateBetAmountWon(bets: Bet[]): Bet[] {
  const sumValueAllBets = bets.reduce((sum, bet) => sum + bet.amountBet, 0);
  // FIXME: use winBets rather than bets
  const sumValueWinningBets = bets.reduce((sum, bet) => sum + (bet.status === Status.WON ? bet.amountBet : 0), 0);

  return bets.map((bet) => ({ ...bet, amountWon: updateAmountWon(bet, sumValueAllBets, sumValueWinningBets) }));
}

function updateAmountWon(bet: Bet, sumValueAllBets: number, sumValueWinningBets: number): number {
  return bet.status === Status.WON ? betAmountWon(bet.amountBet, sumValueAllBets, sumValueWinningBets) : 0;
}

function betAmountWon(amountBet: number, sumValueAllBets: number, sumValueWinningBets: number): number {
  return Math.floor((amountBet / sumValueWinningBets) * sumValueAllBets * (1 - HOUSE_FEE));
}

function filterAmountWonWinParticipants(bets: Bet[]): FinishParticipantDto[] {
  const result: FinishParticipantDto[] = [];
  for (let i = 0; i < bets.length; i++) {
    if (bets[i].status === Status.WON) {
      const { participantId, amountWon } = bets[i];
      result.push({ participantId, amountWon });
    }
  }
  return result;
}

const gameService = { findAll, findById, create, finish };
export default gameService;
