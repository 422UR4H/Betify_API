import customErrors from '@/errors/customErrors';
import { CreateBetDto, InputBetDto, OutputBetDto } from '@/protocols/bet.protocols';
import betRepository from '@/repositories/bet.repository';
import participantService from './participant.services';
import gameService from './game.services';
import { Bet, Status } from '@prisma/client';

async function createAndLiquidadePayment(bet: InputBetDto): Promise<Bet> {
  const { participantId, amountBet } = bet;

  const { balance } = await participantService.findById(participantId);
  // FIXME: unit test here
  if (balance < amountBet) {
    throw customErrors.forbidden("Participant doesn't have enough balance");
  }

  const game = await gameService.findById(bet.gameId);
  // FIXME: unit test here
  if (game.isFinished) throw customErrors.gone('This game is already over');

  const createBetDto: CreateBetDto = { ...bet, status: Status.PENDING };
  const newBet: OutputBetDto = (
    await betRepository.createAndLiquidadePayment(createBetDto, participantService.liquidatePayment())
  )[0];

  return newBet;
}

const betService = { createAndLiquidadePayment };
export default betService;
