import prisma from '@/database/db.connection';
import { InputBetDto } from '@/protocols/bet.protocols';

function create(data: InputBetDto) {
  return prisma.bet.create({ data });
}

async function createAndLiquidadePayment(data: InputBetDto, liquidatePayment: Function) {
  const { participantId, amountBet } = data;
  return prisma.$transaction([create(data), liquidatePayment(participantId, amountBet)]);
}

const betRepository = { createAndLiquidadePayment };
export default betRepository;
