import prisma from '@/database/db.connection';
import { InputBetDto } from '@/protocols/bet.protocols';

function create(data: InputBetDto) {
  return prisma.bet.create({ data });
}

async function createAndLiquidadePayment(data: InputBetDto, participantService: any, balance: number) {
  return prisma.$transaction([
    create(data),
    prisma.participant.update({
      where: { id: data.participantId },
      data: { balance: { decrement: data.amountBet } },
    }),
  ]);
}

const betRepository = { createAndLiquidadePayment };
export default betRepository;
