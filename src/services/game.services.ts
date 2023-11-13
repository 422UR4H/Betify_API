import customErrors, { badRequest, notFound } from '@/errors/customErrors';
import { InputFinishGameDto, InputGameDto, OutputGameDto } from '@/protocols/game.protocols';
import betRepository from '@/repositories/bet.repository';
import gameRepository from '@/repositories/game.repository';
import { Bet, Game } from '@prisma/client';

async function findAll(): Promise<OutputGameDto[]> {
  return await gameRepository.findAll();
}

// FIXME: type this
async function findById(id: number) {
  if (!id || isNaN(id)) throw badRequest('id must be a positive non null integer');
  const game = await gameRepository.findById(id);

  if (!game) throw customErrors.notFound('Game');
  return game;
}

async function create(game: InputGameDto): Promise<OutputGameDto> {
  return await gameRepository.create(game);
}

async function finish(id: number, game: InputFinishGameDto): Promise<OutputGameDto> {
  if (!id || isNaN(id)) throw badRequest('id must be a positive non null integer');

  const currentGame = await gameRepository.findById(id);

  if (!currentGame) throw notFound('Game');
  if (currentGame.isFinished) throw badRequest('game is already finished');

  if (!game || !game.homeTeamScore || !game.awayTeamScore) {
    throw badRequest('invalid game data!');
  }
  const result = await gameRepository.finish(id, game);

  const winningBets = currentGame.Bet.filter((b) => {
    return betWinning(
      { awayTeamScore: game.awayTeamScore, homeTeamScore: game.homeTeamScore },
      { awayTeamScore: b.awayTeamScore, homeTeamScore: b.homeTeamScore },
    );
  });
  const amount = winningBets.reduce((total: number, b: Bet) => total + b.amountBet, 0);

  const betResolves = currentGame.Bet.map((b) => {
    const isWinner = betWinning(
      { awayTeamScore: game.awayTeamScore, homeTeamScore: game.homeTeamScore },
      { awayTeamScore: b.awayTeamScore, homeTeamScore: b.homeTeamScore },
    );
    const amountWon = isWinner ? Math.floor((b.amountBet / amount) * amount * 0.7) : 0;
    const betResolve = {
      betId: b.id,
      amountWon,
      isWinner,
    };
    return betResolve;
  });
  await betRepository.updateWinnersAndLosers(betResolves);

  return result;
}

function betWinning(
  game: Pick<Game, 'homeTeamScore' | 'awayTeamScore'>,
  bet: Pick<Bet, 'awayTeamScore' | 'homeTeamScore'>,
) {
  const isPositiveScore = bet.homeTeamScore >= 0 && bet.awayTeamScore >= 0;

  return (
    (isPositiveScore && game.homeTeamScore > game.awayTeamScore && bet.homeTeamScore > bet.awayTeamScore) ||
    (game.homeTeamScore < game.awayTeamScore && bet.homeTeamScore < bet.awayTeamScore) ||
    (game.homeTeamScore === game.awayTeamScore && bet.homeTeamScore === bet.awayTeamScore)
  );
}

const gameService = { findAll, findById, create, finish };
export default gameService;
