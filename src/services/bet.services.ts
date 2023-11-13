import customErrors from '@/errors/customErrors';
import { CreateBetDto, InputBetDto, OutputBetDto } from '@/protocols/bet.protocols';
import betRepository from '@/repositories/bet.repository';
import participantService from './participant.services';
import gameService from './game.services';
import { Status } from '@prisma/client';

async function create(bet: InputBetDto) {
  const { participantId, amountBet } = bet;

  const participant = await participantService.findById(participantId);
  if (participant.balance < amountBet) {
    throw customErrors.forbidden("Participant doesn't have enough balance");
  }

  const game = await gameService.findById(bet.gameId);
  if (game.isFinished) throw customErrors.gone('This game is already over');

  const createBetDto: CreateBetDto = { ...bet, status: Status.PENDING };
  // FIXME: optimize with transaction
  const newBet: OutputBetDto = await betRepository.create(createBetDto);
  await participantService.liquidatePayment(participantId, participant.balance, amountBet);

  return newBet;
}

const betService = { create };
export default betService;
