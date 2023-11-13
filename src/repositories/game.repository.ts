import prisma from '@/database/db.connection';
import { InputGameDto } from '@/protocols/game.protocols';

function create(data: InputGameDto) {
  return prisma.game.create({ data });
}

function findById(id: number) {
  return prisma.game.findUnique({ where: { id } });
}

function findAll() {
  return prisma.game.findMany();
}

const gameRepository = { findAll, findById, create };
export default gameRepository;
