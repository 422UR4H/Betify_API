import prisma from '@/database/db.connection';
import { InputFinishGameDto, InputGameDto } from '@/protocols/game.protocols';

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

function finish(id: number, game: InputFinishGameDto) {
  return prisma.game.update({
    where: { id },
    data: { ...game, isFinished: true },
  });
}

const gameRepository = { findAll, findById, create, finish };
export default gameRepository;
