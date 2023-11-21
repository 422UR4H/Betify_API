import { Bet, Game, Status } from '@prisma/client';
import customErrors, { badRequest, gameAlreadyFinishedConflict, notFound } from '@/errors/customErrors';
import { FinishBetDto, FinishParticipantDto } from '@/protocols/bet.protocols';
import gameRepository from '@/repositories/game.repository';
import { HOUSE_FEE } from '@/utils/constants.utils';
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
  if (!id || isNaN(id)) throw badRequest('id must be a positive non null integer');

  const game = await gameRepository.findById(id);
  if (!game) throw notFound('Game');
  if (game.isFinished) throw gameAlreadyFinishedConflict();

  const finishGameDto: FinishGameDto = {
    id: game.id,
    homeTeamScore: inputFinishGameDto.homeTeamScore,
    awayTeamScore: inputFinishGameDto.awayTeamScore,
    isFinished: true,
  };
  const betsUpdatedStatus: Bet[] = getBetsWithChangedStatus(game.Bet, inputFinishGameDto);
  const winnerBets: Bet[] = betsUpdatedStatus.filter((bet) => bet.status === Status.WON);

  const finishBetsDto: FinishBetDto[] = getBetAmountWon(betsUpdatedStatus, winnerBets);
  const finishParticipantDto: FinishParticipantDto[] = filterAmountWonWinParticipants(finishBetsDto);

  return (await gameRepository.finish(finishGameDto, finishBetsDto, finishParticipantDto))[0];
}

function getBetsWithChangedStatus(bets: Bet[], game: InputFinishGameDto): Bet[] {
  return bets.map((bet) => ({ ...bet, status: getNewStatus(bet, game) }));
}

function getBetAmountWon(bets: Bet[], winnerBets: Bet[]): FinishBetDto[] {
  const sumValueAllBets = bets.reduce((sum, bet) => sum + bet.amountBet, 0);
  const sumValueWinningBets = winnerBets.reduce((sum, bet) => sum + bet.amountBet, 0);

  return bets.map((bet) => ({
    id: bet.id,
    participantId: bet.participantId,
    amountWon: getAmountWon(bet, sumValueAllBets, sumValueWinningBets),
    status: bet.status,
  }));
}

function filterAmountWonWinParticipants(bets: FinishBetDto[]): FinishParticipantDto[] {
  const result: FinishParticipantDto[] = [];
  for (let i = 0; i < bets.length; i++) {
    if (bets[i].status === Status.WON) {
      const { participantId, amountWon } = bets[i];
      result.push({ participantId, amountWon });
    }
  }
  return result;
}

function getNewStatus(bet: Bet, game: InputFinishGameDto): Status {
  return isBetWon(bet, game) ? Status.WON : Status.LOST;
}

function isBetWon(bet: Bet, game: InputFinishGameDto): boolean {
  return bet.homeTeamScore === game.homeTeamScore && bet.awayTeamScore === game.awayTeamScore;
}

function getAmountWon(bet: Bet, sumValueAllBets: number, sumValueWinningBets: number): number {
  return bet.status === Status.WON ? calculateAmountWon(bet.amountBet, sumValueAllBets, sumValueWinningBets) : 0;
}

function calculateAmountWon(amountBet: number, sumValueAllBets: number, sumValueWinningBets: number): number {
  return Math.floor((amountBet / sumValueWinningBets) * sumValueAllBets * (1 - HOUSE_FEE));
}

const gameService = { findAll, findById, create, finish };
export default gameService;
