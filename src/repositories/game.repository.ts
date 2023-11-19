import prisma from '@/database/db.connection';
import { FinishBetDto, FinishParticipantDto } from '@/protocols/bet.protocols';
import { FinishGameDto, InputGameDto } from '@/protocols/game.protocols';

function create(data: InputGameDto) {
  return prisma.game.create({ data });
}

function findById(id: number) {
  return prisma.game.findUnique({
    where: { id },
    include: { Bet: true },
  });
}

function findAll() {
  return prisma.game.findMany();
}

function finish(game: FinishGameDto, bets: FinishBetDto[], participants: FinishParticipantDto[]) {
  return prisma.$transaction([
    prisma.game.update({
      where: { id: game.id },
      data: { ...game },
    }),
    ...bets.map((bet) =>
      prisma.bet.update({
        where: { id: bet.id },
        data: { ...bet },
      }),
    ),
    ...participants.map((p) =>
      prisma.participant.update({
        where: { id: p.participantId },
        data: { balance: { increment: p.amountWon || 0 } },
      }),
    ),
  ]);
}

const gameRepository = { findAll, findById, create, finish };
export default gameRepository;
