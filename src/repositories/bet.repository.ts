import prisma from '@/database/db.connection';
import { BetResolve, InputBetDto } from '@/protocols/bet.protocols';
import { Status } from '@prisma/client';

async function create(data: InputBetDto) {
  return prisma.bet.create({ data });
}

async function updateWinnersAndLosers(bets: BetResolve[]) {
  return await prisma.$transaction(
    bets.map((bet) => {
      return prisma.bet.update({
        where: { id: bet.betId },
        data: {
          status: bet.isWinner ? Status.WON : Status.LOST,
          amountWon: bet.amountWon,
          participant: {
            update: {
              data: {
                balance: { increment: bet.amountWon },
              },
            },
          },
        },
        select: {
          participant: {
            select: {
              name: true,
              balance: true,
              id: true,
            },
          },
          amountWon: true,
          status: true,
          id: true,
          gameId: true,
          amountBet: true,
          awayTeamScore: true,
          homeTeamScore: true,
          participantId: true,
          createdAt: true,
          updatedAt: true,
        },
      });
    }),
  );
}

const betRepository = { create, updateWinnersAndLosers };
export default betRepository;
